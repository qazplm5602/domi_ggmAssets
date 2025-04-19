package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ThumbnailRepository extends JpaRepository<Thumbnail, UUID> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT t FROM Thumbnail t WHERE t.id = :id")
    Optional<Thumbnail> findByIdWithLock(@Param("id") UUID id);

    @Modifying
    @Query("UPDATE Thumbnail t SET t.contentUrl = :url WHERE t.id = :id")
    void updateContentUrl(@Param("id") UUID id, @Param("url") String url);

    @Modifying
    @Query("UPDATE Thumbnail t SET t.previewUrl = :url WHERE t.id = :id")
    void updatePreviewUrl(@Param("id") UUID id, @Param("url") String url);
}
