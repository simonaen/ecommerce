package edu.ktu.ecommerce.exception;

public enum ExceptionIds {
    ExpiredJwtException("ExpiredJwtException"),
    SignatureException("SignatureException");

    public final String id;

    ExceptionIds(String id) {
        this.id = id;
    }

}
