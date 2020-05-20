package edu.ktu.ecommerce.repository;

import edu.ktu.ecommerce.entity.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ItemImage, Long> {
}
