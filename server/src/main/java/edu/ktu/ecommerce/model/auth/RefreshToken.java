package edu.ktu.ecommerce.model.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshToken {
    private final String jwt;
}
