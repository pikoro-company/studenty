import { Component, OnInit } from '@angular/core';
import { SalleService } from 'src/app/Services/Salle/salle.service';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/Services/User/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit {

  listSalle: any;
  nSalle: any;
  nom: any;
  faUndo = faUndo;
  faTrash = faTrash;
  form: FormGroup;
  submitted = false;
  id: any;
  hidemsg = true;
  msg = '';
  closeResult: string;

  constructor(private salleservice: SalleService, private modalService: NgbModal, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getSalleByUniversiteId();
    this.countSalleByUniversiteId();

    this.form = this.formBuilder.group({
      numero: ['', Validators.required],
      bloc: ['', Validators.required],
      etage: ['', Validators.required],
    });
  }

  active: boolean;
  get f() { return this.form.controls; }

  onSubmit() {
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
    this.salleservice.addSalle(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration Successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Schoolroom Added Succeffuly !"
          return data;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAlert(contentAlert) {
    this.modalService.open(contentAlert, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  getSalleByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.salleservice.getSalleByUniversiteId(this.id).subscribe(
      data => {
        this.listSalle = data;
        return this.listSalle;
      }
    )
  }

  countSalleByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.salleservice.countSalleByUniversiteId(this.id).subscribe(
      data => {
        this.nSalle = data;
        return this.nSalle;
      }
    )
  }

  SearchSalle() {
    if (this.nom != "") {
      this.listSalle = this.listSalle.filter(res => {
        return res.bloc.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getSalleByUniversiteId();
    }
  }

  deleteSalle() {
    this.salleservice.deleteSalle(sessionStorage.getItem("IdSalle")).subscribe(
      data => {
        return data;
      }
    )
  }

  setIdSalle(id: any) {
    sessionStorage.setItem("IdSalle", id);
  }
}
