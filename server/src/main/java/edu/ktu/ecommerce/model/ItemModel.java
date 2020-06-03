package edu.ktu.ecommerce.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ItemModel {
    private String name;

    private Double price;

    private Double discountedPrice;

    private String description;

    private String fullDescription;

    private BrandModel brand;

    private ColorModel color;

    private CategoryModel category;

    private List<ItemImageModel> images;

    private List<ItemVarietyModel> itemVarieties;
}
