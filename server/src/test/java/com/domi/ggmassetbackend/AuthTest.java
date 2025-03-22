package com.domi.ggmassetbackend;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.enums.UserGroup;
import com.domi.ggmassetbackend.services.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AuthTest {
    @Autowired
    private UserService userService;

    @Test
    @DisplayName("로그인 유저 가져오기")
    void loginUserTest() {
        String email = "domi@domi.kr";

        // 테스트 유저 만듬
        User dbUser = new User();
        dbUser.setId(1);
        dbUser.setEmail(email);
        dbUser.setName("domi");
        dbUser.setRoles(List.of(UserGroup.USER));

//        doReturn(dbUser).when(userService).getUserByEmail(email);
//        when(userService.getUserByEmail(email)).thenReturn(dbUser);

//        when(userService.getCurrentUser()).thenCallRealMethod(); // 실제 함수 호출

        //. 로그인 ㄱㄱㄱ
//        User user = userService.getUserByEmail(email);
        User user = dbUser;

        PrincipalDetails userDetails = new PrincipalDetails(user);

        Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        // 여기까지 로그인 완료

        User currentUser = userService.getCurrentUser();
        assertEquals(currentUser, user);
    }
}
