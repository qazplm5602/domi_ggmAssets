package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class FileException extends DomiException {
    public enum Type {
        NOT_FOUND_FILE(0, "파일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
        ERROR_FILE_DELETE(1, "파일 삭제에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
        WRONG_CATEGORY(2, "잘못된 카테고리 입니다.", HttpStatus.BAD_REQUEST);

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public FileException(Type type) {
        super("FILE"+type.code, type.message, type.status);
    }
}
