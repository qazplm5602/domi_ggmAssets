package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Asset;
import com.domi.ggmassetbackend.services.CategoryService;
import lombok.Getter;

@Getter
public class AssetAllVO extends AssetDetailVO {
    private String platformUrl;

    @Override
    public void assetDataInit(Asset asset) {
        super.assetDataInit(asset);
        this.platformUrl = asset.getPlatformUrl();
    }
}
