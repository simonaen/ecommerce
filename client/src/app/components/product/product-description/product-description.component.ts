import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Brand} from "@core/models/item/brand.model";
import {ProductItemVariety} from "@core/models/item/product-item.model";

export interface ProductDescriptionModel {
	title: string;
	fullDescription: string;
	price: number;
	discountedPrice: number;
	brand: Brand;
	sizes: ProductItemVariety[]
}

@Component({
	selector: 'product-description',
	templateUrl: './product-description.component.html',
	styleUrls: ['./product-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDescriptionComponent implements OnInit {
	@Input() details: ProductDescriptionModel;

	constructor() {
	}

	ngOnInit() {
	}
}
