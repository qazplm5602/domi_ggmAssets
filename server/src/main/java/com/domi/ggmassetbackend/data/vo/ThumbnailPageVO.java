package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import lombok.Getter;

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
        int endIdx = startIdx + page;

        List<ThumbnailVO> thumbnails = asset.getImages()
                .subList(startIdx, endIdx)
                .stream()
                .map(ThumbnailVO::from)
                .toList();

        result.images = thumbnails;
        result.size = Math.ceilDiv(asset.getImages().size(), amount);

        return result;
    }
}
