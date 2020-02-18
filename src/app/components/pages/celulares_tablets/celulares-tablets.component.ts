import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../../services/auth.service";
import { UserInterface } from "./../../../models/user";
import { DataApiService } from "./../../../services/data-api.service";import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-artista",
  templateUrl: "./celulares-tablets.component.html",
  styleUrls: ["./celulares-tablets.component.css"]
})
export class CelularesTabletsComponent implements OnInit {
  providerId: string;
  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    private afsAuth: AngularFireAuth
  ) {}
  public userUid: string = null;
  public isAdmin: any = null;
  order: string = 'createdAt';
  filterPosts = 'celulares-tablets';

  user: UserInterface = {
    name: "",
    email: "",
    photoUrl: "",
    //roles: {}
  };
  public books = [];
  public idioma ='';
  public book = '';
  public isLogged: boolean = false;
  ngOnInit() {
    this.getCurrentUser();
    this.dataApi.getAllBooks().subscribe(books => {
      console.log("BOOKS", books);
      this.books = books;
    });
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}).hasOwnProperty();
          // this.isAdmin = true;
        });
      }
    });
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log("user logged");
        this.isLogged = true;
      } else {
        console.log("NOT user logged");
        this.isLogged = false;
      }
    });
  }
}
