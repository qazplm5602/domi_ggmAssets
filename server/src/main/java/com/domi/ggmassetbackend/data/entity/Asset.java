package com.domi.ggmassetbackend.data.entity;

import com.domi.ggmassetbackend.data.enums.PublishPlatform;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = true, unique = true)
    private String uniqueId; // 이걸로 에셋 식별함 (이제 안씀 아마도)

    @Column(nullable = false)
    private String title;

    private String shortDesc;

    @Column(columnDefinition = "mediumtext")
    private String description;

    private String publisher;

//    private String category;
    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "asset_id")
    private List<Compatibility> supports;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "asset_id")
    private List<Thumbnail> images;

    @Enumerated(EnumType.STRING)
    private PublishPlatform platform;

    private String platformUrl;
    private String downloadUrl;

    private Integer fileSize;

    private LocalDateTime publishAt;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createAt;
}
