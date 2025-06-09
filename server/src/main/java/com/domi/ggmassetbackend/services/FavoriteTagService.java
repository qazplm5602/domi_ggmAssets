package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.repositories.FavoriteTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FavoriteTagService {
    private final FavoriteTagRepository favoriteTagRepository;

    public List<FavoriteTag> getFavoriteTagsByOwner(User owner) {
        return favoriteTagRepository.findByOwner(owner);
    }
}
