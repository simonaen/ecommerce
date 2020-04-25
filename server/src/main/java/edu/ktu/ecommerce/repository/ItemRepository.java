package edu.ktu.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ktu.ecommerce.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}