package edu.ktu.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ktu.ecommerce.entity.ItemCategory;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
}
