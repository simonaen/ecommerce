package edu.ktu.ecommerce.exception;

public class UserExistException extends Exception {
    public UserExistException(String message) {
        super(message);
    }
}
