package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import lombok.Getter;

@Getter
public class ThumbnailVO {
    private ThumbnailType type;
    private String contentUrl;
    private String previewUrl;

    public static ThumbnailVO from(Thumbnail thumbnail) {
        ThumbnailVO result = new ThumbnailVO();

        result.type = thumbnail.getType();
        result.contentUrl = thumbnail.getContentUrl();
        result.previewUrl = thumbnail.getPreviewUrl();

        return result;
    }
}
