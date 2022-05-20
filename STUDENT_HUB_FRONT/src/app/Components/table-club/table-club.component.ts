import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/User/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-table-club',
  templateUrl: './table-club.component.html',
  styleUrls: ['./table-club.component.scss']
})
export class TableClubComponent implements OnInit {
  id: any;
  ListClub: any;
  closeResult: string;
  hide = true;
  user: any = {};
  cin: any;
  msg = '';
  form: FormGroup;
  submitted = false;
  hidemsg = true;
  nClubs: any;
  nom: any;
  faDel= faTrash;
  faEdit=faEdit;
  faUndo = faUndo;

  constructor(private modalService: NgbModal, private userservice: UserService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllClubsByUniversiteId();
    this.countClubByUniversiteId();
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      titre: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', Validators.required],
      dateNaissance: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    } else if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    }
    this.userservice.addClub(this.form.value, this.id, localStorage.getItem("profileImage"))
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.hidemsg = false;
          this.msg = "Club Added Succeffuly ! "
          return data;
        },
        error => {
          ;
          this.alertService.error(error);
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
          this.msg = "Club Updated Succeffuly ! "
          return data;
        },
        error => {
          ;
          this.alertService.error(error);
        });
  }

  getAllClubsByUniversiteId() {
    if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    } else if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    }
    this.userservice.getClubByUniversiteId(this.id).subscribe(
      data => {
        this.ListClub = data;
        return this.ListClub;
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

  countClubByUniversiteId() {
    if (localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.id = localStorage.getItem("Id");
    } else if (localStorage.getItem("Roles").includes("ADMINISTRATEUR")) {
      this.id = sessionStorage.getItem("IdUniversite");
    }
    this.userservice.getCountClubByUniversiteId(this.id).subscribe(
      data => {
        this.nClubs = data;
        return this.nClubs;
      }
    )
  }

  SearchClubByName() {
    if (this.nom != "") {
      this.ListClub = this.ListClub.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getAllClubsByUniversiteId();
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
