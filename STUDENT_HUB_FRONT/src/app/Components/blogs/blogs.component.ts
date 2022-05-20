import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/Services/Blog/blog.service';

import { faThumbsUp, faThumbsDown, faTrash, faComment, faPlusCircle, faClosedCaptioning, faSlash } from '@fortawesome/free-solid-svg-icons';
import { CommentaireService } from 'src/app/Services/Commentaire/commentaire.service';
import { Blog } from 'src/app/Models/Blog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/Services/User/alert.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  id: any;
  ListBlog: any;
  titre: string;
  date: string;
  user: string;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrash;
  faComment = faComment;
  nComment: any;
  nBlogs: any;
  hideformblog = true;
  blog: any = {};
  selectedFile: File = null;
  hideimage = true;
  hideform = false;
  showmsg = true;
  msg = '';
  closeResult: string;
  faAdd=faPlusCircle;
  style1: string;
  isOpened: boolean;
  toggleStyle: string;
  faClose=faSlash
  constructor(private modalService: NgbModal,
    private blogservice: BlogService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commentaireservice: CommentaireService
  ) { }


  ngOnInit(): void {
    this.getAllBlogs();
    this.hideSupp(this.id);
    this.hideFormBlog();
  }
  toggle(){
    this.style1="flex";
    // this.style2="none";
    this.isOpened=true;
    this.toggleStyle="flex";

  }
  closeNote(){
    this.style1="none"
    this.isOpened=false;
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

  getAllBlogs() {
    this.blogservice.getAllBlog().subscribe(
      data => {
        this.ListBlog = data;
        this.nBlogs = this.ListBlog.length;
        return this.ListBlog;
      }
    )
  }

  setBlogId(id: any) {
    sessionStorage.setItem("IdBlog", id);
  }

  SearchBlogByTitre() {
    if (this.titre != "") {
      this.ListBlog = this.ListBlog.filter(res => {
        return res.titre.toLowerCase().match(this.titre.toLowerCase());
      });
    }
    else if (this.titre == "") {
      this.getAllBlogs();
    }
  }

  SearchBlogByDate() {
    if (this.date != "") {
      this.ListBlog = this.ListBlog.filter(res => {
        return res.date.toLowerCase().match(this.date.toLowerCase());
      });
    }
    else if (this.date == "") {
      this.getAllBlogs();
    }
  }

  deleteBlog() {
    this.blogservice.deleteBlog(sessionStorage.getItem("IdBlog")).subscribe(
      data => {
        return data;
      }
    );
  }

  hideSupp(id: any) {
    if (id == localStorage.getItem("Id")) {
      return false
    } else {
      return true
    }
  }

  CountCommentaireByBlogId(id: any) {
    return this.commentaireservice.countCommentaireByBlogId(id).subscribe(
      data => {
        this.nComment = data;
        return this.nComment;
      }
    );
  }

  likeBlog(id: any) {
    this.blogservice.likeBlog(id).subscribe(
      data => {
        let hidelike = true;
        let hidedislike = false;
        return data;
      }
    )
  }

  dislikeBlog(id: any) {
    this.blogservice.disLikeBlog(id).subscribe(
      data => {
        let hidelike = false;
        let hidedislike = true;
        return data;
      }
    )
  }

  hideFormBlog() {
    if (localStorage.length != 0) {
      this.hideformblog = false;
    }
  }

  addBlog(blog: Blog) {
    this.id = localStorage.getItem("Id")
    this.blogservice.addBlog(blog, this.id).subscribe(
      data => {
        blog = data;
        this.hideform = true;
        this.hideimage = false;
        sessionStorage.setItem("IdBlog", blog._id)
        return blog;
      }
    )
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  addImage() {
    this.id = sessionStorage.getItem("IdBlog");
    const file = new FormData();
    file.append('image', this.selectedFile, this.selectedFile.name)
    console.log(file);
    this.blogservice.addImage(file, this.id).subscribe(
      data => {
        this.showmsg = false;
        this.msg = "Enjoy ! "
        return data;
      });
  }

}
