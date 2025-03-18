package com.domi.ggmassetbackend.data.entity;

import com.domi.ggmassetbackend.data.enums.UserGroup;
import com.domi.ggmassetbackend.utils.RoleListConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@Entity
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String email;

    private String name;

    @Convert(converter = RoleListConverter.class)
    @Column(nullable = false)
    private List<UserGroup> roles;
}
