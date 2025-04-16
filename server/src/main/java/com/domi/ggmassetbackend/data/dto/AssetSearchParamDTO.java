package com.domi.ggmassetbackend.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AssetSearchParamDTO {
    Integer amount;
    String category;
    Integer order;
    Integer page;
    Boolean random;
    Boolean favorite;
}
