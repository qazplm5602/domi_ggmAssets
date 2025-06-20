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
    private Long fileSize;
    private String storeVersion;
    private String fileVersion;

    @Override
    public void assetDataInit(Asset asset) {
        super.assetDataInit(asset);

        this.shortDesc = asset.getShortDesc();
        this.description = asset.getDescription();
        this.publishAt = asset.getPublishAt();
        this.downloadUrl = asset.getDownloadUrl();
        this.fileSize = asset.getFileSize();
        this.storeVersion = asset.getStoreVersion();
        this.fileVersion = asset.getFileVersion();

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
}
