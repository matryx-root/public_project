import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('../app/pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'crear-aviso', loadChildren: () => import('../app/pages/crear-aviso/crear-aviso.module').then(m => m.CrearAvisoPageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
