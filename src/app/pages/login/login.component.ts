import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStatusService } from 'src/app/services/session-status.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; 


  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private usersService:UsersService,
    private router:Router,
    private sessionStatusService:SessionStatusService
    ) { }

  ngOnInit(): void {
    this.createLoginForm();

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(){
    if(!this.loginForm.valid){
      this.toastr.error('Form alanı zorunludur', 'Sistem mesajı :');
    }else{
      this.usersService.getUser(this.loginForm.value.email).subscribe({
        next: (res) => {
          if(res.length === 0){
            this.toastr.error("Böyle bir hesap bulunamadı...","Sistem mesajı");
          }else{//ilgili data varsa
            if(res[0].password == this.loginForm.value.password){
              this.toastr.success("Başarılı bir şekilde giriş yapıldı...");
              console.log(res);
              this.saveSessionToStore(res[0].userName);
              this.router.navigateByUrl('/home');
            }else{
              this.toastr.error("Email yada şifre hatalı...","Sistem mesajı");
            }
          }
        },
        error: (err) => {
          console.log(err);
      })
    }
  }

  saveSessionToStore(userName:string){
    const sessionInfo = {
      userName:userName,
      isLogin:true
    };
    this.sessionStatusService.saveSessionToStore(sessionInfo);
  }

}
