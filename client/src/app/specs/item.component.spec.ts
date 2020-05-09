import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemComponent} from '../components/item/item.component';
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

describe('ItemComponent', () => {
	let component: ItemComponent;
	let fixture: ComponentFixture<ItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ItemComponent],
			imports: [
				MatCardModule,
				FontAwesomeModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
