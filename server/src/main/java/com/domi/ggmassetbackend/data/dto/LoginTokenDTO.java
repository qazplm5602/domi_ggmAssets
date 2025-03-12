package com.domi.ggmassetbackend.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginTokenDTO {
    private String access;
    private String refresh;
}
