package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

@Getter
public class AssetAllVO extends AssetDetailVO {
    public static AssetAllVO from(Asset asset, CategoryService categoryService) {
        AssetAllVO result = new AssetAllVO();
        result.assetDataInit(asset, categoryService);

        return result;
    }

    public static AssetAllVO from(Asset asset) {
        return from(asset, null);
    }
}
