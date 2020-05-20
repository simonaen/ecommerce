package edu.ktu.ecommerce.repository;

import edu.ktu.ecommerce.entity.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    Optional<UserRefreshToken> findByToken(String token);
}
