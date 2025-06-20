package com.domi.ggmassetbackend.data.assemblers;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.vo.AssetBaseVO;
import com.domi.ggmassetbackend.data.vo.CategoryVO;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class AssetAssembler {
    private final CategoryService categoryService;

    public <T extends AssetBaseVO> T toAssetVO(Supplier<T> voFactory, Asset asset) {
        T vo = voFactory.get();
        vo.assetDataInit(asset);

        // 카테고리 넣기 ㅁㄴㅇㄹ
        List<CategoryVO> category = categoryService.getCategoryParents(asset.getCategory())
                .stream()
                .map(CategoryVO::from)
                .collect(Collectors.toList())
                .reversed();
        vo.setCategory(category);

        return vo;
    }
}
