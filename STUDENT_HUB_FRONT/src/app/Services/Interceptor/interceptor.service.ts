import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../TokenStorage/token-storage.service';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private userservice: UserService, private tokenstorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = localStorage.getItem("Token");
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(
          'Authorization', 'Bearer ' + token)
      });
    }
    return next.handle(authReq);
  }

}
