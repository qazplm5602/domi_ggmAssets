package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

import java.util.stream.Collectors;

@Getter
public class AssetPreviewVO extends AssetBaseVO {
    ThumbnailPageVO thumbnail;

    @Override
    public void assetDataInit(Asset asset, CategoryService categoryService) {
        super.assetDataInit(asset, categoryService);
        this.thumbnail = ThumbnailPageVO.from(asset, (byte) 0);
    }

    public static AssetPreviewVO from(Asset asset) {
        return from(asset, null);
    }

    public static AssetPreviewVO from(Asset asset, CategoryService categoryService) {
        AssetPreviewVO result = new AssetPreviewVO();
        result.assetDataInit(asset, categoryService);

        return result;
    }
}
