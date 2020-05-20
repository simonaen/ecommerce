package edu.ktu.ecommerce.service;

import edu.ktu.ecommerce.entity.AppUser;
import edu.ktu.ecommerce.exception.auth.UserExistException;
import edu.ktu.ecommerce.model.auth.LoginRequest;
import edu.ktu.ecommerce.model.auth.LoginResponse;
import edu.ktu.ecommerce.model.auth.RefreshToken;
import edu.ktu.ecommerce.model.auth.RegisterRequest;
import org.springframework.security.core.AuthenticationException;

import java.util.Optional;

public interface UserService {
    LoginResponse login(LoginRequest loginRequest) throws AuthenticationException;

    LoginResponse register(RegisterRequest registerRequest) throws UserExistException;

    Optional<RefreshToken> refreshToken(String token);
}
