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

  loginForm!: FormGroup; //kullanıcı girişi için oluşturulacak formgroup


  constructor(
    private formBuilder:FormBuilder,//angular form oluşturmak için ilgili servis
    private toastr:ToastrService,//kullanıcı mesajlarını göstermek için yüklemiş olduğumuz npm paket..
    private usersService:UsersService,// user httpreq. işlemleri için oluşturulan servis..
    private router:Router,
    private sessionStatusService:SessionStatusService
    ) { }

  ngOnInit(): void {
    this.createLoginForm();//loginformu oluşturulacak metot sayfa ilk yüklendiğinde onInit içinde çağrılır...
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({//loginform inputları için başlangıç değeri ve validasyon ataması burada yapılır ayrıca burdaki key değerleri html tarafında formcontrolname için gereklidir......
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(){
    if(!this.loginForm.valid){//form invalid ise toastr ile kullanıcıya hata göster
      this.toastr.error('Form alanı zorunludur', 'Sistem mesajı :');
    }else{
      this.usersService.getUser(this.loginForm.value.email).subscribe({//userservice'den queryparams ile girilen maili içeren datayı get eder...
        next: (res) => {
          if(res.length === 0){//data yoksa length sıfır gelir.. hata göster..
            this.toastr.error("Böyle bir hesap bulunamadı...","Sistem mesajı");
          }else{//ilgili data varsa
            if(res[0].password == this.loginForm.value.password){//girilen şifre get edilen data'nın şifresi ile aynı mı?
              this.toastr.success("Başarılı bir şekilde giriş yapıldı...");
              console.log(res);
              this.saveSessionToStore(res[0].userName);
              this.router.navigateByUrl('/home');//home yönlendir...
            }else{
              this.toastr.error("Email yada şifre hatalı...","Sistem mesajı");
            }
          }
        },
        error: (err) => {
          console.log(err);//hata varsa consola bas
        }
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
