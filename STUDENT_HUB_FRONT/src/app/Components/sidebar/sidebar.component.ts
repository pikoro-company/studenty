import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBlogger, faBloggerB, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faCalendar, faCircle, faCoffee, faFlag, faUniversity, faNewspaper, faCog, faUser } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faCoffee = faCoffee;
  faUser = faUser;
  faFacebook = faFacebook;
  faCalendar = faCalendar;
  faDoc = faNewspaper;
  faBlog = faBloggerB;
  faInterested = faFlag;
  faCog = faCog;
  faUniversity = faUniversity;
  hideuniversities = true;
  hidefiliere = true;
  id: any = null;
  user: User = null;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.findUserById();
    this.AdminOrUniversite();
  }

  findUserById() {
    this.id = localStorage.getItem('Id');
    this.userService.findById(this.id).subscribe(data => {
      this.user = data;
      return this.user;
    });
  }

  AdminOrUniversite() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.hideuniversities = false;
    }
    if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.hidefiliere = false;
    }
  }

}

