import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'app'},
  {
    path: 'app', component: LayoutComponent, children: [
      {path: '', pathMatch: 'full', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {path: 'items', loadChildren: () => import('./components/items-catalog/items-catalog.module').then(m => m.ItemsCatalogModule)}
    ]
  },
  {
    path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'login', redirectTo: 'auth'
  },
  {
    path: 'register', redirectTo: 'auth'
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
