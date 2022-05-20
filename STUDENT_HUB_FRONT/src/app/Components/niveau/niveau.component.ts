import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { NiveauService } from 'src/app/Services/Niveau/niveau.service';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent implements OnInit {

  listNiveau: any;
  nNiveau: any;
  hideUniversite = true;
  closeResult: string;
  form: FormGroup;
  submitted = false;
  nom: string;
  id: any;
  faTrash = faTrash;
  faUndo = faUndo;
  msg = '';
  hidemsg = true;

  constructor(private modalService: NgbModal, private niveauservice: NiveauService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {

    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.hideUniversite = false;
    }
    this.getNiveauBySpecialiteId();
    this.getCountNiveauBySpecialiteId();

    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
    });
  }

  active: boolean;
  get n() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.id = sessionStorage.getItem("IdSpecialite");
    this.niveauservice.addNiveau(this.form.value, this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Level Added Succeffuly !"
          return data;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  getNiveauBySpecialiteId() {
    this.id = sessionStorage.getItem("IdSpecialite");
    this.niveauservice.getNiveauBySpecialiteId(this.id).subscribe(
      data => {
        this.listNiveau = data;
        return this.listNiveau;
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

  SearchNiveau() {
    if (this.nom != "") {
      this.listNiveau = this.listNiveau.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getNiveauBySpecialiteId();
    }
  }

  getCountNiveauBySpecialiteId() {
    this.id = sessionStorage.getItem("IdSpecialite");
    this.niveauservice.getCountNiveauBySpecialiteId(this.id).subscribe(data => {
      this.nNiveau = data;
      return this.nNiveau;
    })
  }

  setIdNiveau(id: any) {
    sessionStorage.setItem("IdNiveau", id);
  }

  deleteNiveau() {
    this.niveauservice.deleteNiveau(sessionStorage.getItem("IdNiveau")).subscribe(
      data => {
        return data;
      }
    )
  }
}
