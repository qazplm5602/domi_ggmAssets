package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AssetDetailVO extends AssetBaseVO {
    private String shortDesc;
    private String description;
    private List<CompatibilityVO> supports;
    private List<ThumbnailVO> images;

    public static AssetDetailVO from(Asset asset) {
        AssetDetailVO result = new AssetDetailVO();

        result.id = asset.getId();
//        result.category = asset.getCategory();
        result.title = asset.getTitle();
        result.publisher = asset.getPublisher();

        result.shortDesc = asset.getShortDesc();
        result.description = asset.getDescription();

        result.supports = asset.getSupports()
                .stream()
                .map(CompatibilityVO::from)
                .toList();

        result.images = asset.getImages()
                .stream()
                .map(ThumbnailVO::from)
                .toList();

        return result;
    }
}
