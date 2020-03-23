package edu.ktu.ecommerce.entity;

import javax.persistence.*;

@Entity
public class Item {
    
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;
    private Double price;

    protected Item() {
    }

    public Item(String name, Double price) {
        this.name = name;
        this.price = price;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Double getPrice() {
        return this.price;
    }
}