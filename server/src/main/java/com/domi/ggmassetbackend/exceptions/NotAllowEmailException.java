package com.domi.ggmassetbackend.exceptions;

import org.springframework.security.core.AuthenticationException;

public class NotAllowEmailException extends AuthenticationException {
    public NotAllowEmailException(String message) {
        super(message);
    }
}
