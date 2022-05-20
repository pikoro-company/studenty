import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Classe } from 'src/app/Models/Classe';
import { ClassService } from 'src/app/Services/Class/class.service';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  listClass: any;
  nClass: any;
  hideUniversite = true;
  closeResult: string;
  form: FormGroup;
  submitted = false;
  nom: string;
  id: any;
  faTrash = faTrash;
  faUndo = faUndo;
  hidemsg = true;
  msg = '';

  constructor(private modalService: NgbModal, private classservice: ClassService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {

    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.hideUniversite = false;
    }
    this.getClassByNiveauId();
    this.getCountClassByNiveauId();

    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
    });
  }

  active: boolean;
  get c() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.id = sessionStorage.getItem("IdNiveau")
    this.classservice.addClass(this.form.value, this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Classrooms Added Succeffuly !"
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  getClassByNiveauId() {
    this.id = sessionStorage.getItem("IdNiveau");
    this.classservice.getClassByNiveauId(this.id).subscribe(
      data => {
        this.listClass = data;
        return this.listClass;
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

  addNiveau() {
    this.id = sessionStorage.getItem("IdNiveau");
    this.classservice.addClass(new Classe(), this.id).subscribe(
      data => {
        this.router.navigate(["/home/niveau"]);
        return data;
      }
    )
  }

  SearchClass() {
    if (this.nom != "") {
      this.listClass = this.listClass.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getClassByNiveauId();
    }
  }

  getCountClassByNiveauId() {
    this.id = sessionStorage.getItem("IdNiveau");
    this.classservice.getCountClassByNiveauId(this.id).subscribe(data => {
      this.nClass = data;
      return this.nClass;
    })
  }

  setIdClass(id: any) {
    sessionStorage.setItem("IdClass", id);
  }

  deleteClass() {
    this.classservice.deleteClass(sessionStorage.getItem("IdClass")).subscribe(
      data => {
        return data;
      }
    )
  }
}
