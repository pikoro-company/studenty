import { Component, OnDestroy, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';
import { faBlog, faEdit, faKey, faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import { changePassword } from 'src/app/Models/changePassword';
import { TokenStorageService } from 'src/app/Services/TokenStorage/token-storage.service';
declare const $: any;

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  id: any = this.tokenstorage.getId();
  user: any = {};
  msg = '';
  showmsg = true;
  errMsg = '';
  showErrMsg = true;
  hideop = true;
  hidenp = true;
  hidecnp = true;
  selectedFile: File = null;
  showupdate = true;
  showchangepwd = false;
  showprofileimage = false;
  showcoverimage = false;
  showinstitutimage = false;
  faBlog = faBlog;
  hideinstitutimage = true;
  hideskills = false;
  faEdit = faEdit;
  faKey = faKey;
  faImage = faImage;
  faImages = faImages;


  constructor(private tokenstorage: TokenStorageService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.findById();
    this.hideInstitutImage();
    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
      readURL(this);
    });
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

  }


  findById() {
    this.userService.findById(this.id).subscribe(
      data => {
        this.user = data;
        console.clear();
        return this.user;
      }
    );
  }

  updateProfile(user: User, id: any) {
    this.userService.updateProfile(user, this.id).subscribe(
      data => {
        this.msg = "Profile Updated  Successfully !"
        this.showmsg = false;
        user = data;
        return user;
      }
    );
  }

  changeMDP() {
    let changepassword = new changePassword(this.user.aMdp, this.user.nMdp, this.user.cNMdp)
    this.userService.changeMDP(changepassword, this.id).subscribe(
      data => {
        this.msg = "Password Updated Succefully !"
        this.showmsg = false;
        return data;
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadProfileImage() {
    const file = new FormData();
    file.append('profileImage', this.selectedFile, this.selectedFile.name)
    this.userService.changeProfileImage(file, this.id).subscribe(
      data => {
        this.msg = "Image Uploaded Succefully !"
        this.showmsg = false;
        return data;
      }
    );
  }

  uploadCoverImage() {
    const file = new FormData();
    file.append('coverImage', this.selectedFile, this.selectedFile.name)
    this.userService.changeCoverImage(file, this.id).subscribe(
      data => {
        this.msg = "Image Uploaded Succefully !"
        this.showmsg = false;
        return data;
      }
    );
  }

  uploadInstitutImage() {
    const file = new FormData();
    file.append('institutImage', this.selectedFile, this.selectedFile.name)
    this.userService.changeInstitutImage(file, this.id).subscribe(
      data => {
        this.msg = "Image Uploaded Succefully !"
        this.showmsg = false;
        return data;
      }
    );
  }

  showUpdateProfile() {
    this.showupdate = true;
    this.showchangepwd = false;
    this.showprofileimage = false;
    this.showcoverimage = false;
    this.showinstitutimage = false;
  }

  showChangePwd() {
    this.showupdate = false;
    this.showchangepwd = true;
    this.showprofileimage = false;
    this.showcoverimage = false;
    this.showinstitutimage = false;
  }

  showProfileImage() {
    this.showupdate = false;
    this.showchangepwd = false;
    this.showprofileimage = true;
    this.showcoverimage = false;
    this.showinstitutimage = false;
  }

  showCoverImage() {
    this.showupdate = false;
    this.showchangepwd = false;
    this.showprofileimage = false;
    this.showcoverimage = true;
    this.showinstitutimage = false;
  }

  showInstitutImage() {
    this.showupdate = false;
    this.showchangepwd = false;
    this.showprofileimage = false;
    this.showcoverimage = false;
    this.showinstitutimage = true;
  }

  hideInstitutImage() {
    if (localStorage.getItem("Roles").includes("ADMINISTRATEUR") || localStorage.getItem("Roles").includes("UNIVERSITE")) {
      this.hideinstitutimage = false;
    }
  }
}
