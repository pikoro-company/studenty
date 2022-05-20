import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardAdminOrUniversiteService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(localStorage.getItem("Roles").includes("ADMINISTRATEUR") || localStorage.getItem("Roles").includes("UNIVERSITE")) {
      return true;
    } else {
      this.router.navigate(['/home/login']);
      return false;
    }
  }
}
