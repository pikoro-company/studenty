import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardVisitorService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(localStorage.length == 0) {
      this.router.navigate(['/home/login']);
      return false;
    } else {
      return true;
    }
  }
}
