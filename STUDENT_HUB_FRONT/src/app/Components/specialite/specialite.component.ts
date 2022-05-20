import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { SpecialiteService } from 'src/app/Services/Specialite/specialite.service';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  listSpecialite: any;
  nSpecialite: any;
  hideUniversite = true;
  closeResult: string;
  form: FormGroup;
  submitted = false;
  nom: string;
  id: any = sessionStorage.getItem("IdFiliere");
  faTrash = faTrash;
  faUndo = faUndo;
  msg = '';
  hidemsg = true;

  constructor(private modalService: NgbModal, private specialiteservice: SpecialiteService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {

    this.getSpecialiteByFiliereId();
    this.getCountSpecialiteByFiliereId();
    this.HideUniversite();

    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      acro: ['', [Validators.required, Validators.maxLength(6)]],
    });
  }

  active: boolean;
  get s() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.specialiteservice.addSpecialite(this.form.value, this.id).pipe(first()).subscribe(
      data => {
        this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        this.hidemsg = false;
        this.msg = "Speciality Added Succeffuly !"
        return data;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  getSpecialiteByFiliereId() {
    this.specialiteservice.getSpecialiteByFiliereId(this.id).subscribe(
      data => {
        this.listSpecialite = data;
        return this.listSpecialite;
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

  SearchSpecialite() {
    if (this.nom != "") {
      this.listSpecialite = this.listSpecialite.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getSpecialiteByFiliereId();
    }
  }

  getCountSpecialiteByFiliereId() {
    this.specialiteservice.getCountSpecialiteeByFiliereId(this.id).subscribe(
      data => {
        this.nSpecialite = data;
        return this.nSpecialite;
      }
    );
  }

  setIdSpecialite(id: any) {
    sessionStorage.setItem("IdSpecialite", id);
  }

  HideUniversite() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.hideUniversite = false;
    }
  }

  deleteSpecialite() {
    this.specialiteservice.deleteSpecialite(sessionStorage.getItem('IdSpecialite')).subscribe(
      data => {
        return data;
      }
    )
  }
}
