package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ThumbnailRepository extends JpaRepository<Thumbnail, UUID> {
}
