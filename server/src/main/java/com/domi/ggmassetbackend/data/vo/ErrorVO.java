package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.exceptions.DomiException;
import lombok.Getter;

@Getter
public class ErrorVO {
    private String code;
    private String message;

    public static ErrorVO from(DomiException e) {
        ErrorVO result = new ErrorVO();
        result.code = e.getCode();
        result.message = e.getMessage();

        return result;
    }
}
