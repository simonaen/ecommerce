import {Component, OnInit} from '@angular/core';
import {ItemsCatalogService} from "../../core/services/items-catalog.service";
import {CatalogItem} from "../../core/models/item/catalog-item.model";
import {map} from "rxjs/operators";

@Component({
	selector: 'app-items-catalog',
	templateUrl: './items-catalog.component.html',
	styleUrls: ['./items-catalog.component.scss']
})
export class ItemsCatalogComponent implements OnInit {
	public items: Array<CatalogItem> = [];
	constructor(
		private itemsCatalogService:ItemsCatalogService
	) {
	}

	ngOnInit() {
		this.itemsCatalogService.getAllItems$().pipe(
			map((_items: Array<CatalogItem>) => {
				this.items = _items;
		})
		).subscribe();
	}

}
