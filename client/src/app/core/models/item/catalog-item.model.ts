import {ItemImage} from "./item-image.model";

export interface CatalogItem {
	id: number;
	name: string;
	price: number;
	discountedPrice: number;
	coverImage: ItemImage;
}
