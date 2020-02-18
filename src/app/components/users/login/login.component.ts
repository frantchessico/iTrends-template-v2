import { AuthService } from "./../../../services/auth.service";
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,

    ) { }
  public email = '';
  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public password = '';
  showSpiner = false;
  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user.emailVerified !== true) {
            this.toastr.info('Verificar a sua conta', `iTrends from SavanaPoint`);
            this.authService.logoutUser();
            user.sendEmailVerification().then(() => {
              console.log('enviamos um email');
            }).catch(() => {
              console.log('Algo deu errado');
            });
            return this.router.navigate(['entrar']);
          } else {
            // this.showSpiner = true;
           this.onLoginRedirect();
          }
        });

          return console.log(res)
      }).catch(err => {
        this.toastr.error('Os dados de login estão incorrectos.', 'Login');
      });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLogout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['']);
    });
  }
  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}
