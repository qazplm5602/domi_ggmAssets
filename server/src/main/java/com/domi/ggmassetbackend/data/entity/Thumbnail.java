package com.domi.ggmassetbackend.data.entity;

import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Thumbnail {
    @Id
    @GeneratedValue(generator = "uuid2")
    @Column(columnDefinition = "VARCHAR(128)")
    private UUID id;

    @Enumerated(EnumType.STRING)
    private ThumbnailType type;

    private String contentUrl;
    private String previewUrl;
}
