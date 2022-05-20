import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardClubService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(localStorage.getItem("Roles").includes("CLUB")) {
      return true;
    } else {
      this.router.navigate(['/home/login']);
      return false;
    }
  }
}
