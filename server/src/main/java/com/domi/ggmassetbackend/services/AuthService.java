package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.PrincipalDetails;
import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.DomiException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public User getUserByAuthentication(Authentication authentication) {
        Object principalBoxing = authentication.getPrincipal();
        if (!(principalBoxing instanceof PrincipalDetails principalDetails)) {
            throw new DomiException("LOGIN0", "인증 서버 로그인 오류.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return principalDetails.getUser();
    }
}
