import { Component, OnInit } from '@angular/core';
import { BookInterface } from '../../models/book';
import { ActivatedRoute, Params } from '@angular/router';
import { DataApiService } from '../../services/data-api.service';
import { UserInterface } from './../../models/user';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {
  providerId: string;
  constructor(
    private spinner: NgxSpinnerService,
    private dataApi: DataApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
  ) {}

  public userUid: string = null;
  public isAdmin: any = null;
  filterPosts = '';
  fullScreen;
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
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
    this.getCurrentUser();
    this.dataApi.getAllBooks().subscribe(books => {

      this.books = books;
    });

    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
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
          this.isAdmin = Object.assign({}).hasOwnProperty(

          );
          // this.isAdmin = true;
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
}
