package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class CategoryException extends DomiException {
    public enum Type {
        NOT_FOUND_USER(0, "카테고리를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),;

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public CategoryException(Type type) {
        super("CATEGORY"+type.code, type.message, type.status);
    }
}
