import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClipboardModule } from 'ngx-clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';

import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/pages/page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatButtonModule} from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CelularesTabletsComponent } from './components/pages/celulares_tablets/celulares-tablets.component';
import { LiteraturaComponent } from './components/pages/literatura/literatura.component';

import { ServicosComponent } from './components/pages/servicos/servicos.component';

import { ModaComponent } from './components/pages/moda/moda.component';
import { FooterComponent } from './components/footer/footer.component';
import { VeiculosComponent } from './components/pages/veiculos/veiculos.component';
import { SlideComponent } from './components/slide/slide.component';
import { NovaLinhaComponent } from './components/nova-linha/nova-linha.component';
import { TecnologiaComponent } from './components/pages/tecnologia/tecnologia.component';
import { CasasComponent } from './components/pages/casas/casas.component';
import { MobiliarioComponent } from './components/pages/mobiliario/mobiliario.component';
import { OutrasVendasComponent } from './components/pages/outras-vendas/outras-vendas.component';
import { ButtonComponent } from './components/button/button.component';
import { ResetpasswordComponent } from './components/users/resetpassword/resetpassword.component';
import { ArgumentComponent } from './components/argument/argument.component';
import { ToastrModule } from 'ngx-toastr';
import { SpinerComponent } from './components/spiner/spiner.component';
import { ProfiledataComponent } from './components/users/userdata/profiledata/profiledata.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './components/search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IconComponent } from './components/icon/icon.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { CarousselComponent } from './components/caroussel/caroussel.component';
import { PatrocinadosComponent } from './components/patrocinados/patrocinados.component';
import { EditprofileComponent } from './components/users/editprofile/editprofile.component';
import { UploadComponent } from './components/upload/upload.component';
import { PreferenceUserComponent } from './components/users/preference-user/preference-user.component';
import { SidenavComponent } from './components/nav/sidenav/sidenav.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SidernavProfileComponent } from './components/nav/sidernav-profile/sidernav-profile.component';
import { SmallDevicesComponent } from './components/nav/small-devices/small-devices.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { CategoryComponent } from './components/category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    ListBooksComponent,
    DetailsBookComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    TimelineComponent,
    CelularesTabletsComponent,
    LiteraturaComponent,
    ServicosComponent,
    ModaComponent,
    FooterComponent,
    VeiculosComponent,
    SlideComponent,
    NovaLinhaComponent,
    TecnologiaComponent,
    CasasComponent,
    MobiliarioComponent,
    OutrasVendasComponent,
    ButtonComponent,
    ResetpasswordComponent,
    ArgumentComponent,
    SpinerComponent,
    ProfiledataComponent,
    LightboxComponent,
    DetalhesComponent,
    FilterPipe,
    SearchComponent,
    IconComponent,
    SidebarComponent,
    CarousselComponent,
    PatrocinadosComponent,
    EditprofileComponent,
    UploadComponent,
    PreferenceUserComponent,
    SidenavComponent,
    NotificationsComponent,
    SidernavProfileComponent,
    SmallDevicesComponent,
    PromptComponent,
    CategoryComponent
  ],
  imports: [

    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    InfiniteScrollModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ClipboardModule,
    InfiniteScrollModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    OrderModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    {
      provide: StorageBucket,
      useValue: 'gs://naminhaloja.appspot.com'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
