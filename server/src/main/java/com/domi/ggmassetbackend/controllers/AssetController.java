package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.services.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/asset")
@RestController
public class AssetController {
    private final AssetService assetService;

    @GetMapping("/{id}")
    Asset getAssetById(@PathVariable int id) {
        Asset asset = assetService.getAssetById(id);
        return asset;
    }
}
