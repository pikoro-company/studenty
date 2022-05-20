import { Component, OnInit } from '@angular/core';
import { FiliereService } from 'src/app/Services/Filiere/filiere.service';
import { SalleService } from 'src/app/Services/Salle/salle.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {

  nFiliere: any;
  nEnseignant: any;
  nClubs: any;
  nSalle: any;
  nMatiere: any;

  id: any;
  matiereservice: any;

  constructor(private filierservice: FiliereService, private userservice: UserService, private salleservice: SalleService) { }

  ngOnInit(): void {
    this.getCountFiliereByUniversiteId();
    this.getCountEnseignantByUniversiteId();
    this.getCountClubByUniversiteId();
    this.getCountSalleByUniversiteId();
  }

  getCountFiliereByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.filierservice.getCountFiliereByUniversiteId(this.id).subscribe(
      data => {
        this.nFiliere = data;
      }
    )
  }

  getCountEnseignantByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.userservice.getCountEnseignantByUniversiteId(this.id).subscribe(
      data => {
        this.nEnseignant = data
        return this.nEnseignant;
      }
    )
  }

  getCountClubByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.userservice.getCountClubByUniversiteId(this.id).subscribe(
      data => {
        this.nClubs = data
        return this.nClubs;
      }
    )
  }

  getCountSalleByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.salleservice.countSalleByUniversiteId(this.id).subscribe(
      data => {
        this.nSalle = data
        return this.nSalle;
      }
    )
  }
  getCountMatByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.matiereservice.countMataByUniversiteId(this.id).subscribe(
      data => {
        this.nMatiere = data
        return this.nMatiere;
      }
    )
  }
}
