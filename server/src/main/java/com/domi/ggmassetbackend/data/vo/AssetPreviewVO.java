package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

import java.util.stream.Collectors;

@Getter
public class AssetPreviewVO extends AssetBaseVO {
    ThumbnailPageVO thumbnail;

    public static AssetPreviewVO from(Asset asset) {
        AssetPreviewVO result = new AssetPreviewVO();

        result.id = asset.getId();
//        result.category = asset.getCategory();
        result.title = asset.getTitle();
        result.publisher = asset.getPublisher();
        result.thumbnail = ThumbnailPageVO.from(asset, (byte) 0);

        return result;
    }

    // 동일한 코드가 있어서 개선 예정...
    public static AssetPreviewVO from(Asset asset, CategoryService categoryService) {
        AssetPreviewVO result = from(asset);
        Category category = asset.getCategory();

        if (category != null) {
            result.category = categoryService.getCategoryParents(category)
                    .stream()
                    .map(CategoryVO::from)
                    .collect(Collectors.toList())
                    .reversed();
        }

        return result;
    }
}
