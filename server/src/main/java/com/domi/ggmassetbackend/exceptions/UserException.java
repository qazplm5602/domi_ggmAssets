package com.domi.ggmassetbackend.exceptions;

import org.springframework.http.HttpStatus;

public class UserException extends DomiException {
    public enum Type {
        NOT_FOUND_USER(0, "유저를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
        NEED_LOGIN(1, "로그인이 필요합니다.", HttpStatus.UNAUTHORIZED),
        WRONG_LOGIN_FIELD(2, "이메일 및 비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
        EXIST_EMAIL(3, "이미 이메일이 사용중 입니다.", HttpStatus.FORBIDDEN),
        NOT_ALLOW_DOMAIN(4, "허용하는 이메일이 아닙니다.", HttpStatus.FORBIDDEN);

        final int code;
        final String message;
        final HttpStatus status;

        Type(int _code, String _message, HttpStatus _status) {
            code = _code;
            message = _message;
            status = _status;
        }
    }

    public UserException(Type type) {
        super("USER"+type.code, type.message, type.status);
    }
}