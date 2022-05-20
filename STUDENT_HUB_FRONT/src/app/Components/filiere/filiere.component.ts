import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { FiliereService } from 'src/app/Services/Filiere/filiere.service';
import { AlertService } from 'src/app/Services/User/alert.service';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss']
})
export class FiliereComponent implements OnInit {

  listFiliere: any;
  nFiliere: any;
  hideUniversite = true;
  closeResult: string;
  form: FormGroup;
  submitted = false;
  nom: string;
  id: any;
  faTrash = faTrash;
  msg = '';
  hidemsg = true;
  faUndo = faUndo;

  constructor(private modalService: NgbModal, private filiereservice: FiliereService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {

    this.getCountFiliereByUniversiteId();
    this.getFiliereByUniversiteId();
    this.HideUniversite();
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
    });

  }


  active: boolean;
  get f() { return this.form.controls; }

  onFiliere() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.filiereservice.addFiliere(this.form.value, this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration Successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Department Added Succeffuly !"
          return data;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  getFiliereByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.filiereservice.getFiliereByUniversiteId(this.id).subscribe(
      data => {
        this.listFiliere = data;
        return this.listFiliere;
      }
    )
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openalert(contentalert) {
    this.modalService.open(contentalert, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  SearchFiliere() {
    if (this.nom != "") {
      this.listFiliere = this.listFiliere.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getFiliereByUniversiteId();
    }
  }

  getCountFiliereByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.filiereservice.getCountFiliereByUniversiteId(this.id).subscribe(data => {
      this.nFiliere = data;
      return this.nFiliere;
    })
  }

  setIdFiliere(id: any) {
    sessionStorage.setItem("IdFiliere", id);
  }

  HideUniversite() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.hideUniversite = false;
    }
  }

  deleteFiliere() {
    this.filiereservice.deleteFiliere(sessionStorage.getItem('IdFiliere')).subscribe(
      data => {
        return data;
      }
    )
  }
}
