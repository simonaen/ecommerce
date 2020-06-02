import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'app'},
	{
		path: 'app', component: LayoutComponent, children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
			},
			{
				path: 'items',
				loadChildren: () => import('./components/items-catalog/items-catalog.module').then(m => m.ItemsCatalogModule)
			},
			{
				path: 'product',
				loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
			}
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
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: "enabled",
		preloadingStrategy: PreloadAllModules
	})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
