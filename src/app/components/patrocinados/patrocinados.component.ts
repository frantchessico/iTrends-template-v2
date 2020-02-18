import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { UserInterface } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patrocinados',
  templateUrl: './patrocinados.component.html',
  styleUrls: ['./patrocinados.component.css']
})
export class PatrocinadosComponent implements OnInit {
  today: number = Date.now();
  views = 0;
  order = 'createdAt';
  filterPosts;
  providerId: string;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService
  ) {}
  public userUid: string = null;
  public isAdmin: any = null;


  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    //roles: {}
  };
  public books = [];
  public book = '';
  public isLogged = false;
  ngOnInit() {
    setTimeout(function() {
      this.filterPosts = 'carros';
    }, 100);
    this.patro();
    this.sayTime();
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
          this.isAdmin = Object.assign({}).hasOwnProperty(
            
          );
          // this.isAdmin = true;
        });
      }
    });
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }
  sayTime() {
    const h = this.today;
  }

  view() {
    this.views++;
  }

  

  patro() {
    const keyWord = 'tickets';
    const keyWord2 = 'carros';
  const names = [keyWord, keyWord2];
  const name = [names[0]];

   const rec = () => {
    for (let  i = 0; i < name.length; i++ ) {
     return name[i];
    }
   };
   this.filterPosts = rec();
  }
}
