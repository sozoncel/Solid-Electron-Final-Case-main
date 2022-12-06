import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { LocalStorageService } from '../services/local-storage.service';
import { SessionStatusService } from '../services/session-status.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  sessionStatus!:Session | null;

  constructor(
    private sessionStatusService:SessionStatusService,
    private localStrogeService:LocalStorageService,
    private router:Router,
    private toastr:ToastrService
  ){
    this.sessionStatusService.sessionStatusModel$.subscribe((res) => {
      this.sessionStatus = res;
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.sessionStatus?.isLogin){//sessionStatus store içindeki islogin değeri true ise kullanıcı giriş yapmış demektir guard etkisiz
        return true;
      }else{//kullanıcı giriş yapması için logine yönlendirilir ve hata mesajı gösterirlir...guard devrede...
        this.toastr.error("Bu sayfaya erişmek için login olmalısınız...","Hata");
        this.router.navigateByUrl("/login");
        return false;
      }
  }

}
