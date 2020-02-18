import { FilterPipe } from './../../../pipes/filter.pipe';
import { map } from 'rxjs/operators';
import { UserInterface } from './../../../models/user';
import { auth } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DataApiService } from '../../../services/data-api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: any;
   firstname: string;
   filterPosts;
   order = 'createdAt';
  constructor(
    private authService: AuthService,
    private dataApi: DataApiService,
    private afsAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private http: HttpClient
    ) { }
 profileUser: Observable<any[]>;
  public users = [];
  public oneUser = '';
  public userUid: string = null;
  public isAdmin: any = null;
  public books = [];
  public book = '';
  public isLogged = false;
  public firstName = '';
  public lastName = '';
  public bio = '';
  public followers = [];
  public following = [];
  public favors = [];
  public usernamee = '';
  public brand = '';
  public fullName = '';

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    userName: '',

    // roles: {}
  };

  public providerId = 'null';


  ngOnInit() {
    this.showDataProfileUser();
     this.uidBookId();
    this.getUserData();
    this.getCurrentUser();
    this.dataApi.getAllBooks().subscribe(books => {
      console.log('BOOKS', books);
      this.books = books;
    });

    this.authService.getAllUsers().subscribe( users => {
           this.users = users;
           console.log(users);
    });
    // this.authService.getAllUsers().subscribe(
    //   data => console.log('USUARIOS: ', data)
    // );
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;

        this.providerId = user.providerData[0].providerId;
      }
    });
  }



  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
    //  this.afsAuth.user.pipe().subscribe(file => console.log('File: ', file));


      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}).hasOwnProperty();
          const name = auth.displayName;
          const value = name;
          if (name) {
            name.split(' ');
            this.firstname = value[0];
           console.log(this.firstname);
          }

        });
      }
    });
    this.authService.isAuth().subscribe(auth => {

      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }



  getUserData() {
    // this.authService.isAuth().subscribe(data => this.afsAuth.user.subscribe(data => console.log(data)))
    // const userData = this.authService.getAllUsers().subscribe(users => {
    //   this.users = users;
    // });

    // console.log(userData);

    //  let name = this.afsAuth.auth.currentUser.displayName;
    //  console.log(name)
    // const user = this.authService.user.subscribe(user => user)
    // console.log('My: ', user)
    // this.afsAuth.user.subscribe(data => console.log('Dados: ',data))
    // this.authService.user.subscribe( datas => {
    //     console.log(datas);
    // }) está a me retornar undfined
    // this.authService.isAuth().subscribe( data => {
    //   this.afsAuth.user.subscribe(users => console.log('USOS: ',users))
    //   this.authService.getAllUsers().subscribe(users => {

    //     this.authService.user.subscribe(user => console.log(user))
    //   })

    // });

  }
 uidBookId() {
   this.afsAuth.user.subscribe( data => {
      this.filterPosts = data.uid;
   });
 }

 showDataProfileUser() {
   this.authService.getAllUsers().subscribe( users => {
     this.users = users;
     for (const user of users) {
       if ( user.uid === this.filterPosts) {
               this.brand = user.brand;
               this.followers = user.followers.length;
               this.following = user.following.length;
               this.favors = user.favors.length;
               this.bio = user.bio;
               this.firstname = user.firstName;
               this.lastName = user.lastName;
               this.fullName = this.firstname + ' ' + this.lastName; 
       }
     }
   });
 }
}
