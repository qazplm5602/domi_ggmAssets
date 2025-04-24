package com.domi.ggmassetbackend.data.dto;

import com.domi.ggmassetbackend.data.vo.CompatibilityVO;
import com.domi.ggmassetbackend.data.vo.ThumbnailVO;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class AssetEditFormDTO {
    int id;

//    @NotBlank
    String title;

    String shortDesc;
    String description;

//    @NotBlank
    String downloadUrl;

    String platformUrl;
    String platform;
    String publisher;
    String publishAt;
    List<CompatibilityVO> supports;
    Integer category;
    List<ThumbnailVO> images;
    Long fileSize;
}