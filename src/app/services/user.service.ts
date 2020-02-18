import { AuthService } from './auth.service';
import { UserInterface } from './../models/user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
      export class UserService {
userCollection: AngularFirestoreCollection<UserInterface>;
userDoc: AngularFirestoreDocument<UserInterface>;

        // tslint:disable-next-line: no-shadowed-variable
        constructor(private afs: AngularFirestore, private auth: AuthService) {}

getUsers() {
  this.userCollection = this.afs.collection('users');
  return this.userCollection.valueChanges();
}


getUser(id: string) {
  this.userDoc = this.afs.doc<UserInterface>(`users/${id}`);
  return this.userDoc.valueChanges();
}

updateProfileData(displayName: string, photoURL: string) {
  const user = this.auth.authState;
  const data = { displayName, photoURL };
  return user
  .updateProfile(data)
  .then(() => this.afs.doc(`users/${user.uid}`).update({ name, photoURL}))
  .then(() => {
    console.log('Your profile has been updated!');
  }).catch(error => console.log(error));
}

updateEmailData(email: string) {
  const user = this.auth.authState;
  return user
    .updateEmail(email)
    .then(() => this.afs.doc(`users/${user.uid}`).update({ email }))
    .then(() => console.log('Your email has been updated to: ' + email))
    .then(_user => {
      this.auth.authState
        .sendEmailVerification()
        .then(() => console.log('We sent you an email verification'))
        .catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message));
}


updateUserData(data: any) {
  const uid = this.auth.currentUserId;
  return this.afs.doc(`users/${uid}`).update(data);
}

      }
