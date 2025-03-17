package com.domi.ggmassetbackend.data.entity;

import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Thumbnail {
    @Id
    @ManyToOne
    private Asset asset;

    @Enumerated(EnumType.STRING)
    private ThumbnailType type;

    private String contentUrl;
    private String previewUrl;
}
