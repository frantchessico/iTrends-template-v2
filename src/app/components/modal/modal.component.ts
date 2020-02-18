import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(
   public dataApi: DataApiService,
    private storage: AngularFireStorage,
    private toat: ToastrService
  ) {}
  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;
  @Input() userUid: string;

  createdAt: string = new Date().toLocaleTimeString();
  urlImage: any;
  urlImageVerso1: any[];
  urlImageVerso2: any[];
  urlImageVerso3: any[];
  downloadURL: Observable<string>;
  filepath: any;
  phontUrl: any;

  myFiles: File[] = [];
  ngOnInit() {}

  public handleInput($event: Event) {
    this.urlImage = $event.target['files'];
    console.log(this.urlImage);
  }


  public async onSaveBook(bookForm: NgForm) {
    if (bookForm.value.id == null) {
      bookForm.value.userUid = this.userUid;
      await this.dataApi.addBook(bookForm.value);
      await this.toat.success('O seu anúncio foi salvo com sucesso!.', 'Nabolada');
    } else {
      // Update

      await this.dataApi.updateBook(bookForm.value);
      await this.toat.info('O seu anúncio foi actualizado com sucesso!.', ' Nabolada');
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
