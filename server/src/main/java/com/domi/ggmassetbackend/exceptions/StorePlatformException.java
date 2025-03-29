package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class StorePlatformException extends DomiException {
    public enum Type {
        API_IO_ERROR(0, "API 요청 오류", HttpStatus.INTERNAL_SERVER_ERROR),
        API_URI_ERROR(1, "API 요청 오류", HttpStatus.INTERNAL_SERVER_ERROR),;

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public StorePlatformException(Type type) {
        super("STORE_PLATFORM"+type.code, type.message, type.status);
    }
}
