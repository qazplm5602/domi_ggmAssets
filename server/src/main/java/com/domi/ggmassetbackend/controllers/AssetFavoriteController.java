package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.services.AssetFavoriteService;
import com.domi.ggmassetbackend.services.AssetService;
import com.domi.ggmassetbackend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PostMapping("/{id}")
    void toggleFavorite(@PathVariable int id, @RequestBody boolean active) {
        User user = userService.getCurrentUser();
        Asset asset = assetService.getAssetById(id);

        assetFavoriteService.setAssetFavorite(user, asset, active);
    }

    @Transactional
    @DeleteMapping("/bulk")
    int bulkRemove(@RequestBody List<Integer> ids) {
        User user = userService.getCurrentUser();
        return assetFavoriteService.deleteBulk(user, ids);
    }
}
