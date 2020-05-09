import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsCatalogComponent} from "./items-catalog.component";
import {RouterModule, Routes} from "@angular/router";
import {ItemsCatalogService} from "../../core/services/items-catalog.service";
import {ItemModule} from "../item/item.module";

const routes: Routes = [
	{path: '', component: ItemsCatalogComponent}
];

@NgModule({
	declarations: [ItemsCatalogComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ItemModule
	],
	providers: [
		ItemsCatalogService
	]
})
export class ItemsCatalogModule {
}
