package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import com.domi.ggmassetbackend.data.vo.ApiResponseVO;
import com.domi.ggmassetbackend.utils.RequestAPI;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;

@Service
public class StorePlatformService {
    @Value("${domi.crawler.url}")
    private String crawlerUrl;

    Asset fetchAssetFromStore(PublishPlatform platform, String url) throws IOException, URISyntaxException {
        String platformId = convertAssetId(platform);

        JSONObject body = new JSONObject();
        body.append("url", url);

        String serverURL = String.format("%s/asset/%s", crawlerUrl, platformId);

        ApiResponseVO response = RequestAPI.post(serverURL, body);

        Asset asset = new Asset();
        return asset;
    }

    String convertAssetId(PublishPlatform platform) {
        return switch (platform) {
            case Itchio -> "itchio";
            case  Unity -> "unity";
        };
    }
}
