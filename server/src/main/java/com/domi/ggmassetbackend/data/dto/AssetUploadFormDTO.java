package com.domi.ggmassetbackend.data.dto;

import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AssetUploadFormDTO {
    @NotEmpty
    private String download;
    private String store;
    private PublishPlatform platform;
    private String version;
}
