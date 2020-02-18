import { SmallDevicesComponent } from "./components/nav/small-devices/small-devices.component";
import { EditprofileComponent } from './components/users/editprofile/editprofile.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { ResetpasswordComponent } from './components/users/resetpassword/resetpassword.component';
import { NologinGuard } from './guards/nologin.guard';
import { CasasComponent } from './components/pages/casas/casas.component';
import { MobiliarioComponent } from './components/pages/mobiliario/mobiliario.component';
import { TecnologiaComponent } from './components/pages/tecnologia/tecnologia.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { VeiculosComponent } from './components/pages/veiculos/veiculos.component';
import { ModaComponent } from './components/pages/moda/moda.component';
import { LiteraturaComponent } from './components/pages/literatura/literatura.component';
import { CelularesTabletsComponent } from './components/pages/celulares_tablets/celulares-tablets.component';
import { ServicosComponent } from './components/pages/servicos/servicos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { LoginComponent } from 'src/app/components/users/login/login.component';
import { RegisterComponent } from 'src/app/components/users/register/register.component';
import { Page404Component } from './components/pages/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';






const routes: Routes = [
 {path: '', component: NavbarComponent, children: [
  {path: '', component: SmallDevicesComponent,
  children: [
    {path: '', component: HomeComponent},
    { path: 'detalhes/:id', component: DetailsBookComponent},
    {path: 'detalhe/:id', component: DetalhesComponent},
    {path: 'posts', component: ListBooksComponent },
    {path: ':brand', component: ProfileComponent},
    {path: 'editar-profile', component: EditprofileComponent},
    { path: 'carros-&-motos', component: VeiculosComponent},
    { path: 'celulares-tablets', component: CelularesTabletsComponent },
    {path: 'tecnologia', component: TecnologiaComponent},
    { path: 'moda', component: ModaComponent},
    { path: 'literatura', component: LiteraturaComponent},
    { path: 'casas', component: CasasComponent},
    { path: 'mobiliario', component: MobiliarioComponent},
    { path: 'servicos', component: ServicosComponent},
    {path: 'categorias', component: CategoryComponent}

   ], canActivate: [AuthGuard]}
 ]
},


  { path: 'criar-conta', component: RegisterComponent, canActivate: [NologinGuard] },
  { path: 'entrar', component: LoginComponent, canActivate: [NologinGuard] },
  {path: 'redefinir-senha', component:  ResetpasswordComponent},

  { path: '**', component: Page404Component, children: [{ path: '', component: NavbarComponent}] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
