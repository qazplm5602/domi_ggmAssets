package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.dto.AssetSearchParamDTO;
import com.domi.ggmassetbackend.data.dto.AssetUploadFormDTO;
import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.data.vo.*;
import com.domi.ggmassetbackend.services.AssetService;
import com.domi.ggmassetbackend.services.CategoryService;
import com.domi.ggmassetbackend.services.StorePlatformService;
import com.domi.ggmassetbackend.services.ThumbnailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

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

//    @GetMapping("/test")
//    Asset domiTest() throws InterruptedException {
//        Asset asset = storePlatformService.fetchAssetFromStore(PublishPlatform.Unity, "https://assetstore.unity.com/packages/3d/environments/urban/hq-residential-house-48976");
//        List<Thumbnail> savedImages = thumbnailService.imageSave(asset.getImages());
//
//        asset.setImages(savedImages);
//
////        return asset;
//        return assetService.saveAsset(asset);
//    }

    @PostMapping("/upload")
    int createAsset(@ModelAttribute @Valid AssetUploadFormDTO form) throws InterruptedException {
        return assetService.createAssetWithCrawling(form).getId();
    }
}
