package edu.ktu.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.ktu.ecommerce.entity.ItemCategory;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
    @Query("select u from ItemCategory u where u.gender = :gender and u.mainCategory = :mainCategory and u.subCategory = :subCategory")
	List<ItemCategory> findByAllAttributes(
        @Param("gender") String gender,
        @Param("mainCategory") String mainCategory,
        @Param("subCategory") String subCategory);
}