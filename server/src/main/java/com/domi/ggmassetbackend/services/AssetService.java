package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.dto.AssetEditFormDTO;
import com.domi.ggmassetbackend.data.dto.AssetSearchParamDTO;
import com.domi.ggmassetbackend.data.dto.AssetUploadFormDTO;
import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Category;
import com.domi.ggmassetbackend.data.entity.Compatibility;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.data.vo.CompatibilityVO;
import com.domi.ggmassetbackend.exceptions.AssetException;
import com.domi.ggmassetbackend.repositories.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@RequiredArgsConstructor
@Service
public class AssetService {
    private final AssetRepository assetRepository;
    private final CategoryService categoryService;
    private final StorePlatformService storePlatformService;
    private final ThumbnailService thumbnailService;

    public Asset getAssetById(int id) {
        return assetRepository.findById(id).orElseThrow(() -> new AssetException(AssetException.Type.NOT_FOUND));
    }

    public Page<Asset> searchAssets(AssetSearchParamDTO option) {
        int amount = 16;
        int page = 0;

        if (option.getAmount() != null) {
            amount = option.getAmount();
        }

        if (option.getPage() != null) {
            page = option.getPage();
        }

        // 검색 조건
        Specification<Asset> specification = Specification.allOf();
        if (option.getCategory() != null && !option.getCategory().isEmpty()) {
            specification = specification.and(categoryService.hasCategory(option.getCategory()));
        }

        Sort sortOption = Sort.by(Sort.Direction.ASC, "title");
        boolean isRandom = option.getRandom() != null && option.getRandom();

        if (option.getOrder() != null && !isRandom) {
            switch (option.getOrder()) {
                case 1 -> sortOption = Sort.by(Sort.Direction.ASC, "publishAt");
            }
        } else if (isRandom) {
//            sortOption = Sort.by(Sort.Order.asc("RAND()"));
            // 랜덤 어케 할지 생각중...
        }

        Pageable pageable = PageRequest.of(page, amount, sortOption);
        return assetRepository.findAll(specification, pageable);
    }

    public int getCategoryCount(List<Integer> ids) {
        return assetRepository.countByCategoryIdIn(ids);
    }

    // 이 태그에 해당하는건 다 해제 시킴
    public void setCategoryCancel(List<Integer> ids) {
        assetRepository.updateCategoryCancel(ids);
    }

    // 이거 나중에 지울 예정 (비지니스 코드맨~~)
//    public Asset saveAsset(Asset asset) {
//        return assetRepository.save(asset);
//    }

    public Asset createAssetWithCrawling(AssetUploadFormDTO form) throws InterruptedException {
        Asset newAsset;

        // 크롤링 ㄱㄱ
        if (form.getPlatform() != null) {
            newAsset = storePlatformService.fetchAssetFromStore(form.getPlatform(), form.getStore());

            // 썸네일 불러오깅
            List<Thumbnail> savedImages = thumbnailService.imageSave(newAsset.getImages());
            newAsset.setImages(savedImages);
        } else {
            newAsset = new Asset();
            newAsset.setTitle("domi untitled.");
            newAsset.setCreateAt(LocalDateTime.now());
        }

        newAsset.setDownloadUrl(form.getDownload());
        return assetRepository.save(newAsset);
    }

//    @Transactional
    public Asset updateAsset(AssetEditFormDTO form) {
        Asset asset = getAssetById(form.getId());

        if (form.getTitle() != null) {
            asset.setTitle(form.getTitle());
        }

        String shortDesc = form.getShortDesc();
        if (shortDesc != null) {
            asset.setShortDesc(shortDesc.isEmpty() ? null : shortDesc);
        }

        String description = form.getDescription();
        if (description != null) {
            asset.setDescription(description.isEmpty() ? null : description);
        }

        String downloadUrl = form.getDownloadUrl();
        if (downloadUrl != null) {
            asset.setDownloadUrl(downloadUrl);
        }

        String platformUrl = form.getPlatformUrl();
        if (platformUrl != null) {
            asset.setPlatformUrl(platformUrl.isEmpty() ? null : platformUrl);
        }

        String platform = form.getPlatform();
        if (platform != null) {
            PublishPlatform platformEnum = null;
            if (!platform.isEmpty())
                platformEnum = PublishPlatform.valueOf(platform);

            asset.setPlatform(platformEnum);
        }

        String publisher = form.getPublisher();
        if (publisher != null) {
            asset.setPublisher(publisher.isEmpty() ? null : publisher);
        }

        String publishAt = form.getPublishAt();
        if (publishAt != null) {
            LocalDateTime time = null;

            if (!publishAt.isEmpty()) {
                DateTimeFormatter DATEFORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate ld = LocalDate.parse(publishAt, DATEFORMATTER);
                time = LocalDateTime.of(ld, LocalDateTime.now().toLocalTime());
            }

            asset.setPublishAt(time);
        }

        List<CompatibilityVO> supports = form.getSupports();
        if (supports != null) {
            List<Compatibility> compatibilityList = asset.getSupports();
            if (compatibilityList == null) {
                compatibilityList = new ArrayList<>();
                asset.setSupports(compatibilityList);
            }

            compatibilityList.clear();

            for (CompatibilityVO vo : supports) {
                compatibilityList.add(new Compatibility(null, vo.getVersion(), vo.isBuiltIn(), vo.isUrp(), vo.isHdrp()));
            }
        }

        Integer category = form.getCategory();
        if (category != null) {
            Category entity = null;

            if (category != -1)
                entity = categoryService.getCategoryById(category);

            asset.setCategory(entity);
        }

        // 이미지는 아직...

        Asset updatedAsset = assetRepository.save(asset);
        return updatedAsset;
    }
}
