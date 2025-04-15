package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AssetDetailVO extends AssetBaseVO {
    private String shortDesc;
    private String description;
    private String downloadUrl;
    private LocalDateTime publishAt;
    private List<CompatibilityVO> supports;
    private List<ThumbnailVO> images;

    @Override
    public void assetDataInit(Asset asset, CategoryService categoryService) {
        super.assetDataInit(asset, categoryService);

        this.shortDesc = asset.getShortDesc();
        this.description = asset.getDescription();
        this.publishAt = asset.getPublishAt();
        this.downloadUrl = asset.getDownloadUrl();

        this.supports = asset.getSupports()
                .stream()
                .map(CompatibilityVO::from)
                .toList();

        this.images = asset.getImages()
                .stream()
                .sorted((a, b) -> Integer.compare(a.getSort(), b.getSort()))
                .map(ThumbnailVO::from)
                .toList();
    }

    public static AssetDetailVO from(Asset asset) {
        return from(asset, null);
    }

    public static AssetDetailVO from(Asset asset, CategoryService categoryService) {
        AssetDetailVO result = new AssetDetailVO();
        result.assetDataInit(asset, categoryService);
        return result;
    }
}
