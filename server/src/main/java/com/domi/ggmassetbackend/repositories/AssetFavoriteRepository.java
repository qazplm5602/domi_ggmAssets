package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.AssetFavorite;
import com.domi.ggmassetbackend.data.entity.AssetFavoriteId;
import com.domi.ggmassetbackend.data.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetFavoriteRepository extends JpaRepository<AssetFavorite, AssetFavoriteId> {
    byte countByUserAndAsset(User user, Asset asset);

    @Query("SELECT a.asset.id FROM AssetFavorite a WHERE a.user = :user")
    List<Integer> getFavoriteAssetIds(@Param("user") User user);
}
