import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ItemComponent} from "./item.component";


@NgModule({
	declarations: [ItemComponent],
	imports: [
		CommonModule,
		MatCardModule,
		FontAwesomeModule
	],
	exports: [ItemComponent]
})
export class ItemModule {
}
