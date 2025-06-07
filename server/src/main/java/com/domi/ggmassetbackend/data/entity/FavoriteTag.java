package com.domi.ggmassetbackend.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class FavoriteTag {
    @Id
    @GeneratedValue(generator = "short-id")
    @GenericGenerator()
    private String id;
}
