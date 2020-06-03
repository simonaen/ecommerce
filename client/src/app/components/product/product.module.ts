import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {RouterModule, Routes} from "@angular/router";
import {ItemsCatalogService} from "@core/services/items-catalog.service";
import {ProductDescriptionComponent} from './product-description/product-description.component';
import {ProductGalleryComponent} from './product-gallery/product-gallery.component';
import {SharedComponentsModule} from "../shared/shared-components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";

const productModuleRoutes: Routes = [
	{path: ':id', component: ProductComponent}
];

@NgModule({
	declarations: [ProductComponent, ProductDescriptionComponent, ProductGalleryComponent],
	imports: [
		CommonModule,
		SharedComponentsModule,
		RouterModule.forChild(productModuleRoutes),
		MatButtonModule,
		MatSelectModule,
		MatIconModule,
	],
	providers: [
		ItemsCatalogService
	]
})
export class ProductModule {
}
