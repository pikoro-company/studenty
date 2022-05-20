import { Component, OnInit } from '@angular/core';
import { MatiereService } from 'src/app/Services/Matiere/matiere.service';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/Services/User/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss']
})
export class MatiereComponent implements OnInit {
  nMatiere: any;
  listMatiere: any;
  nom: any;
  faUndo = faUndo;
  faTrash = faTrash;
  form: FormGroup;
  submitted = false;
  id: any;
  hidemsg = true;
  msg = '';
  closeResult: string;
  matiereservice: any;
  constructor(private Matiereservice: MatiereService, private modalService: NgbModal, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getMatByUniversiteId();
    this.countMatByUniversiteId();

    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      coef: ['', Validators.required],
   
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
    this.Matiereservice.addMatiere(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration Successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Matters Added Succeffuly !"
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

  getMatByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.Matiereservice.getMatByUniversiteId(this.id).subscribe(
      data => {
        this.listMatiere = data;
        return this.listMatiere;
      }
    )
  }

  countMatByUniversiteId() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    } else if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    }
    this.Matiereservice.countMatByUniversiteId(this.id).subscribe(
      data => {
        this.nMatiere = data;
        return this.nMatiere;
      }
    )
  }

  SearchMatiere() {
    if (this.nom != "") {
      this.listMatiere = this.listMatiere.filter(res => {
        return res.coef.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getMatByUniversiteId();
    }
  }

  deleteMatiere() {
    this.Matiereservice.deleteMatiere(sessionStorage.getItem("IdMatiere")).subscribe(
      data => {
        return data;
      }
    )
  }

  setIdMatiere(id: any) {
    sessionStorage.setItem("IdMatiere", id);
  }
}


