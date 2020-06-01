import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";

const authModuleRoutes: Routes = [
  {path: '', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatInputModule,
		RouterModule.forChild(authModuleRoutes),
		// EffectsModule.forFeature([AuthEffects]),
		StoreModule,
		MatButtonModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatIconModule
	]
})
export class AuthModule {
}
