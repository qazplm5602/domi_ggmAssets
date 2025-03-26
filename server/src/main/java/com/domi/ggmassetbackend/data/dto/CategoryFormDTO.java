package com.domi.ggmassetbackend.data.dto;

import lombok.Data;

@Data
public class CategoryFormDTO {
    private String name;
    private Integer parentId;
}
