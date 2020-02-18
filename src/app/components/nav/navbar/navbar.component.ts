// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../../services/auth.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { UserInterface } from '../../../models/user';
// import * as $ from 'jquery';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   public btn = false;
//   constructor(
//     private authService: AuthService,
//     private afsAuth: AngularFireAuth,
//     private toat: ToastrService,
//     private router: Router
//   ) {}
//   user: UserInterface = {
//     name: '',
//     email: '',
//     photoUrl: '',
//     uid: '',
//     // roles: {}
//   };
//   public providerId = 'null';
//   public app_name = 'abolada';
//   public brand = '';
//   public isLogged = false;
//   public usersDatas = [];
//   public routerUid = '';
//   public userUid = '';
//   ngOnInit() {
//        this.authService.getAllUsers().subscribe( usersDatas => {
//            this.usersDatas = usersDatas;
//         //  for(let userRouter of usersDatas) {
//         //    this.brand = userRouter.brand;
//         //    this.routerUid = userRouter.uid; }

//     });

//     $('#menu-toggle').click(function(e) {
//       e.preventDefault();
//       $('#wrapper').toggleClass('toggled');
//     });

//     this.clicked();
//     this.authService.isAuth().subscribe(user => {
//       if (user) {
//         this.user.name = user.displayName;
//         this.user.email = user.email;
//         this.user.photoUrl = user.photoURL;
//         this.providerId = user.providerData[0].providerId;
//       }
//     });
//     this.getCurrentUser();
//   }

//   getCurrentUser() {
//     this.authService.isAuth().subscribe(auth => {
//       this.userUid = auth.uid;
//       if (auth) {

//         this.isLogged = true;
//       } else {

//         this.isLogged = false;
//       }
//     });
//   }

//   onLogout() {
//     this.authService.logoutUser().then(() => {
//       this.router.navigate(['entrar']);
//     }).then(() => {
//  this.toat.info('Obrigado, volte sempre!', 'iTrends');
//     }).catch(() => {
//       this.toat.error('Ops! Ocorreu um erro.', 'iTrends');
//     });
//   }

//   clicked()  {
//     this.btn = false;
//   }
// }


import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public btn = false;
  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private toat: ToastrService,
    private router: Router
  ) {}
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    // roles: {}
  };
  public providerId = 'null';
  public app_name = 'abolada';
  public isLogged = false;
  ngOnInit() {


    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });

    this.clicked();
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {

        this.isLogged = true;
      } else {

        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['entrar']);
    }).then(() => {
 this.toat.info('Obrigado, volte sempre!', 'iTrends');
    }).catch(() => {
      this.toat.error('Ops! Ocorreu um erro.', 'iTrends');
    });
  }

  clicked()  {
    this.btn = false;
  }
}