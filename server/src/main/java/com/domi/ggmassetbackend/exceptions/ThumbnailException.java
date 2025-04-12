package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class ThumbnailException extends DomiException {
    public enum Type {
        NOT_FOUND(0, "썸네일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),;

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public ThumbnailException(Type type) {
        super("THUMBNAIL"+type.code, type.message, type.status);
    }
}
