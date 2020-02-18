import { ViewsInterface } from './../models/views';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  constructor(private afs: AngularFirestore) { }
  private viewsCollection: AngularFirestoreCollection<ViewsInterface>;
  private views: Observable<ViewsInterface[]>;
  private viewDoc: AngularFirestoreDocument<ViewsInterface>;
  private view: Observable<ViewsInterface>;
  public selectedLike: ViewsInterface = {
    uid: null
  };


  getAllViews() {
    this.viewsCollection = this.afs.collection<ViewsInterface>('views');
    return this.views = this.viewsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ViewsInterface;
          data.uid= action.payload.doc.id;
          return data;
        });
      }));
  }


  getOneView(idView: string) {
    this.viewDoc = this.afs.doc<ViewsInterface>(`views/${idView}`);
    return this.view = this.viewDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ViewsInterface;
        data.uid = action.payload.id;
        return data;
      }
    }));
  }

  addView(view: ViewsInterface): void {
    this.viewsCollection.add(view);
  }
  updateView(view: ViewsInterface): void {
    const idView = view.uid;
    this.viewDoc = this.afs.doc<ViewsInterface>(`views/${idView}`);
    this.viewDoc.update(view);
  }
  deleteView(idView: string): void {
    this.viewDoc = this.afs.doc<ViewsInterface>(`views/${idView}`);
    this.viewDoc.delete();
  }

}
