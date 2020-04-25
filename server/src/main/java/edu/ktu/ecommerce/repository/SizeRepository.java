package edu.ktu.ecommerce.repository;

import edu.ktu.ecommerce.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findByValueAndSizeCategory(String value, String sizeCategory);
}
