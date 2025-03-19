package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import com.domi.ggmassetbackend.exceptions.DomiException;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class ThumbnailPageVO {
    private List<ThumbnailVO> images;
    private int size;

    // page 0부터 시작해야함
    public static ThumbnailPageVO from(Asset asset, byte page) {
        int amount = 4; // 나중에 따로 config로 뺌
        ThumbnailPageVO result = new ThumbnailPageVO();

        int startIdx = amount * page;
        int endIdx = startIdx + amount;
        List<Thumbnail> images = asset.getImages()
                .stream()
                .filter(v -> v.getType() == ThumbnailType.Image)
                .toList();

        if (startIdx >= images.size()) {
            throw new DomiException("THUMBNAIL0", "미리보기 이미지 페이지가 너무 큽니다.", HttpStatus.BAD_REQUEST);
        }

        List<ThumbnailVO> thumbnails = images
                .subList(startIdx, Math.min(images.size(), endIdx))
                .stream()
                .map(ThumbnailVO::from)
                .toList();

        result.images = thumbnails;
        result.size = Math.ceilDiv(images.size(), amount);

        return result;
    }
}
