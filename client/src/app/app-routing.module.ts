import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
	{path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
	{path: 'items', loadChildren: () => import('./components/items-catalog/items-catalog.module').then(m => m.ItemsCatalogModule)}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
