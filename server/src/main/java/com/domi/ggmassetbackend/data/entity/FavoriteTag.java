package com.domi.ggmassetbackend.data.entity;

import com.domi.ggmassetbackend.utils.GenerateShortId;
import jakarta.persistence.*;

@Entity
public class FavoriteTag {
    @Id
    @GenerateShortId
    private String id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User owner;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String color;
}
