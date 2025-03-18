package com.domi.ggmassetbackend.utils;

import com.domi.ggmassetbackend.data.enums.UserGroup;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Converter
public class RoleListConverter implements AttributeConverter<List<UserGroup>, String> {
    @Override
    public String convertToDatabaseColumn(List<UserGroup> userGroupList) {
        return userGroupList.stream().map(UserGroup::toString).collect(Collectors.joining(","));
    }

    @Override
    public List<UserGroup> convertToEntityAttribute(String value) {
        if (value.isEmpty())
            return List.of();

        String[] groups = value.split(",");
        return Stream.of(groups).map(UserGroup::valueOf).collect(Collectors.toList());
    }
}
