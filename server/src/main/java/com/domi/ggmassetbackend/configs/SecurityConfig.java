package com.domi.ggmassetbackend.configs;

import com.domi.ggmassetbackend.filters.LoginSuccessHandler;
import com.domi.ggmassetbackend.services.AuthService;
import com.domi.ggmassetbackend.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.web.SecurityFilterChain;
import com.domi.ggmassetbackend.services.DomiOauth2UserService;


@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final DomiOauth2UserService oauth2UserService;
    private final LoginSuccessHandler loginSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);

        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);
//        http.headers(v ->
//                v.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)
//                        .disable()
//        );
        
        // jwt 방식이라 세션 아이디 안써도 됨
        http.sessionManagement(v ->
                v.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        // oauth2 설정
        http.oauth2Login(oauth ->
                oauth.userInfoEndpoint(v ->
                        v.userService(oauth2UserService)
                )
                .redirectionEndpoint(v -> v.baseUri("/oauth2/callback/*"))
                .successHandler(loginSuccessHandler) // 이건 나중에
        );

        return http.build();
    }
}
