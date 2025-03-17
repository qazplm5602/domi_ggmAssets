package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.exceptions.AssetException;
import com.domi.ggmassetbackend.repositories.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public Asset getAssetById(int id) {
        return assetRepository.findById(id).orElseThrow(() -> new AssetException(AssetException.Type.NOT_FOUND));
    }
}
