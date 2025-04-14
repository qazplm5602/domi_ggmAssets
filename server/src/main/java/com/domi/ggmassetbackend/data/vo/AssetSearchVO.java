package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

import java.util.List;

@Getter
public class AssetSearchVO {
    protected int id;
    protected String title;
    protected String thumbnail;
    protected List<String> category;

    protected void dataInit(Asset asset, CategoryService categoryService) {
//        ...
    }

    public static AssetSearchVO from(Asset asset, CategoryService categoryService) {
        AssetSearchVO result = new AssetSearchVO();
        result.dataInit(asset, categoryService);

        return result;
    }

    public static AssetSearchVO from(Asset asset) {
        return from(asset, null);
    }
}