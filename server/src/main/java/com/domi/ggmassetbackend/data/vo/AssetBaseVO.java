package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
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

    public static AssetBaseVO from(Asset asset) {
        AssetBaseVO result = new AssetBaseVO();

        result.id = asset.getId();
//        result.category = asset.getCategory();
        result.title = asset.getTitle();
        result.publisher = asset.getPublisher();

        return result;
    }

    // 동일한 코드가 있어서 개선 예정...
    public static AssetBaseVO from(Asset asset, CategoryService categoryService) {
        AssetBaseVO result = from(asset);
        result.category = categoryService.getCategoryParents(asset.getCategory())
                .stream()
                .map(CategoryVO::from)
                .collect(Collectors.toList())
                .reversed();

        return result;
    }
}
