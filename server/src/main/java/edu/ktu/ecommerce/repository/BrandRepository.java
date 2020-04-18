package edu.ktu.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ktu.ecommerce.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    Optional<Brand> findFirstByName(String name);
}