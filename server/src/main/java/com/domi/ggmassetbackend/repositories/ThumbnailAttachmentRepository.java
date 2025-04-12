package com.domi.ggmassetbackend.repositories;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.entity.ThumbnailAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface ThumbnailAttachmentRepository extends JpaRepository<ThumbnailAttachment, String> {
    @Modifying
    void deleteByThumbnail(Thumbnail thumbnail);
}
