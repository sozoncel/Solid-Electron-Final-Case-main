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


  registerForm!: FormGroup;//kullanıcı kaydı için oluşturulacak formgroup
  users!:User[];//jsondan çekilecek tüm userslar burada tutulacak...

  constructor(
    private formBuilder:FormBuilder,//angular form oluşturmak için ilgili servis
    private toastr:ToastrService,//kullanıcı mesajlarını göstermek için yüklemiş olduğumuz npm paket..
    private usersService:UsersService,// user httpreq. işlemleri için oluşturulan servis..
    private router:Router//sayfa yönlendirmeleri için gerekli olan router işlemini angular/router ile sağlıyoruz
    ) { }

  ngOnInit(): void {
    this.getAllUsers();//userservis'e ulaşıp get isteğiyle dataları çekicek metot
    this.createRegisterForm();//registerformu oluşturulacak metot sayfa ilk yüklendiğinde onInit içinde çağrılır...
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;//dönen response'u users'a atıyoruz.
    });
  }

  createRegisterForm() {//registerform inputları için başlangıç değeri ve validasyon ataması burada yapılır ayrıca burdaki key değerleri html tarafında formcontrolname için gereklidir...
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register(){
    if(!this.registerForm.valid){//form invalid ise toastr ile kullanıcıya hata göster
      this.toastr.error('Form alanının tamamen doldurulduğundan emin olun', 'Sistem mesajı :');
    }else{
      let isUsedEmail:boolean = false; //girilen email'i kontrol etmek için oluşturulan değişken

      this.users.forEach((user:{email:string}) => {//tüm user datası gezilerek girilen emailin kontrolü yapılır
        if(this.registerForm.value.email === user.email){//eşleşen data varsa
          isUsedEmail = true;//oluşturulan değişken değeri true...
        }
      });

      if(isUsedEmail){//girilen email zaten varsa hata...
        this.toastr.error("Girmiş olduğunuz email zaten kayıtlı...","Sistem Mesajı:");
      }else{//mail users içersinde bulunmuyorsa kayıt işlemi yapılabilir...
        const newUser: User = {//register form değerleri oluşturulan obje içersine atanır...
          ...this.registerForm.value
        }
        this.usersService.createAccount(newUser).subscribe({//userService içersindeki createAccount metoduna ulaşılıp post işlemi yapılır..
          next: (res) => {//kullanıcıya işlem başarılı bilgisi göster...
            this.toastr.success(`Hoşgeldin ${res.userName}! Hesabın başarılı bir şekilde oluşturuldu...`);
          },
          error: (err) => {//hata varsa consola bas...
            console.log(err);
          },
          complete: () => {//işlem tamamlandığında login sayfasına yönlendir..
            this.router.navigateByUrl('/login');
          }
        });
      }
    }
  }

}
