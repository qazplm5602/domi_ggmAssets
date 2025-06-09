package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteTagRepository extends JpaRepository<FavoriteTag, String> {
}
