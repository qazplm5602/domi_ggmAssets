package com.domi.ggmassetbackend.data.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String uniqueId; // 이걸로 에셋 식별함

    @Column(nullable = false)
    private String title;

    private String shortDesc;
    private String description;

    private String publisher;

    private String category;

    @OneToMany
    private List<Compatibility> supports;
}
