package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class AuthException extends DomiException {
    public enum Type {
        GGM_API_REQ_FAILED(0, "GGM API 호출을 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
        GGM_API_RES_FAILED(1, "GGM API에서 오류가 발생하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
        GGM_API_TOKEN_INVALID(2, "잘못된 토큰이거나 시간이 만료되었습니다.", HttpStatus.FORBIDDEN),
        GGM_API_USER_NOT_VERIFY(3, "인증된 학생/교사가 아닙니다.", HttpStatus.FORBIDDEN),;

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public AuthException(Type type) {
        super("AUTH"+type.code, type.message, type.status);
    }
}
