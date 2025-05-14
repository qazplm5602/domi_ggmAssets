package com.domi.ggmassetbackend.data.dto;

import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AssetAutoFieldDTO {
    @NotBlank
    String url;
    PublishPlatform storeType;

    boolean title;
    boolean fileSize;
    boolean category;
    boolean platform;
    boolean publisher;
    boolean publishAt;
    boolean thumbnail;
    boolean supports;
    boolean shortDesc;
    boolean description;
    boolean version;
}
