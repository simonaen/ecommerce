import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {provideMockStore} from "@ngrx/store/testing";
import {NotificationService} from "../../../core/services/shared/notification.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {MatIconModule} from "@angular/material/icon";

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoginComponent],
			imports: [
				ReactiveFormsModule,
				MatInputModule,
				MatIconModule,
				NoopAnimationsModule,
				RouterTestingModule
			],
			providers: [
				provideMockStore(),
				{provide: NotificationService, useClass: NotificationServiceMock}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

class NotificationServiceMock {
}
