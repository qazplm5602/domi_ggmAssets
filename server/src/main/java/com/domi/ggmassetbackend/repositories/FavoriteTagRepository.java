package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.FavoriteTag;
import com.domi.ggmassetbackend.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteTagRepository extends JpaRepository<FavoriteTag, String> {
    List<FavoriteTag> findByOwner(User owner);
}