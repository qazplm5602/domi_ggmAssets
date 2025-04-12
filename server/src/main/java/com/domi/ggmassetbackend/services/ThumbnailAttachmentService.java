package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.entity.ThumbnailAttachment;
import com.domi.ggmassetbackend.repositories.ThumbnailAttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ThumbnailAttachmentService {
    private final int EXPIRE_TIME = 60 * 60;
    private final ThumbnailAttachmentRepository thumbnailAttachmentRepository;

    public ThumbnailAttachment add(Thumbnail thumbnail, boolean preview) {
        LocalDateTime now = LocalDateTime.now();
        ThumbnailAttachment result = new ThumbnailAttachment(null, thumbnail, preview, now.plusSeconds(EXPIRE_TIME));

        return thumbnailAttachmentRepository.save(result);
    }

    public void invalidate(Thumbnail thumbnail) {
        thumbnailAttachmentRepository.deleteByThumbnail(thumbnail);
    }
}
