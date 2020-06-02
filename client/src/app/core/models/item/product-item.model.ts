import {ItemCategory} from "@core/models/item/item-category.model";
import {ItemImage} from "@core/models/item/item-image.model";
import {Brand} from "@core/models/item/brand.model";

interface ProductItemColor {
	name: string;
	hex: string;
}

export interface ProductItemVariety {
	id: number;
	quantity: number;
	ean: string;
	size: string;
}

export interface ProductItem {
	name;
	price: number;
	discountedPrice: number;
	description: string;
	fullDescription: string;
	brand: Brand;
	color: ProductItemColor;
	category: ItemCategory;
	images: ItemImage[];
	itemVarieties: ProductItemVariety[];
}

