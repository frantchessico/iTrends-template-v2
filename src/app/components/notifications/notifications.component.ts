import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  

  constructor(
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private toatar: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.notifyUserToEditProfile();
    this.authService.isAuth().subscribe(user => {
      console.log(user);
      if (user.emailVerified !== true) {
                this.toatar.info('Verificar a sua conta', `${user.displayName}`)
               this.router.navigate(['entrar']); 
      }
    });
  }
 notifyUserToEditProfile() {
   this.authService.isAuth().subscribe( user => {
     if (user.displayName || user.phoneNumber || user.photoURL ) {
      this.toatar.info('Editar seu perfil'); 
     }
   });
 }
}
