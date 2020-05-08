package edu.ktu.ecommerce.service;

import edu.ktu.ecommerce.entity.AppUser;
import edu.ktu.ecommerce.exception.UserExistException;
import edu.ktu.ecommerce.model.auth.LoginRequest;
import edu.ktu.ecommerce.model.auth.RegisterRequest;
import org.springframework.security.core.AuthenticationException;

public interface UserService {
    String login(LoginRequest loginRequest) throws AuthenticationException;

    AppUser register(RegisterRequest registerRequest) throws UserExistException;
}
