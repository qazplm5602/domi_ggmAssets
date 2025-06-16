package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.AssetFavoriteTag;
import com.domi.ggmassetbackend.data.entity.AssetFavoriteTagId;
import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetFavoriteTagRepository extends JpaRepository<AssetFavoriteTag, AssetFavoriteTagId> {
    List<AssetFavoriteTag> findByTagIn(List<FavoriteTag> tags);
}
