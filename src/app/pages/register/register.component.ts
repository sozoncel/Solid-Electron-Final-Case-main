import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm!: FormGroup;
  users!:User[];

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private usersService:UsersService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.createRegisterForm();
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register(){
    if(!this.registerForm.valid){
      this.toastr.error('Form alanının tamamen doldurulduğundan emin olun', 'Sistem mesajı :');
    }else{
      let isUsedEmail:boolean = false; 

      this.users.forEach((user:{email:string}) => {
        if(this.registerForm.value.email === user.email){
          isUsedEmail = true;
        }
      });

      if(isUsedEmail){
        this.toastr.error("Girmiş olduğunuz email zaten kayıtlı...","Sistem Mesajı:");
      }else{
        const newUser: User = {
          ...this.registerForm.value
        }
        this.usersService.createAccount(newUser).subscribe({
          next: (res) => {
            this.toastr.success(`Hoşgeldin ${res.userName}! Hesabın başarılı bir şekilde oluşturuldu...`);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigateByUrl('/login');
          }
        });
      }
    }
  }

}
