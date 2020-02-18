import { Views, BookInterface } from './../models/book';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}
  filepath: any;
  downloadURL: Observable<string>;
  urlImageVerso1: Observable<string>;
  urlImageVerso2: Observable<string>;
  urlImageVerso3: Observable<string>;
  private booksCollection: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>;

  private Mydate: Observable<BookInterface>;
  private viewsCollection: AngularFirestoreCollection<Views>;
  private views: Observable<Views[]>;
  private viewDoc: AngularFirestoreDocument<Views>;
  private view: Observable<Views>;
  createdAt: any = new Date().toISOString();
  files: any[];

  public selectedBook: BookInterface = {
    id: null
  };


  getAllBooks() {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return (this.books = this.booksCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getAllViews() {
    this.booksCollection = this.afs.collection<BookInterface>('views');
    return (this.views = this.booksCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref =>
      ref.where('oferta', '==', '1')
    );
    return (this.books = this.booksCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return (this.book = this.bookDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as BookInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    ));
  }

  public async addBook(book: BookInterface) {

    const newpost = {
      titulo: book['titulo'],
      userUid: book['userUid'],
      id: book['id'],
      categorias: book['categorias'],
      bairro: book['bairro'],
      email: book['email'],
      telefone: book['telefone'],
      cidade: book['cidade'],
      provincia: book['provincia'],
      precio: book['precio'],
      situacao: book['situacao'],
      descripcion: book['descripcion'],
      urlImage: book['urlImage'],
      urlImageVerso1: book['urlImageVerso1'],
      urlImageVerso2: book['urlImageVerso2'],
      urlImageVerso3: book['urlImageVerso3'],
      likes: [],
      createdAt: this.createdAt
    };
    this.booksCollection.add(newpost);
  }
  public async updateBook(book: BookInterface) {


    const idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }
  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }
}
