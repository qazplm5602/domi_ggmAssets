package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import lombok.Getter;

@Getter
public class AssetBaseVO {
    protected String category;
    protected String title;
    protected String publisher;

    public static AssetBaseVO from(Asset asset) {
        AssetBaseVO result = new AssetBaseVO();

//        result.category = asset.getCategory();
        result.title = asset.getTitle();
        result.publisher = asset.getPublisher();

        return result;
    }
}
