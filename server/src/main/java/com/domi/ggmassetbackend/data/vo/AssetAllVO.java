package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

@Getter
public class AssetAllVO extends AssetDetailVO {
    private String platformUrl;

    @Override
    public void assetDataInit(Asset asset, CategoryService categoryService) {
        super.assetDataInit(asset, categoryService);

        this.platformUrl = asset.getPlatformUrl();
    }

    public static AssetAllVO from(Asset asset, CategoryService categoryService) {
        AssetAllVO result = new AssetAllVO();
        result.assetDataInit(asset, categoryService);

        return result;
    }

    public static AssetAllVO from(Asset asset) {
        return from(asset, null);
    }
}
