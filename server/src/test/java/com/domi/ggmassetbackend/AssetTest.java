package com.domi.ggmassetbackend;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.data.entity.Compatibility;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import com.domi.ggmassetbackend.repositories.AssetRepository;
import com.domi.ggmassetbackend.repositories.CategoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class AssetTest {
    @Autowired
    AssetRepository assetRepository;

    @Autowired
    CategoryRepository categoryRepository;

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
                .previewUrl("domi_preview222.jpg")
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
//            .category("3D")
            .description("이것은 도미 에셋 설명 임니다. ㅁㄴㅇㄹ")
            .publisher("도미임")
            .uniqueId("DOMI_ID")
            .images(List.of(thumbnail, thumbnail222))
            .supports(List.of(compatibility_unity6))
            .build();

        assetRepository.save(newAsset);
    }

    @Test
    @DisplayName("카테고리 설정")
    void categoryAdd() {
        Category category2D = Category.builder()
                .displayName("2D")
                .build();

        Category categoryPixel = Category.builder()
                .displayName("도트")
                .parent(category2D)
                .build();

        categoryRepository.save(category2D);
        categoryRepository.save(categoryPixel);
    }

    @Test
    @DisplayName("에셋 카테고리 지정")
    void setAssetCategory() {
        Optional<Category> category = categoryRepository.findById(1);

        assertTrue(category.isPresent());

        Optional<Asset> asset = assetRepository.findById(1);
        assertTrue(asset.isPresent());

        Asset realAsset = asset.get();
        realAsset.setCategory(category.get());
        assetRepository.save(realAsset);
    }
}
