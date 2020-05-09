import {Component, Input, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {ItemImage} from "../../core/models/item/item-image.model";

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
	public heart = faHeart;
	public circle = faCircle;

	@Input()
	title: string;

	@Input()
	price: number;

	@Input()
	coverImage: ItemImage;

	@Input()
	discountPrice: number;

	constructor() {
	}

	ngOnInit() {
	}

}
