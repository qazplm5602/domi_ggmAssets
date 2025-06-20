package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.assemblers.AssetAssembler;
import com.domi.ggmassetbackend.data.dto.AssetAutoFieldDTO;
import com.domi.ggmassetbackend.data.dto.AssetEditFormDTO;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/api/asset")
@RestController
public class AssetController {
    private final AssetService assetService;
    private final CategoryService categoryService;
    private final AssetAssembler assetAssembler;

    @GetMapping("/{id}/detail")
    AssetDetailVO getAssetById(@PathVariable int id) {
        Asset asset = assetService.getAssetById(id);
        return assetAssembler.toAssetVO(AssetDetailVO::new, asset);
    }

    @GetMapping("/search")
    PageContentVO<AssetPreviewVO> getAssetsBySearch(@ModelAttribute AssetSearchParamDTO option) {
        Page<Asset> pageAssets = assetService.searchAssets(option);

        return new PageContentVO<>(pageAssets.map(v -> assetAssembler.toAssetVO(AssetPreviewVO::new, v)).toList(), pageAssets.getTotalPages());
    }

    @GetMapping("/search/preview")
    List<AssetSearchVO> getSearchAssetsByPreview(@RequestParam("v") String value) {
        return assetService.wordsSearchAssets(value)
                .stream()
                .map(v -> AssetSearchVO.from(v, categoryService))
                .toList();
    }

    @GetMapping("/{id}/preview")
    ThumbnailPageVO getThumbnailById(@PathVariable int id, @RequestParam byte page) {
        Asset asset = assetService.getAssetById(id);
        return ThumbnailPageVO.from(asset, page);
    }

    @PostMapping("/download/bulk")
    List<String> getDownloadUrls(@RequestBody List<Integer> ids) {
        return assetService.getDownloadUrlsByIds(ids);
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

    @PostMapping("/admin/upload")
    int createAsset(@RequestBody @Valid AssetUploadFormDTO form) throws InterruptedException {
        return assetService.createAssetWithCrawling(form).getId();
    }

    @GetMapping("/admin/{id}/detail")
    AssetAllVO getAssetAdminDetailById(@PathVariable int id) {
        Asset asset = assetService.getAssetById(id);
        return assetAssembler.toAssetVO(AssetAllVO::new, asset);
    }

    @PostMapping("/admin/edit")
    List<String> editAsset(@RequestBody @Valid AssetEditFormDTO form) {
        List<String> attachmentIds = new ArrayList<>();
        assetService.updateAsset(form, attachmentIds);

        return attachmentIds;
    }

    @PostMapping("/admin/thumbnail")
    void uploadThumbnail(@RequestParam("id") UUID handleId, @RequestParam("file") MultipartFile file) throws IOException {
        assetService.uploadThumbnail(handleId, file);
    }

    @DeleteMapping("/admin/{id}")
    void deleteAsset(@PathVariable int id) {
        assetService.deleteAsset(id);
    }

    @PostMapping("/admin/autofield")
    void setAutoFieldAsset(@RequestParam("id") int id, @RequestBody @Valid AssetAutoFieldDTO form) throws InterruptedException {
        Asset targetAsset = assetService.getAssetById(id);
        assetService.updateAutoField(targetAsset, form);
    }
}
