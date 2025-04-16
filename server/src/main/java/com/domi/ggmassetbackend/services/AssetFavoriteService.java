package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.AssetFavorite;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.DomiException;
import com.domi.ggmassetbackend.repositories.AssetFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AssetFavoriteService {
    private final AssetFavoriteRepository assetFavoriteRepository;

    public boolean hasAssetFavorite(User user, Asset asset) {
        return assetFavoriteRepository.countByUserAndAsset(user, asset) > 0;
    }

    public void setAssetFavorite(User user, Asset asset, boolean active) {
        boolean currentActive = hasAssetFavorite(user, asset);

        if (currentActive == active)
            throw new DomiException("FAVORITE0", "이미 설정되어 있습니다.", HttpStatus.BAD_REQUEST);

        AssetFavorite assetFavorite = new AssetFavorite(user, asset);

        if (active)
            assetFavoriteRepository.save(assetFavorite);
        else
            assetFavoriteRepository.delete(assetFavorite);
    }
}
