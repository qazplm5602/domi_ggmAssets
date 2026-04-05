package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.vo.ApiResponseVO;
import com.domi.ggmassetbackend.exceptions.AuthException;
import com.domi.ggmassetbackend.exceptions.DomiException;
import com.domi.ggmassetbackend.filters.LoginSuccessHandler;
import com.domi.ggmassetbackend.utils.RequestAPI;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${domi.ggm.verify.url}")
    private String ggmVerifyUrl;

    public User getUserByAuthentication(Authentication authentication) {
        Object principalBoxing = authentication.getPrincipal();
        if (!(principalBoxing instanceof PrincipalDetails principalDetails)) {
            throw new DomiException("LOGIN0", "인증 서버 로그인 오류.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return principalDetails.getUser();
    }

    // 토큰으로 ggm 인증
    public void authenticateWithGgmToken(HttpServletRequest request, HttpServletResponse response, String token) {
        // body 토큰 넣기
        JSONObject body = new JSONObject();
        body.put("token", token);

        ApiResponseVO responseVO;

        // API 요청으로 계정 정보 가져오기
        try {
            responseVO = RequestAPI.post(ggmVerifyUrl, body);
        } catch (IOException | URISyntaxException e) {
            // 호출 실패
            throw new AuthException(AuthException.Type.GGM_API_REQ_FAILED);
        }

        // 만료된 토큰
        if (responseVO.getCode() == 401) {
            throw new AuthException(AuthException.Type.GGM_API_TOKEN_INVALID);
        } else if (responseVO.getCode() != 200) { // 성공 이외의 코드
            throw new AuthException(AuthException.Type.GGM_API_RES_FAILED);
        }

        JSONObject authResult = new JSONObject(responseVO.getContent());

        // 인증된 계정이 아님
        if (!authResult.getBoolean("authenticated")) {
            throw new AuthException(AuthException.Type.GGM_API_USER_NOT_VERIFY);
        }

        JSONObject ggmUser = authResult.getJSONObject("user");

        System.out.println(ggmUser);
    }
}
