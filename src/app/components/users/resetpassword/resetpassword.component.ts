
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';






@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
public email: string = '';
constructor(private afsAuth: AngularFireAuth, private toastr: ToastrService) { }
loginForm = new FormGroup({
email: new FormControl('', Validators.required)
});
  ngOnInit() {
    this.resetForm();
  }
  resetForm(loginForm?: NgForm) {
if (loginForm != null) {
loginForm.reset();

}
  }
  getAuth() {
    return this.afsAuth.auth;
  }
 resetPassword(loginForm?: NgForm) {
   this.getAuth();
  const emailTopassword = this.email;
 this.afsAuth.auth.sendPasswordResetEmail(emailTopassword).then( () => {
  this.resetForm(loginForm);
    // alert('Enviamos uma mensage para seu email.');
    this.toastr.success('Recuperação da senha', 'Enviamos uma mensagem, por favor verifique o seu email!');
 }).catch(() => {
  this.toastr.error('Recuperação da senha', 'Um erro ocorreu, o email que usou é inválido');
 });

}
}
