import { ViewsService } from './../../../services/views.service';
import { LikesService } from './../../../services/likes.service';
import { Component, OnInit } from '@angular/core';
import { BookInterface } from '../../../models/book';
import { ActivatedRoute, Params } from '@angular/router';
import { DataApiService } from '../../../services/data-api.service';
import { UserInterface } from './../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LikesInterface } from 'src/app/models/likes';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-preference-user',
  templateUrl: './preference-user.component.html',
  styleUrls: ['./preference-user.component.css']
})
export class PreferenceUserComponent implements OnInit  {
  [x: string]: any;
  providerId: string;
  constructor(
    private views: ViewsService,
    private spinner: NgxSpinnerService,
    private dataApi: DataApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private router: Router,
    public setLike: LikesService,
    private db: AngularFirestore,
  ) {}
  private likeDoc: AngularFirestoreDocument<LikesInterface>;
  private likesCollection: AngularFirestoreCollection<LikesInterface>;
  private likeTo: Observable<LikesInterface>;
  public userUid: string = null;
  public uid: string = null;
  public likeId: string = null;
  public likes: Observable<LikesInterface[]>;
  public liked: any = null;
  public likess: any = [];
  public posts: any;
  public isAdmin: any = null;
  public like = 0;
  public view = 0;
  private userData: LikesInterface;
  public Likes: LikesInterface[];
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    //roles: {}
  };
  public books = [];
  public book = '';
  public isLogged = false;
  public bookss: BookInterface = {};
  public users;


  ngOnInit() {
    this.viewsCount();
    this.likes = this.setLike.getAllLikes();
    this.likeds();
    this.preferenceUser();
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

    this.getCurrentUser();
    this.dataApi.getAllBooks().subscribe(books => {
      this.books = books;
    });

    const idBook = this.route.snapshot.params['id'];
    this.getDetails(idBook);
  }

  getDetails(idBook: string): void {
    this.dataApi.getOneBook(idBook).subscribe(book => {
      this.bookss = book;
    });
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}).hasOwnProperty();
        });
      }
    });
    this.authService.isAuth().subscribe(auth => {
      if (auth) {

        this.isLogged = true;
      } else {

        this.isLogged = false;
      }
    });
  }

  preferenceUser() {

      document.getElementById('btnLike').addEventListener('click', () => {
        if (this.isLogged) {
        const btnLike =  document.getElementById('btnLike');
        if (btnLike.classList.contains('far')) {
         document.getElementById('anime').classList.add('animated');
         document.getElementById('anime').classList.add('bounceInDown');
          this.like ++;
         btnLike.classList.toggle('fas');
         console.log('oi');
         console.log('UserId: ', this.userUid);
         this.db.collection('likes').valueChanges().subscribe((data) => {
           data => {
             console.log(data.uid)
           };
         });

      const setLike =  this.db.collection('likes').add({
        uid: this.userUid,
        createdAt: Date.now(),
        idBok: this.bookss.id,
        bookInffo: this.books
       });

      console.log(setLike);
        }
      } else {
        this.router.navigate(['entrar']);
      }
     });



    document.getElementById('btnStar').addEventListener('click', (uid) => {
      if (this.isLogged) {
      if ( this.userUid === this.userData.uid) {

      }

      const btnStar =  document.getElementById('btnStar');
      if (btnStar.classList.contains('far')) {

        const likeCounter = 0;
        if ( likeCounter === 0) {
           const newLike = likeCounter + 1;

          btnStar.classList.toggle('fas');
        } else {

        }
      } else {} } else {
        this.router.navigate(['entrar']);
      }

      document.getElementById('btnCart').addEventListener('click', () => {
   if (this.isLogged) {

     } else {
       this.router.navigate(['entrar']);
     }

      });
    });
  }





  likeds() {
  const docRef = this.db.collection('likes');
  docRef.get().subscribe( data => {
    this.like = data.docChanges().length;
  });
  }
  viewsCount() {
    const docRef = this.db.collection('views');
  docRef.get().subscribe( data => {
    this.view = data.docChanges().length;
  });
  }
}
