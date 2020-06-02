import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ItemsCatalogService} from "@core/services/items-catalog.service";
import {ProductItem} from "@core/models/item/product-item.model";
import {tap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {BreadcrumbElement} from "@core/models/shared/breadcrumb-element.model";
import {ProductDescriptionModel} from "./product-description/product-description.component";

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
	product: ProductItem;
	productSub: Subscription;

	constructor(private route: ActivatedRoute, private itemService: ItemsCatalogService, private changeDetector: ChangeDetectorRef) {
		this.fetchProduct();
	}

	ngOnInit() {
	}

	fetchProduct() {
		const productId = this.route.snapshot.params.id;
		this.productSub = this.itemService.getItem$(productId).pipe(
			tap(product => this.product = product),
			tap(() => this.changeDetector.detectChanges())
		).subscribe();
	}

	ngOnDestroy(): void {
		this.productSub.unsubscribe();
	}

	getBreadcrumbElements(): BreadcrumbElement[] {
		return Object.values(this.product.category)
			.map(value => <BreadcrumbElement>{
				title: value,
				route: value
			});
	}

	getDetails() {
		return <ProductDescriptionModel>{
			title: this.product.name,
			fullDescription: this.product.fullDescription,
			price: this.product.price,
			discountedPrice: this.product.discountedPrice,
			brand: this.product.brand,
			sizes: this.product.itemVarieties
		};
	}
}
