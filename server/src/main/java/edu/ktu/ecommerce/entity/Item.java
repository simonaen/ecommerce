package edu.ktu.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Double discountedPrice;
    private String description;

    @Column(columnDefinition="VARCHAR(5000)")
    private String fullDescription;

    @ManyToOne
    private Brand brand;

    @ManyToOne
    private Color color;

    @ManyToOne
    private ItemCategory category;

    @OneToMany(mappedBy = "item")
    private List<ItemImage> images;

    @OneToMany(mappedBy = "item")
    @JsonManagedReference
    private List<ItemVariety> itemVarieties;
}
