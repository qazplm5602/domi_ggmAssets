package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.services.AssetFavoriteService;
import com.domi.ggmassetbackend.services.AssetService;
import com.domi.ggmassetbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RequestMapping("/api/asset/favorite")
@RestController
public class AssetFavoriteController {
    private final AssetFavoriteService assetFavoriteService;
    private final UserService userService;
    private final AssetService assetService;

    @GetMapping("/{id}")
    boolean hasFavorite(@PathVariable int id) {
        User user = userService.getCurrentUser();
        Asset asset = assetService.getAssetById(id);

        return assetFavoriteService.hasAssetFavorite(user, asset);
    }
}
