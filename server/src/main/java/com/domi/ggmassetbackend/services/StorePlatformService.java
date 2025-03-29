package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import com.domi.ggmassetbackend.data.vo.ApiResponseVO;
import com.domi.ggmassetbackend.exceptions.StorePlatformException;
import com.domi.ggmassetbackend.utils.MiscUtils;
import com.domi.ggmassetbackend.utils.RequestAPI;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StorePlatformService {
    @Value("${domi.crawler.url}")
    private String crawlerUrl;

    public Asset fetchAssetFromStore(PublishPlatform platform, String url) {
        String platformId = convertAssetId(platform);

        JSONObject body = new JSONObject();
        body.accumulate("url", url);

        String serverURL = String.format("%s/asset/%s", crawlerUrl, platformId);

        ApiResponseVO response = null;

        try {
            response = RequestAPI.post(serverURL, body);
        } catch (IOException e) {
            throw new StorePlatformException(StorePlatformException.Type.API_IO_ERROR);
        } catch (URISyntaxException e) {
            throw new StorePlatformException(StorePlatformException.Type.API_URI_ERROR);
        }

//        if (response == null)
//            throw new StorePlatformException(StorePlatformException.Type.API_RESPONSE_ERROR);

        // 흠,.. 뭔 일이 있나봄
        if (response.getCode() != 200) {
            throw new StorePlatformException(StorePlatformException.Type.API_RESPONSE_ERROR);
        }

        JSONObject assetData = new JSONObject(response.getContent());

        Asset asset = new Asset();
        asset.setTitle(assetData.getString("title"));
        asset.setDescription(assetData.getString("desc"));
        asset.setShortDesc(assetData.getString("shortDesc"));

        // 등록일 ㅁㄴㅇㄹ
        String publishDate = assetData.getString("publishAt");
        asset.setPublishAt(MiscUtils.convertStringToLocalDateTime(publishDate));

        asset.setPublisher(assetData.getString("publisher"));

        asset.setPlatform(platform);
        asset.setPlatformUrl(url);
        asset.setCreateAt(LocalDateTime.now());

        // 이미지 리스트
        JSONArray imagesJson = assetData.getJSONArray("images");
        List<Thumbnail> images = new ArrayList<>();

        for (int i = 0; i < imagesJson.length(); i++) {
            JSONObject imageJson = imagesJson.getJSONObject(i);
            String type = imageJson.getString("type");
            String content = imageJson.getString("contentUrl");
            String preview = imageJson.getString("previewUrl");

            Thumbnail image = new Thumbnail(null, ThumbnailType.valueOf(type), content, preview);
            images.add(image);
        }

        asset.setImages(images);

        return asset;
    }

    String convertAssetId(PublishPlatform platform) {
        return switch (platform) {
            case Itchio -> "itchio";
            case  Unity -> "unity";
        };
    }
}
