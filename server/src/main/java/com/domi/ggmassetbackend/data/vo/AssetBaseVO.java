package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AssetBaseVO {
    protected int id;

    @Setter
    protected List<CategoryVO> category;

    protected String title;
    protected String publisher;
    protected PublishPlatform platform;

    public void assetDataInit(Asset asset) {
        this.id = asset.getId();
        this.title = asset.getTitle();
        this.publisher = asset.getPublisher();
        this.platform = asset.getPlatform();
    }
}
