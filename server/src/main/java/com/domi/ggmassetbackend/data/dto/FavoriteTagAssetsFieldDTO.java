package com.domi.ggmassetbackend.data.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class FavoriteTagAssetsFieldDTO {
    private List<Integer> assets;
    private String tag;
}
