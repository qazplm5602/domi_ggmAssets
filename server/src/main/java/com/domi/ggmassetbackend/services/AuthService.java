package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.data.enums.UserGroup;
import com.domi.ggmassetbackend.data.vo.ApiResponseVO;
import com.domi.ggmassetbackend.exceptions.AuthException;
import com.domi.ggmassetbackend.exceptions.DomiException;
import com.domi.ggmassetbackend.filters.LoginSuccessHandler;
import com.domi.ggmassetbackend.repositories.UserRepository;
import com.domi.ggmassetbackend.utils.RequestAPI;
import jakarta.servlet.http.Cookie;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${domi.ggm.verify.url}")
    private String ggmVerifyUrl;

    @Value("${domi.jwt.access.expire}")
    private Long accessExpire;

    @Value("${domi.jwt.refresh.expire}")
    private Long refreshExpire;

    private final JwtService jwtService;
    private final UserRepository userRepository;


    public User getUserByAuthentication(Authentication authentication) {
        Object principalBoxing = authentication.getPrincipal();
        if (!(principalBoxing instanceof PrincipalDetails principalDetails)) {
            throw new DomiException("LOGIN0", "인증 서버 로그인 오류.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return principalDetails.getUser();
    }

    // 토큰으로 ggm 인증
    public void authenticateWithGgmToken(HttpServletResponse response, String token) throws IOException {
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

        // 정보 파싱
        JSONObject ggmUser = authResult.getJSONObject("user");
        int ggmId = ggmUser.getInt("id");
        int grade = ggmUser.getInt("grade");
        String name = ggmUser.getString("name");
//        String email = ggmUser.getString("email");
        String email = ggmId + "+ggm" + "@domi.kr"; // 가짜 이메일 생성 (이걸로 식별함)
        List<UserGroup> roles = new ArrayList<>();

        // 자동 권한 반영
        roles.add(UserGroup.USER);

        // 5학년 = 선생님
        if (grade == 5) {
            roles.add(UserGroup.TEACHER);
        } else if (grade < 1 || grade > 5) { // 잘못된 학년
            throw new AuthException(AuthException.Type.GGM_API_USER_GRADE_INVALID);
        }
        // 나중에 졸업생은 막을지 고민중... ???


        User user = userRepository.findByEmail(email).orElse(null);

        // 자동 회원가입
        if (user == null) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setRoles(roles);

            userRepository.save(newUser);
        } else if (!user.getRoles().equals(roles)) { // 권한 변경 시 업데이트
            user.setRoles(roles);
            userRepository.save(user);
        }

        // 로그인 성공
        completeLogin(response, email);
    }

    public void completeLogin(HttpServletResponse response, String email) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 토큰 만들기
        String accessToken = jwtService.generateToken(email, false);
        String refreshToken = jwtService.generateToken(email, true);

        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setMaxAge(Math.toIntExact(accessExpire));
        accessCookie.setPath("/");
//        accessCookie.setHttpOnly(true);
//        accessCookie.setSecure(true);

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setMaxAge(Math.toIntExact(refreshExpire));
        refreshCookie.setPath("/");
//        refreshCookie.setHttpOnly(true);
//        refreshCookie.setSecure(true);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);

        response.sendRedirect("/");

//        LoginTokenDTO tokenData = new LoginTokenDTO(accessToken, refreshToken);
//        String result = objectMapper.writeValueAsString(tokenData);

//        response.getWriter().write(result);
    }
}
