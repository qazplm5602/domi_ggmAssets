package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.dto.AssetSearchParamDTO;
import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.vo.*;
import com.domi.ggmassetbackend.services.AssetService;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/asset")
@RestController
public class AssetController {
    private final AssetService assetService;
    private final CategoryService categoryService;

    @GetMapping("/{id}/detail")
    AssetDetailVO getAssetById(@PathVariable int id) {
        Asset asset = assetService.getAssetById(id);
        return AssetDetailVO.from(asset, categoryService);
    }

    @GetMapping("/search")
    PageContentVO<AssetPreviewVO> getAssetsBySearch(@ModelAttribute AssetSearchParamDTO option) {
        Page<Asset> pageAssets = assetService.searchAssets(option);

        return new PageContentVO<>(pageAssets.map(v -> AssetPreviewVO.from(v, categoryService)).toList(), pageAssets.getTotalPages());
    }

    @GetMapping("/{id}/preview")
    ThumbnailPageVO getThumbnailById(@PathVariable int id, @RequestParam byte page) {
        Asset asset = assetService.getAssetById(id);
        return ThumbnailPageVO.from(asset, page);
    }
}
