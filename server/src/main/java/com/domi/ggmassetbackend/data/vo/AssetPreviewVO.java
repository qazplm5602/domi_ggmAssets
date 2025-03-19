package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import lombok.Getter;

@Getter
public class AssetPreviewVO extends AssetBaseVO {
    ThumbnailPageVO thumbnail;

    public static AssetPreviewVO from(Asset asset) {
        AssetPreviewVO result = new AssetPreviewVO();

//        result.category = asset.getCategory();
        result.title = asset.getTitle();
        result.publisher = asset.getPublisher();
        result.thumbnail = ThumbnailPageVO.from(asset, (byte) 0);

        return result;
    }
}
