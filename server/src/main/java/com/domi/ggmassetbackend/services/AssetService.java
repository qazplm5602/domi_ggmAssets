package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.dto.AssetAutoFieldDTO;
import com.domi.ggmassetbackend.data.dto.AssetEditFormDTO;
import com.domi.ggmassetbackend.data.dto.AssetSearchParamDTO;
import com.domi.ggmassetbackend.data.dto.AssetUploadFormDTO;
import com.domi.ggmassetbackend.data.entity.*;
import com.domi.ggmassetbackend.data.enums.FileCategory;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import com.domi.ggmassetbackend.data.vo.CompatibilityVO;
import com.domi.ggmassetbackend.data.vo.ThumbnailVO;
import com.domi.ggmassetbackend.exceptions.AssetException;
import com.domi.ggmassetbackend.exceptions.DomiException;
import com.domi.ggmassetbackend.repositories.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Service
public class AssetService {
    private final AssetRepository assetRepository;
    private final CategoryService categoryService;
    private final StorePlatformService storePlatformService;
    private final ThumbnailService thumbnailService;
    private final ThumbnailAttachmentService thumbnailAttachmentService;
    private final FileService fileService;
    private final AssetFavoriteService assetFavoriteService;

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

        // 찜찜한겅
        boolean activeFavorite = option.getFavorite() != null && option.getFavorite();
        if (activeFavorite) {
            specification = specification.and(assetFavoriteService.hasFavorite());
            pageable = Pageable.unpaged(); // 찜찜한 에셋은 안짤라도 됨
        }

        return assetRepository.findAll(specification, pageable);
    }

    public List<Asset> wordsSearchAssets(String words) {
        return assetRepository.findByTitleLike(String.format("%%%s%%", words));
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
        
        if (!form.getVersion().isBlank())
            newAsset.setFileVersion(form.getVersion());

        return assetRepository.save(newAsset);
    }

    public void updateAutoField(Asset target, AssetAutoFieldDTO form) throws InterruptedException {
        Asset fetchAsset = storePlatformService.fetchAssetFromStore(form.getStoreType(), form.getUrl());

        if (form.isTitle()) {
            target.setTitle(fetchAsset.getTitle());
        }

        if (form.isDescription()) {
            target.setDescription(fetchAsset.getDescription());
        }

        if (form.isShortDesc()) {
            target.setShortDesc(fetchAsset.getShortDesc());
        }

        if (form.isPlatform()) {
            target.setPlatform(fetchAsset.getPlatform());
        }
        
        if (form.isFileSize()) {
            target.setFileSize(fetchAsset.getFileSize());
        }
        
        if (form.isSupports()) {
            // 리스트 자체가 바뀌면 큰일날꺼 같음
            List<Compatibility> supports = target.getSupports();
            supports.clear();

            List<Compatibility> localSupports = fetchAsset.getSupports();
            localSupports.forEach(v -> v.setAsset(target));

            supports.addAll(localSupports);
        }

        if (form.isPublisher()) {
            target.setPublisher(fetchAsset.getPublisher());
        }

        if (form.isPublishAt()) {
            target.setPublishAt(fetchAsset.getPublishAt());
        }

        if (form.isThumbnail()) {
            List<Thumbnail> images = target.getImages();

            // 저장되어있는 이미지 삭제 ㄱㄱ
            images.forEach(image -> {
                if (image.getType() == ThumbnailType.Image)
                    fileService.deleteFileForce(FileCategory.Thumbnail, image.getContentUrl());

                fileService.deleteFileForce(FileCategory.Thumbnail, image.getPreviewUrl());
            });

            images.clear();

            List<Thumbnail> localImages = thumbnailService.imageSave(fetchAsset.getImages());

            // 에셋 타겟 바꿈
            localImages.forEach(v -> v.setAsset(target));

            images.addAll(localImages);
        }

        if (form.isCategory()) {
            target.setCategory(fetchAsset.getCategory());
        }

        if (form.isVersion()) {
            target.setStoreVersion(fetchAsset.getStoreVersion());
        }

        assetRepository.save(target);
    }

    @Transactional
    public Asset updateAsset(AssetEditFormDTO form, List<String> attachmentIds) {
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
                compatibilityList.add(new Compatibility(null, asset, vo.getVersion(), vo.isBuiltIn(), vo.isUrp(), vo.isHdrp()));
            }
        }

        String fileVersion = form.getFileVersion();
        if (fileVersion != null)
            asset.setFileVersion(fileVersion.isEmpty() ? null : fileVersion);

        String storeVersion = form.getStoreVersion();
        if (storeVersion != null)
            asset.setStoreVersion(storeVersion.isEmpty() ? null : storeVersion);

        Integer category = form.getCategory();
        if (category != null) {
            Category entity = null;

            if (category != -1)
                entity = categoryService.getCategoryById(category);

            asset.setCategory(entity);
        }

        List<ThumbnailVO> images = form.getImages();
        if (images != null) {
            List<Thumbnail> originImages = asset.getImages();
            Set<String> needRemoveFiles = new HashSet<>();

            if (originImages == null) {
                originImages = new ArrayList<>();
                asset.setImages(originImages);
            } else {
                thumbnailAttachmentService.invalidate(originImages);
            }

            for (Thumbnail vo : originImages) {
                if (vo.getContentUrl() != null && vo.getType() == ThumbnailType.Image)
                    needRemoveFiles.add(vo.getContentUrl());
                if (vo.getPreviewUrl() != null)
                    needRemoveFiles.add(vo.getPreviewUrl());
            }

            originImages.clear();

            int i = 0;
            for (ThumbnailVO vo : images) {
                int idx = i++;
                Thumbnail thumbnail = new Thumbnail(null, asset, vo.getType(), vo.getContentUrl(), vo.getPreviewUrl(), idx);
                originImages.add(thumbnail);

                if (vo.getContentUrl() == null) {
                    ThumbnailAttachment attachment = thumbnailAttachmentService.add(thumbnail, false);
                    attachmentIds.add(String.valueOf(attachment.getId()));
                } else {
                    needRemoveFiles.remove(vo.getContentUrl());
                }

                if (vo.getPreviewUrl() == null) {
                    ThumbnailAttachment attachment = thumbnailAttachmentService.add(thumbnail, true);
                    attachmentIds.add(String.valueOf(attachment.getId()));
                } else {
                    needRemoveFiles.remove(vo.getPreviewUrl());
                }
            }

            // 이제 사용 안하는건 삭제 할꺼잉
            try {
                needRemoveFiles.forEach(v -> fileService.deleteFile(FileCategory.Thumbnail, v));
            } catch (DomiException ignored) {}
        }

        Long fileSize = form.getFileSize();
        if (fileSize != null) {
            asset.setFileSize(fileSize > 0 ? fileSize : null);
        }

        return assetRepository.save(asset);
    }

    @Transactional
    public void uploadThumbnail(UUID handleId, MultipartFile file) throws IOException {
        ThumbnailAttachment thumbnailAttachment = thumbnailAttachmentService.getOnceById(handleId);
        Thumbnail thumbnail = thumbnailAttachment.getThumbnail();

        String fileId = fileService.createFile(FileCategory.Thumbnail, file);

        if (thumbnailAttachment.isPreview()) {
            thumbnailService.setThumbnailPreviewUrl(thumbnail.getId(), fileId);
        } else {
            thumbnailService.setThumbnailContentUrl(thumbnail.getId(), fileId);
        }
    }

    @Transactional
    public void deleteAsset(int id) {
        Asset asset = getAssetById(id);
        assetRepository.delete(asset);

        // 이미지 지우깅
        List<Thumbnail> thumbnails = asset.getImages();
        for (Thumbnail thumbnail : thumbnails) {
            if (thumbnail.getType() == ThumbnailType.Image)
                fileService.deleteFileForce(FileCategory.Thumbnail, thumbnail.getContentUrl());

            fileService.deleteFileForce(FileCategory.Thumbnail, thumbnail.getPreviewUrl());
        }
    }

    public List<String> getDownloadUrlsByIds(List<Integer> ids) {
        return assetRepository.getDownloadUrlsByIds(ids);
    }
}
