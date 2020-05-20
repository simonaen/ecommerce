package edu.ktu.ecommerce.exception.auth;

import org.springframework.security.core.AuthenticationException;

public class InvalidRefreshTokenException extends AuthenticationException {

    public InvalidRefreshTokenException() {
        super("Token is invalid");
    }
}
