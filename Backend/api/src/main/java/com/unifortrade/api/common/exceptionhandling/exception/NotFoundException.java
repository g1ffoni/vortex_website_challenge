package com.unifortrade.api.common.exceptionhandling.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends ApiException {

    public NotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

    public static NotFoundException of(String entity, Object id) {
        return new NotFoundException(entity + " not found with id " + id);
    }
}
