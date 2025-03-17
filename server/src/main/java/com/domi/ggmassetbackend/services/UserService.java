package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.User;
import com.domi.ggmassetbackend.exceptions.NotAllowEmailException;
import com.domi.ggmassetbackend.exceptions.UserException;
import com.domi.ggmassetbackend.repositories.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    @Value("${domi.allow.email.domain}")
    private String allowEmailDomain;
    private final UserRepository userRepository;
    private final AuthService authService;

    public User getUserByEmailOrRegister(@Email @Valid String email, String name) {
        String domain = email.substring(email.indexOf("@") + 1);

        // 겜마고 이메일 아닌듯
        if (!domain.equals(allowEmailDomain)) {
//            throw new UserException(UserException.Type.NOT_ALLOW_DOMAIN);
            throw new NotAllowEmailException("전용 이메일이 아닙니다.");
        }

        User user = userRepository.findByEmail(email).orElse(null);

        // 첫 로그인 인듯
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name);

            user = userRepository.save(user);
        }

        return user;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserException(UserException.Type.NOT_FOUND_USER));
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) { // 로그인 안되어있음
            throw new UserException(UserException.Type.NEED_LOGIN);
        }

         return authService.getUserByAuthentication(authentication);
    }
}
