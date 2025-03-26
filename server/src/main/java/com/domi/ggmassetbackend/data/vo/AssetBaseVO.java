package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AssetBaseVO {
    protected int id;
    protected List<CategoryVO> category;
    protected String title;
    protected String publisher;
    protected PublishPlatform platform;

    public void assetDataInit(Asset asset, CategoryService categoryService) {
        this.id = asset.getId();
        this.title = asset.getTitle();
        this.publisher = asset.getPublisher();
        this.platform = asset.getPlatform();

        if (categoryService != null && asset.getCategory() != null) {
            this.category = categoryService.getCategoryParents(asset.getCategory())
                    .stream()
                    .map(CategoryVO::from)
                    .collect(Collectors.toList())
                    .reversed();
        }
    }

    public static AssetBaseVO from(Asset asset) {
        return from(asset, null);
    }

    public static AssetBaseVO from(Asset asset, CategoryService categoryService) {
        AssetBaseVO result = new AssetBaseVO();
        result.assetDataInit(asset, null);

        return result;
    }
}
