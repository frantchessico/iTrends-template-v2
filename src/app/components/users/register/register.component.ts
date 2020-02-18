import { AngularFireAuth } from "@angular/fire/auth";

import { CustomValidator } from './customvalidator';

import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, AbstractControl } from '@angular/forms';
// import { AuthService } from './../../../services/auth.service';
import { auth } from 'firebase/app';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { map, take, debounceTime } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';






@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.contactForm = this.createFormGroup();
  }
  @ViewChild('imageUser', { static: true }) imageUser: ElementRef;
  contactForm: FormGroup;
  public firstName = '';
  public lastName = '';
  public email = '';
  public password = '';
  public userName = '';
  public phone = '';
  public displayName = '';
  public passwordConfirm = '';
  public customer = '';
  public photoUrl = '';
  passworShow = false;


  get userFirstName() {
    return this.contactForm.get('firstName');
  }

  get userLastName() {
    return this.contactForm.get('lastName');
  }
  get emailForm() {
    return this.contactForm.get('email');
  }
  get passwordForm() {
    return this.contactForm.get('password');
  }
  // get passwordConfirme() {
  //   return this.contactForm.get('passwordConfirm');
  // }

  get brand() {
    return this.contactForm.get('userName');
  }

  get userPhone() {
    return this.contactForm.get('phone');
  }

  get userCustomer() {
    return this.contactForm.get('customer');
  }



  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  uploadPercent: any;
  urlImage: Observable<string>;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),

      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
         Validators.maxLength(10)
      ]),


      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
         Validators.maxLength(30)
      ]),


      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
         Validators.maxLength(10)
      ]),

      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
         Validators.maxLength(10)
      ]),

      customer: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
         Validators.maxLength(10)
      ]),


      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
         Validators.maxLength(20)
      ]),
    });
  }

  ngOnInit() {

    this.contactForm = this.fb.group({
      email:  ['', [
        Validators.required,
        Validators.email
      ]],
      userName:  ['',
        Validators.required,
        CustomValidator.userName(this.afs)
      ],


      firstName:  ['',
        Validators.required,
        CustomValidator.userName(this.afs)
      ],
      lastName:  ['',
        Validators.required,
        CustomValidator.userName(this.afs)
      ],
    phone:  ['',
    Validators.required,
    CustomValidator.phone(this.afs)
  ],


      password: ['', Validators.required],

    });
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random()
      .toString(36)
      .substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }
  onAddUser() {

      this.authService
        .registerUser(
          this.email,
          this.password,
          this.userName,
          this.phone, this.firstName,
          this.lastName,
          this.customer)
        .then(res => {
          this.authService.sendEmailLink(this.email);
          this.authService.isAuth().subscribe(user => {
            if (user) {
              user
                .updateProfile({
                  displayName: '',

                  photoURL: this.imageUser.nativeElement.value
                })
                .then(() => {
                  this.onLoginRedirect();
                  this.toastr.info('Cadastro', 'Confirma o seu email');
                })
                .catch(error => {
                  this.toastr.error('Error', 'Hello');
                });
            }
          });
        })
        .catch(err => {
          this.toastr.error(
            'O endereço de email já está sendo usado por outra conta !... 😢 😢 😢 😢 😢 😢 😢 😢 😢 ',
            'Cadastro'
          );
        });

  }
  onLoginGoogle(): void {
    this.authService
      .loginGoogleUser()
      .then(res => {
        // this.onLoginRedirect();
        this.router.navigate(['']);
      })
      .catch(err => {
        this.toastr.error( err.message, 'Mensagem'
        );
      });
  }
  onLoginFacebook(): void {
    this.authService
      .loginFacebookUser()
      .then(res => {
        this.onLoginRedirect();
      })
      .catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}















































