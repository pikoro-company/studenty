import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-gestion-calendrier',
  templateUrl: './gestion-calendrier.component.html',
  styleUrls: ['./gestion-calendrier.component.css']
})
export class GestionCalendrierComponent implements OnInit {
  addNoteStyle;
  showed: boolean = false;
  style;
  id: any;
  ListClub: any;
  closeResult: string;
  hide = true;
  user: any = {};
  cin: any;
  msg = '';
  form: FormGroup;
  // loading = false;
  submitted = false;
  isOpened: boolean = true;
  dropDown: boolean = false;
  isEmpty: boolean = true;
  style2 = "flex";
  style1;
  constructor(private modalService: NgbModal, private userservice: UserService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllClubs();
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      mdp: ['', [Validators.required, Validators.minLength(6)]],
      confirmMDP: ['', [Validators.required, Validators.minLength(6)]]

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
    this.userservice.addUniversite(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['/home/table']);
        },
        error => {
          ;
          this.alertService.error(error);
          // this.loading = false;
        });
  }

  getAllClubs() {
    this.userservice.getAllClub().subscribe(
      data => {
        this.ListClub = data;
        return this.ListClub;
      }
    )
  }

  deleteUser(id: any) {
    this.userservice.deleteUser(id).subscribe(data => {
      this.router.navigateByUrl['/home/table'];
      return "User deleted Succefully !"
    });
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  showPopUp() {
    this.style = "flex"
  }
  showAddnote() {
    this.addNoteStyle = "flex"
    this.showed = true;
  }
  close() {
    this.style = "none"
  }
  closeAddnote() {
    this.style = "none"
  }
  showAddSubject2() {
    this.style = "none"
    this.style2 = "flex"


  }
  toggle() {
    this.style1 = "flex";
    // this.style2="none";
    this.isOpened = true;


  }

  closeNote() {
    this.style1 = "none"
    this.isOpened = false;
  }
}
