package com.domi.ggmassetbackend.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AssetSearchParamDTO {
    Integer amount;
    String category;
    String tag;
    Integer order;
    Integer page;
    Boolean random;
    Boolean favorite;
}
