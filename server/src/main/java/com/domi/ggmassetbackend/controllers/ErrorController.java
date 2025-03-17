package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.vo.ErrorVO;
import com.domi.ggmassetbackend.exceptions.DomiException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorController {
    @ExceptionHandler
    ResponseEntity<ErrorVO> handleException(DomiException e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(ErrorVO.from(e));
    }
}
