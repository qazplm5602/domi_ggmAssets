package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.AssetFavorite;
import com.domi.ggmassetbackend.data.entity.AssetFavoriteId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetFavoriteRepository extends JpaRepository<AssetFavorite, AssetFavoriteId> {

}
