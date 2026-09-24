package com.domi.ggmassetbackend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DomiException extends RuntimeException {
  final String code;
  final String message;
  final HttpStatus status;

  public DomiException(String _code, String _message, HttpStatus _status) {
    this(_code, _message, _status, null);
  }

  public DomiException(String _code, String _message, HttpStatus _status, Throwable _cause) {
    super(_cause);

    code = _code;
    message = _message;
    status = _status;
  }
}