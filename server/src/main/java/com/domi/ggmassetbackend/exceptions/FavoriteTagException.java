package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class FavoriteTagException extends DomiException {
    public enum Type {
        NOT_FOUND(0, "태그를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
        INVALID_EDIT(1, "잘못된 필드입니다.", HttpStatus.BAD_REQUEST),
        OTHER_USER_TAG(2, "잘못된 접근입니다.", HttpStatus.FORBIDDEN);

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public FavoriteTagException(Type type) {
        super("FAVORITE_TAG"+type.code, type.message, type.status);
    }
}
