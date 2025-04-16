package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.repositories.AssetFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AssetFavoriteService {
    private final AssetFavoriteRepository assetFavoriteRepository;

    public boolean hasAssetFavorite(User user, Asset asset) {
        return assetFavoriteRepository.countByUserAndAsset(user, asset) > 0;
    }
}
