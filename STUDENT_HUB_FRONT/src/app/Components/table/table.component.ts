import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  id: any;
  ListUniversite: any;
  closeResult: string;
  hide = true;
  user: any = {};
  cin: any;
  msg = '';
  form: FormGroup;
  nom: string;
  submitted = false;

  constructor(private modalService: NgbModal, private userservice: UserService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllUniversite();
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

  getAllUniversite() {
    this.userservice.getAllUniversities().subscribe(
      data => {
        this.ListUniversite = data;
        console.log(this.ListUniversite)
        return this.ListUniversite;
      }
    )
  }
  addUniversity() {
    this.userservice.addUniversite(new User()).subscribe(
      data => {
        this.router.navigate(["/home/table"]);
        console.log(data);
        return data;
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

  SearchUniversity() {
    if (this.nom != "") {
      this.ListUniversite = this.ListUniversite.filter(res => {
        return res.nom.toLowerCase().match(this.nom.toLowerCase());
      });
    }
    else if (this.nom == "") {
      this.getAllUniversite();
    }
  }
}
