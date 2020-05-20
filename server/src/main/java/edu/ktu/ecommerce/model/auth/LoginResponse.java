package edu.ktu.ecommerce.model.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")

public class LoginResponse {
    private String jwt;
    private String refreshToken;
}
