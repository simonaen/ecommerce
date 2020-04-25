package edu.ktu.ecommerce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Inventory {
    /*
    Generate value is omitted because it is
    mapped from item variety foreign key
    */
    @Id
    private Long id;

    private Integer quantity;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private ItemVariety itemVariety;
}
