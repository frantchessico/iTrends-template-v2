import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LikesInterface } from './../models/likes';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private afs: AngularFirestore) { }
  private likesCollection: AngularFirestoreCollection<LikesInterface>;
  private likes: Observable<LikesInterface[]>;
  private likeDoc: AngularFirestoreDocument<LikesInterface>;
  private like: Observable<LikesInterface>;
  private setLikes: LikesInterface;
  public selectedLike: LikesInterface = {
    uid: null
  };

  getAllLikes() {
    this.likesCollection = this.afs.collection<LikesInterface>('likes');
    return this.likes = this.likesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as LikesInterface;
          data.uid= action.payload.doc.id;
          return data;
        });
      }));
  }


  getAllLikesOffers() {
    this.likesCollection = this.afs.collection('likes', ref => ref.where('oferta', '==', '1'));
    return this.likes = this.likesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as LikesInterface;
          data.uid = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOneLike(idLike: string) {
    this.likeDoc = this.afs.doc<LikesInterface>(`likes/${idLike}`);
    return this.like = this.likeDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as LikesInterface;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }

  addLike(like: LikesInterface): void {
    this.likesCollection.add(like.likeId);
  }
  updateLike(like: LikesInterface): void {
    const idLike = like.uid;
    this.likeDoc = this.afs.doc<LikesInterface>(`likes/${idLike}`);
    this.likeDoc.update(like);
  }
  deleteLike(idLike: string): void {
    this.likeDoc = this.afs.doc<LikesInterface>(`likes/${idLike}`);
    this.likeDoc.delete();
  }

  public getPosts() {

    const posts = this.afs.collection('likes').snapshotChanges();
    return posts.pipe(
      map(p => {
        const posts = [];
        p.forEach(p => {
          posts.push(p);
        });
        return posts;
      })
    );

  }


  // get post by id
  public async getPost(docId: string) {
    let currentPost: any;
    await new Promise((resolve) => {
      this.afs.collection('likes').doc(docId).valueChanges().pipe(
        take(1),
        map(post => {
          console.log(post);
          currentPost = post;
          return currentPost;
        })

      ).subscribe(() => {
        resolve();
      });
    }).catch(err => {
      console.log(err);
    });
    return currentPost;
  }

  getUID(): string {
    return this.setLikes.uid;
  }
}
