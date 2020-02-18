import { Router } from "@angular/router";
import { ViewsService } from '../../services/views.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { UserInterface } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';





const batch = 20;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private setViews: ViewsService,
    private spinner: NgxSpinnerService,
    private dataApi: DataApiService,
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private toatar: ToastrService
  ) {

    const batchMap = this.offset.pipe(
throttleTime(500),
mergeMap(n => this.getBatch(n)),
// tslint:disable-next-line: no-shadowed-variable
scan((acc, batch ) => {
return { ...acc, ...batch };
}, {})
    );

    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }
  @ViewChild(CdkVirtualScrollViewport, {static: false})
  viewport: CdkVirtualScrollViewport;
  theEnd = false;
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;
  notEmpty = true;
  notScroll = true;
  views = 0;
  order = 'createdAt';
  filterPosts = '';
  providerId: string;
  createdAt;




  public userUid: string = null;
  public isAdmin: any = null;













  // tslint:disable-next-line: member-ordering
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    //roles: {}
  };
  // tslint:disable-next-line: member-ordering
  public books = [];
  public book = '';
  public isLogged = false;


nextBatch(e, offset) {
if (this.theEnd) {
  return;
}

const end = this.viewport.getRenderedRange().end;
const total = this.viewport.getDataLength();
if (end === total) {
this.offset.next(offset);
}
}


trackByIdx(i) {
  return i;
}


    getBatch(latesSeen: string) {
      return this.db.collection('books', ref =>
        ref.orderBy('createdAt').startAfter(latesSeen).limit(batch)
      ).snapshotChanges().pipe(
        tap(arr => (arr.length ? null : (this.theEnd = true))),
        map( arra => {
          return arra.reduce((acc, cur) => {
         const id = cur.payload.doc.id;
         const data = cur.payload.doc.data();
         return { ...acc, [id]: data};
          }, {});
        })
      );
    }
  ngOnInit() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);


    this.getCurrentUser();
    this.dataApi.getAllBooks().subscribe(books => {
      console.log('BOOKS', books);
      this.books = books;

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


  view() {
    this.views++;
  }

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      bookForm.value.userUid = this.userUid;
      this.setViews.addView(bookForm.value);
    } else {
      // Update
      this.setViews.updateView(bookForm.value);
    }
  }
  saveViews(bookId: string) {
    this.db.collection('views').add({
      uid: this.userUid,
      createdAt: Date.now(),
      idBok: bookId,
      bookInffo: this.books
    }).then(r => console.log())
    const say =  this.db.doc('books');
    }
}
