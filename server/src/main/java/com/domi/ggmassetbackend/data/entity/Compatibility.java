package com.domi.ggmassetbackend.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Entity
public class Compatibility {
    @Id
    @ManyToOne
    private Asset asset;

    private String version;

    private boolean builtIn;
    private boolean urp;
    private boolean hdrp;
}
