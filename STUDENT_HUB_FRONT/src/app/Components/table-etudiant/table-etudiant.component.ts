import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/User/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/Services/User/alert.service';
import { ClassService } from 'src/app/Services/Class/class.service';

@Component({
  selector: 'app-table-etudiant',
  templateUrl: './table-etudiant.component.html',
  styleUrls: ['./table-etudiant.component.scss']
})
export class TableEtudiantComponent implements OnInit {
  id: any;
  listClass: any;
  ListUniversite: any;
  ListEtudiant: any;
  closeResult: string;
  hide = true;
  user: any = {};
  cin: any;
  msg = '';
  form: FormGroup;
  submitted = false;
  classe: any;
  nEtudiant: any;
  nom: string;
  faDel= faTrash;
  faEdit=faEdit;
  hidemsg = true;
  faUndo = faUndo;

  constructor(private classservice: ClassService, private modalService: NgbModal, private userservice: UserService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getEtudiantByClass();
    this.getClassByNiveauId();
    this.findClassById();
    this.getCountEtudiantByClassId();
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      dateNaissance: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }


    // this.loading = true;
    this.userservice.addEtudiant(this.form.value, localStorage.getItem("Id"), sessionStorage.getItem("IdClass"), localStorage.getItem("profileImage"))
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Student Added Succeffuly !"
        },
        error => {
          ;
          this.alertService.error(error);
          console.log(error);
        });
  }

  onEdit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.userservice.updateUser(this.form.value, sessionStorage.getItem("IdUser"))
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Student Updated Succeffuly ! "
          return data;
        },
        error => {
          ;
          this.alertService.error(error);
        });
  }

  getEtudiantByClass() {
    this.id = sessionStorage.getItem("IdClass")
    this.userservice.getEtudiantsByClass(this.id).subscribe(
      data => {
        this.ListEtudiant = data;
        return this.ListEtudiant;
      }
    )
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

  deleteUser() {
    this.userservice.deleteUser(sessionStorage.getItem("IdUser")).subscribe(
      data => {
        return data;
      });
  }

  setIdUser(id: any) {
    sessionStorage.setItem("IdUser", id);
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

  opene(contente) {
    this.modalService.open(contente, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  findClassById() {
    this.classservice.getClassById(sessionStorage.getItem("IdClass")).subscribe(
      data => {
        this.classe = data;
        return this.classe;
      }
    )
  }

  getCountEtudiantByClassId() {
    this.userservice.getCountEtudiantByClassId(sessionStorage.getItem("IdClass")).subscribe(
      data => {
        this.nEtudiant = data;
        return this.nEtudiant;
      }
    )
  }

  SearchEtudiant() {
    if (this.nom != "") {
      this.ListEtudiant = this.ListEtudiant.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getEtudiantByClass();
    }
  }

  activerUser(id: any) {
    this.userservice.activerUser(id).subscribe(
      data => {
        return data;
      }
    )
  }
}
