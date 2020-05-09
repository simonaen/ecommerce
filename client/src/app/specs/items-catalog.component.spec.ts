import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemsCatalogComponent} from '../components/items-catalog/items-catalog.component';
import {ItemModule} from "../components/item/item.module";
import {ItemsCatalogService} from "../core/services/items-catalog.service";
import {CatalogItem} from "../core/models/item/catalog-item.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ItemsCatalogComponent', () => {
	let component: ItemsCatalogComponent;
	let fixture: ComponentFixture<ItemsCatalogComponent>;
	let service: ItemsCatalogService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ItemsCatalogComponent],
			imports: [
				HttpClientTestingModule,
				ItemModule
			],
			providers: [
				ItemsCatalogService
			]
		});
		service = TestBed.get(ItemsCatalogService);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemsCatalogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#getAllItems$() from API', () => {
		const dummyItems: CatalogItem[] = [
			{
				id: 1,
				name: 'Jeans',
				price: 15.99,
				discountedPrice: 13.99,
				coverImage: {
					id: 1,
					name: 'jeans',
					version: '2'
				}
			},
			{
				id: 2,
				name: 'Shirt',
				price: 15.99,
				discountedPrice: 15.99,
				coverImage: {
					id: 1,
					name: 'jeans',
					version: '2'
				}
			}
		];

		service.getAllItems$().subscribe(items => {
			expect(items.length).toBe(2);
			expect(items).toEqual(dummyItems);
		});
	});
});
