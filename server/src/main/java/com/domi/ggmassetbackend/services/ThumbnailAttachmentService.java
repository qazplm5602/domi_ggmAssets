package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.entity.ThumbnailAttachment;
import com.domi.ggmassetbackend.exceptions.ThumbnailException;
import com.domi.ggmassetbackend.repositories.ThumbnailAttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    public void invalidate(List<Thumbnail> thumbnail) {
        thumbnailAttachmentRepository.deleteByThumbnailIn(thumbnail);
    }

    // 한번 쓰면 지워짐
    public ThumbnailAttachment getOnceById(UUID id) {
        ThumbnailAttachment result = thumbnailAttachmentRepository.findById(id).orElseThrow(() -> new ThumbnailException(ThumbnailException.Type.NOT_FOUND_ATTACHMENT));
        thumbnailAttachmentRepository.delete(result);


        return result;
    }
}
