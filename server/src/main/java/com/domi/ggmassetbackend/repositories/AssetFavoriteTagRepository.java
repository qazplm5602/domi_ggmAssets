package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetFavoriteTagRepository extends JpaRepository<AssetFavoriteTag, AssetFavoriteTagId> {
    List<AssetFavoriteTag> findByTagIn(List<FavoriteTag> tags);

    @Query("SELECT a FROM AssetFavoriteTag a WHERE a.favorite.asset = :asset AND a.favorite.user = :user")
    List<AssetFavoriteTag> findByAssetAndUser(@Param("user") User user, @Param("asset") Asset asset);
}
