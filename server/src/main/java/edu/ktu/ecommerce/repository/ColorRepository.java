package edu.ktu.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.ktu.ecommerce.entity.Color;

public interface ColorRepository extends JpaRepository<Color, Long> {

	Optional<Color> findFirstByName(String name);

}
