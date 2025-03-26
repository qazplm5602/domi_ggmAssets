package com.domi.ggmassetbackend.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String displayName;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Category parent;
}
