import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UserInterface } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
editing = false;
user: UserInterface;

task: AngularFireUploadTask;

path: string;
meta: object;
uploadType: boolean;

        constructor(
          private auth: AuthService,
          private userService: UserService,
          private storage: AngularFireStorage,
          private location: Location
        ) {}

        ngOnInit() {
          this.getUser();
          this.setUploadData();
        }

        setUploadData() {
          return this.auth.user.subscribe(user => {
            if (user) {
this.path = `uploads/${user.id}/gallery`;
this.meta = { uploader: user.id, website: 'https//savanapoint.com'};
this.uploadType = true;
            }
          });
        }

        getUser() {
          return this.auth.user.subscribe(user => (this.user = user));
        }

        updateProfile() {
          return this.userService.updateProfileData(this.user.name, this.user.photoUrl);
        }





        updateEmail() {
          return this.userService.updateEmailData(this.user.email);
        }


        uploadPhotoURL(event): void {
          const file = event.target.files[0];
          const path = `users/${this.user.id}/photos/${file.name}`;
          if (file.type.split('/')[0] !== 'image') {
            return alert('only images allowed');
          } else {
            this.task = this.storage.upload(path, file);

            // add this ref
            const ref = this.storage.ref(path);

            // and change the observable here
            ref.getDownloadURL().subscribe(url => {
              this.userService.updateProfileData(this.user.name, url);
            });
          }
        }


        updateUser() {
          const data = {
            website: this.user.website || null,
            location: this.user.location || null,
            bio: this.user.bio || null
          };
          return this.userService.updateUserData(data);
        }

        goBack() {
          this.location.back();
        }

























}
