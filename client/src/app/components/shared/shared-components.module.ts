import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
	declarations: [BreadcrumbComponent],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule
	],
	exports: [
		BreadcrumbComponent
	]
})
export class SharedComponentsModule {
}
