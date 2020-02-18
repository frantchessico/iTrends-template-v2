import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public btn = false;
  emailVerified: boolean;
  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private toat: ToastrService,
    private router: Router
  ) { }

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
  
    //roles: {}
  };
  public providerId = 'null';
  public app_name = 'abolada';
  public isLogged = false;


  @ViewChild('drawer', { static: false })
  drawer: MatSidenav;

  ngOnInit() {

    $(function ($) {

    $('.sidebar-dropdown > a').click(function() {
  $('.sidebar-submenu').slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass('active')
  ) {
    $('.sidebar-dropdown').removeClass('active');
    $(this)
      .parent()
      .removeClass('active');
  } else {
    $('.sidebar-dropdown').removeClass('active');
    $(this)
      .next('.sidebar-submenu')
      .slideDown(200);
    $(this)
      .parent()
      .addClass('active');
  }
});

$('#close-sidebar').click(function() {
  $('.page-wrapper').removeClass('toggled');
});
$('#show-sidebar').click(function() {
  $('.page-wrapper').addClass('toggled');
});

});

    this.clicked();
    this.authService.isAuth().subscribe(user => {
      if (user) {
        if (this.emailVerified = user.emailVerified) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        }  else {
          this.router.navigate(['/entrar']);
        }
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

  clicked()  {
    this.btn = false;
  }

}
