package com.domi.ggmassetbackend.data.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PageContentVO<T> {
    List<T> items;
    int size;
}
