package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import lombok.Getter;

@Getter
public class FavoriteTagVO {
    private String id;
    private String name;
    private String color;

    public static FavoriteTagVO toEntity(FavoriteTag data) {
        FavoriteTagVO vo = new FavoriteTagVO();
        vo.id = data.getId();
        vo.name = data.getName();
        vo.color = data.getColor();

        return vo;
    }
}
