import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from './../../models/user';
import * as $ from 'jquery';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private router: Router,
    private toat: ToastrService
  ) {}
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    //roles: {}
  };
  public providerId = 'null';
  public app_name = 'abolada';
  public isLogged = false;
  ngOnInit() {
       document.querySelector('.fab-container').addEventListener('click', function(e) {
       document.querySelector('.fab').classList.toggle('fab-active');
       document.querySelector('.fa-plus').classList.add('fa-times');

      });
    this.showButton();
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
      this.router.navigate(['/entrar']);
    }).then(() => {
 this.toat.info('Obrigado, volte sempre!', 'Nabolada');
    }).catch(() => {
      this.toat.error('Ops! Ocorreu um erro.', 'Nabolada');
    });
  }

  showButton() {
    document.querySelector('.fab').addEventListener('click', () => {
  //  document.querySelector('.fab').classList.toggle('#box');
    document.querySelector('div').classList.remove('box-on');
    document.querySelector('div').classList.add('.box-none');
    });
  }
}
