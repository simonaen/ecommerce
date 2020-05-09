import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LayoutModule} from './components/layout/layout.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducer as layoutReducer} from './core/store/reducers/layout.reducer';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LayoutModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({layout: layoutReducer}, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true
			}
		}),
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
