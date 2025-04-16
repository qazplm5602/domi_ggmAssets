package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.AssetFavorite;
import com.domi.ggmassetbackend.data.entity.AssetFavoriteId;
import com.domi.ggmassetbackend.data.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetFavoriteRepository extends JpaRepository<AssetFavorite, AssetFavoriteId> {
    byte countByUserAndAsset(User user, Asset asset);
}
