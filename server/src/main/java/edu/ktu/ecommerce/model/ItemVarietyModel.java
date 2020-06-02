package edu.ktu.ecommerce.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemVarietyModel {
    private Long id;

    private Integer quantity;

    private String ean;

    private String size;
}
