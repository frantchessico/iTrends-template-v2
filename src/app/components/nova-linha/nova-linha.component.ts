import { Component, OnInit } from '@angular/core';
import { DataApiService } from "../../services/data-api.service";
import { UserInterface } from "./../../models/user";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: "app-nova-linha",
  templateUrl: "./nova-linha.component.html",
  styleUrls: ["./nova-linha.component.css"]
})
export class NovaLinhaComponent implements OnInit {
  providerId: string;
  constructor(
    private dataApi: DataApiService,
    private authService: AuthService,
    private afsAuth: AngularFireAuth
  ) {}
  public userUid: string = null;
  public isAdmin: any = null;

  user: UserInterface = {
    name: "",
    email: "",
    photoUrl: "",
    //roles: {}
  };
  public books = [];
  public book = "";

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
