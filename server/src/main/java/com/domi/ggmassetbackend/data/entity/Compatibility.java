package com.domi.ggmassetbackend.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Compatibility {
    @Id
    @GeneratedValue(generator = "uuid2")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(columnDefinition = "VARCHAR(128)")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;

    private String version;

    private boolean builtIn;
    private boolean urp;
    private boolean hdrp;
}
