package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class DomiOauth2UserService extends DefaultOAuth2UserService {
    private final UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();

        // 어디에서 로그인 했는지 (구글 네이버 이런거)
        String registerationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // 어차피 구글만 ㄱㄴ
        if (!registerationId.equals("google")) {
            throw new OAuth2AuthenticationException("NOT_SUPPORT_REGISTRATION_ID");
        }

        // 유저 정보 가져오깅 (google)
        String email = oAuth2UserAttributes.get("email").toString();
        String name = oAuth2UserAttributes.get("name").toString();

        User user = userService.getUserByEmailOrRegister(email, name);
        return new PrincipalDetails(user);
    }
}
