package com.domi.ggmassetbackend.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
@IdClass(AssetFavoriteTagId.class)
public class AssetFavoriteTag {
    @Id
    @ManyToOne
    private AssetFavorite favorite;

    @Id
    @ManyToOne
    private FavoriteTag tag;
}
