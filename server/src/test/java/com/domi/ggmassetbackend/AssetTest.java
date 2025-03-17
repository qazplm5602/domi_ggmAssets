package com.domi.ggmassetbackend;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Compatibility;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import com.domi.ggmassetbackend.repositories.AssetRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AssetTest {
    @Autowired
    AssetRepository assetRepository;

    @Test
    @DisplayName("에셋 추가")
    void addAsset() {
        // 이미지 등록
        Thumbnail thumbnail = Thumbnail
                .builder()
                .type(ThumbnailType.Image)
                .contentUrl("domi_content.jpg")
                .previewUrl("domi_preview.jpg")
                .build();

        Thumbnail thumbnail222 = Thumbnail
                .builder()
                .type(ThumbnailType.Image)
                .contentUrl("domi_content222.jpg")
                .previewUrl("domi_content222.jpg")
                .build();

        // 호환성
        Compatibility compatibility_unity6 = Compatibility
                .builder()
                .version("6000.0.24f")
                .urp(true)
                .hdrp(false)
                .builtIn(false)
                .build();

        // 에셋 ㅁㄴㅇㄹ
        Asset newAsset = Asset.builder()
            .title("도미 에셋 ㅁㄴㅇㄹ")
            .category("3D")
            .description("이것은 도미 에셋 설명 임니다. ㅁㄴㅇㄹ")
            .publisher("도미임")
            .uniqueId("DOMI_ID")
            .images(List.of(thumbnail, thumbnail222))
            .supports(List.of(compatibility_unity6))
            .build();

        assetRepository.save(newAsset);
    }
}
