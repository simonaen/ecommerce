import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {ItemImage} from "@core/models/item/item-image.model";
import {environment} from "../../../../environments/environment";

interface Image {
	largeUrl: string;
	thumbUrl: string;
	height: number;
	width: number;
}

@Component({
	selector: 'product-gallery',
	templateUrl: './product-gallery.component.html',
	styleUrls: ['./product-gallery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGalleryComponent implements OnInit, OnChanges {

	@Input() images: ItemImage[];
	mainImage: Image;
	subImages: Image[];

	readonly mainDimensions = {
		width: 400,
		height: 600
	}
	readonly thumbnailDimensions = {
		width: 100,
		height: 100
	}

	constructor() {
	}

	ngOnInit() {
	}

	getImages() {
		return this.images.map((image, index) =>
			({
				largeUrl: `${environment.cdnUrl}${this.mainDimensions.width}x${this.mainDimensions.height}/${image.name}?v=${image.version}`,
				thumbUrl: `${environment.cdnUrl}/${this.thumbnailDimensions.width}x${this.thumbnailDimensions.height}/${image.name}?v=${image.version}`,
				height: this.mainDimensions.height,
				width: this.mainDimensions.width,
				id: index
			})
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.images.previousValue === null && changes.images.currentValue !== null) {
			this.subImages = this.getImages();
			this.mainImage = this.subImages[0];
		}
	}

	setActiveImage(index: number) {
		this.mainImage = this.subImages[index];
	}
}
