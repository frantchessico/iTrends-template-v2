
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  order = 'createdAt';
  filterPosts = 'createdAt b';

  constructor(private dataApi: DataApiService,
    private authService: AuthService,
    private toat: ToastrService
    ) { }
 public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}).hasOwnProperty('admin');
        });
      }
    });
  }
  getListBooks() {
    this.dataApi.getAllBooks()
      .subscribe(books => {
        this.books = books;
      });
  }

  async onDeleteBook(idBook: string) {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteBook(idBook);

      await this.toat.error('O seu anúncio foi apagado com sucesso.');
    }
  }

  onPreUpdateBook(book: BookInterface) {
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
