package com.domi.ggmassetbackend.configs;

import com.domi.ggmassetbackend.filters.LoginFailHandler;
import com.domi.ggmassetbackend.filters.LoginSuccessHandler;
import com.domi.ggmassetbackend.filters.TokenAuthenticationFilter;
import com.domi.ggmassetbackend.services.AuthService;
import com.domi.ggmassetbackend.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final DomiOauth2UserService oauth2UserService;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailHandler LoginFailHandler;
    private final TokenAuthenticationFilter tokenAuthenticationFilter;

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
                .successHandler(loginSuccessHandler)
                .failureHandler(LoginFailHandler)
        );

        http.anonymous(AbstractHttpConfigurer::disable);

        // 권한 확인 하기 전에 토큰 인증해야 됨 !!!!!
        http.addFilterAfter(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(request ->
                request
                        .requestMatchers("/api/user/@me").permitAll()
//                        .requestMatchers("/api/domi").hasAnyRole("DOMI")
                        .anyRequest().authenticated()
        );

        http.exceptionHandling(exception -> {
            exception.authenticationEntryPoint((request, response, authException) -> {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Access Denied");
            });
            exception.accessDeniedHandler((request, response, accessDeniedException) -> {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Access Denied");
            });
        });


        return http.build();
    }
}
