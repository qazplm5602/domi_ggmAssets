package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.repositories.FavoriteTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FavoriteTagService {
    private final FavoriteTagRepository favoriteTagRepository;
}
