package edu.ktu.ecommerce.exception.auth;

public class UserExistException extends Exception {
    public UserExistException(String message) {
        super(message);
    }
}
