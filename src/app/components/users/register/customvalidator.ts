
import {  AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, debounceTime } from 'rxjs/operators';

// userName..toLowerCase()

export class CustomValidator {
  static userName(afs: AngularFirestore) {
   return (control: AbstractControl) => {
const userName = control.value.toLowerCase();
// tslint:disable-next-line: max-line-length
return afs.collection('users', ref => ref.where('userName', '==', userName.replace(/\s/g, '', 'userName', '==', userName))).valueChanges().pipe(
  debounceTime(300),
  take(1),
  map(arr => arr.length ? { usernameAvailable: false} : null),
);
   };
  }



   static email(afs: AngularFirestore) {
    return (control: AbstractControl) => {
 const email = control.value.toLowerCase();
 return afs.collection('users', ref => ref.where('email', '==', email)).valueChanges().pipe(
   debounceTime(300),
   take(1),
   map(arr => arr.length ? { email: false} : null),
 );
    };
   }



   static phone(afs: AngularFirestore) {
    return (control: AbstractControl) => {
 const phone = control.value.toLowerCase();
 return afs.collection('users', ref => ref.where('phone', '==', phone)).valueChanges().pipe(
   debounceTime(300),
   take(1),
   map(arr => arr.length ? { phone: false} : null),
 );
    };
   }
}














