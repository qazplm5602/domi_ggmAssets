package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.enums.UserGroup;
import lombok.Getter;

@Getter
public class UserAdminVO extends UserVO {
    private boolean admin;

    public static UserAdminVO from(User user) {
        UserAdminVO result = new UserAdminVO();
        result.email = user.getEmail();
        result.name = user.getName();
        result.admin = user.getRoles().stream().anyMatch(v -> v == UserGroup.TEACHER);

        return result;
    }
}
