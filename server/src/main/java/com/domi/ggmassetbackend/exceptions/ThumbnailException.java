package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class ThumbnailException extends DomiException {
    public enum Type {
        NOT_FOUND(0, "썸네일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
        NOT_FOUND_ATTACHMENT(1, "찾을 수 없는 핸들 id 입니다.", HttpStatus.NOT_FOUND),
        DOWNLOAD_TIMEOUT(2, "썸네일 다운로드 시간이 초과되었습니다.", HttpStatus.INTERNAL_SERVER_ERROR),;

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

    public ThumbnailException(Type type, Throwable cause) {
        super("THUMBNAIL"+type.code, type.message, type.status, cause);
    }
}
