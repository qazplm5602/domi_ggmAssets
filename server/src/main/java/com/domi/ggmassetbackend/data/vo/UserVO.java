package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class UserVO {
    protected String email;
    protected String name;

    public static UserVO from(User user) {
        UserVO result = new UserVO();
        result.email = user.getEmail();
        result.name = user.getName();

        return result;
    }
}
