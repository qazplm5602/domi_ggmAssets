package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.entity.ThumbnailAttachment;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ThumbnailAttachmentRepository extends JpaRepository<ThumbnailAttachment, UUID> {
    @Modifying
    void deleteByThumbnailIn(List<Thumbnail> thumbnail);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT t FROM ThumbnailAttachment t WHERE t.id = :id")
    Optional<ThumbnailAttachment> findByIdWithLock(@Param("id") UUID id);
}
