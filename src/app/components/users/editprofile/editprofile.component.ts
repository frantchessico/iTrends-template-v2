import { FileI } from './../../../models/file';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UserInterface } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
        public user: UserInterface;
        public userData;
        public image: FileI;
        public currentImage;
        users: UserInterface = {
          name: '',
          email: '',
          photoUrl: '',
          phoneNumber: '',
        };
        constructor(
          private authSvc: AuthService,
          private userService: UserService,
          private storage: AngularFireStorage,
          private location: Location
        ) {}
        public profileForm = new FormGroup({
          displayName: new FormControl('', Validators.required),
          phoneNumber: new FormControl('', Validators.required),
          email: new FormControl({ value: '', disabled: false }, Validators.required),
          photoURL: new FormControl('', Validators.required),
        });

        ngOnInit() {
          this.sendVerification();
           this.getImage();
          this.authSvc.userData$.subscribe(user => {
            this.initValuesForm(user);
            console.log(user);
            this.authSvc.getAllUsers().subscribe(users => {
              for (const data of users) {
                this.userData = data;
              }
            });

          });
         }

        onSaveUser(user: UserInterface): void {
          this.authSvc.preSaveUserProfile(user, this.image);
        }

        private initValuesForm(user: UserInterface): void {
          if (user.photoUrl) {
            this.currentImage = user.photoUrl;
          }

          this.profileForm.patchValue({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          });
        }

        handleImage(image: FileI): void {
          this.image = image;
        }

        getImage() {
          this.authSvc.isAuth().subscribe(user => {
            this.users.photoUrl = user.photoURL;
            if ( user.photoURL !== null) {
              this.currentImage =  user.photoURL;
            } else {
              this.currentImage =  'https://picsum.photos/id/113/150/150';
            }
          console.log(user.photoURL);
          });

        }

        sendVerification() {

          this.authSvc.isAuth().subscribe(user => {

            if (user.emailVerified !== true) {
              user.sendEmailVerification().then(() => console.log('verica')).catch(() => {
                console.log('erro');
              });
            } else {
              return true;
            }

          });
        }
    }


























