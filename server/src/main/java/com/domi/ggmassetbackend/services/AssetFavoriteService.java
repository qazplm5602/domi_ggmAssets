package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.repositories.AssetFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AssetFavoriteService {
    private final AssetFavoriteRepository assetFavoriteRepository;

    
}
