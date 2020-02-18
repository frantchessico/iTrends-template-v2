

import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, finalize } from 'rxjs/operators';
import { auth, User } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';




import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { of } from 'rxjs';
import { FileI } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User>;
  private filePath: string;
  setUser: UserInterface;
  user: Observable<UserInterface>;
  authState: firebase.User;
  error: string;
  emailSent = false;
  authenticated: any;
  urlPhoto;
  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private useer: Observable<UserInterface>;
  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage) {
      this.userData$ = afsAuth.authState;
      this.user = this.afsAuth.authState.pipe(
        switchMap(user => {
          this.authState = user;
          console.log('Firebase User Object: ', this.authState);
          if (user) {
            console.log('App User: ', this.user);
            return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );


// this.user = this.afsAuth.authState.pipe(
//   switchMap(user => {
//     this.authState = user;
//     console.log('firebase user object: ', this.authState );
//     if (user) {
// console.log('App User: ', this.user);
// return this.afs.doc<any>(`users/${user.uid}`);
//     } else {
// return of(null);
//     }
//   })
// );
  }
  preSaveUserProfile(user: UserInterface, image?: FileI): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }
  registerUser(
    email: string,
    pass: string,
    userName: string,
    phone: string,
    firstName: string,
    lastName: string,
    customer,
    
    ) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass).then()
        .then(userData => {
          const uid = userData.user.uid;
          const url = '';
          const followers = [];
          const following = [];
          const favors = [];
        this.afs.collection('users').doc(uid).set({
          userName: userName.toLowerCase(),
          uid: uid,
          brand: '@' + userName.replace(/\s/g, '').toLowerCase(),
          email: email,
          password: pass,
          phone: phone,
           userPhoto: url,
          customer: customer,
          followers: followers,
          following: following,
          favors: favors,
          firstName: firstName,
          lastName: lastName,
          bio: '',

          createdAt: Date.now().toString()
        });
          this.afsAuth.user.subscribe( x => {
if (x) {
  x.sendEmailVerification().then(() => {
    console.log('Email verification sent');
  });
}
          });

          resolve(userData),
            this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

 async loginFacebookUser() {
    // return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    //   .then(credential => this.updateUserData(credential.user));
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afsAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async loginGoogleUser() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afsAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }


  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: UserInterface = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      userName:  user.userName,
      photoUrl: user.photoUrl,

      createdAt: Date.now(),
      // roles: {
      //   editor: true
      // }
    };

    return userRef.set(data, { merge: true });

  }


  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

// sends the email to verify the user

async sendEmailLink(email: string) {
  const actionCodeSettings = {
    url: 'https://nabolada.com/posts',
     handleCodeInApp: true
  };


  try {
    await this.afsAuth.auth.sendSignInLinkToEmail(
      email,
      actionCodeSettings
    );
    window.localStorage.setItem('signInEmail', email);
    this.emailSent = true;
  } catch (err) {
    this.error = err.message;
  }
}
async confirmSignIn(url: string) {
  try {
    if (this.afsAuth.auth.isSignInWithEmailLink(url)) {
      const email = window.localStorage.getItem('signInEmail');
      if (!email) {
        // email = window.prompt('confirmar seu email');
      }

      const result = await this.afsAuth.auth.signInWithEmailLink(email, url);

      if (result) {
        this.router.navigate(['/']);
        // Clean localStorage

        window.localStorage.removeItem('signInEmail');
      } else {
        console.log('Um erro');
      }
    }
  } catch (err) {
    this.error = err.message;
  }

}

get currentUserId(): string {
  return this.authenticated ? this.authState.uid : null;
}

getAllUsers() {
this.usersCollection = this.afs.collection<UserInterface>('users');
return(this.users = this.usersCollection.snapshotChanges().pipe(
  map(changes => {
    return changes.map(action => {
const data = action.payload.doc.data() as UserInterface;
data.id = action.payload.doc.id;
return data;
    });
  })
));
}
getUID(): string {
  return this.setUser.userUid;
}


getOneUser(idUser: string) {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    return (this.user = this.userDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as UserInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    ));
  }




private uploadImage(user: UserInterface, image: FileI): void {
  this.filePath = `images/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.urlPhoto = fileRef.getDownloadURL().subscribe(urlImage => {
          user.photoUrl = urlImage;
          this.saveUserProfile(user);
        });
      })
    ).subscribe();
}

private saveUserProfile(user: UserInterface) {
  this.afsAuth.auth.currentUser.updateProfile({
    displayName: user.displayName,
    photoURL: user.photoUrl,
  })
    .then(() => console.log('User updated!'))
    .catch(err => console.log('Error', err));
}

get windowRef() {
  return window;
}
}
