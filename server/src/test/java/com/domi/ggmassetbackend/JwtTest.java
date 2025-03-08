package com.domi.ggmassetbackend;

import com.domi.ggmassetbackend.services.JwtService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@SpringBootTest
public class JwtTest {
    @Autowired
    private JwtService jwtService;

    @Test
    @DisplayName("토큰 생성")
    public void createToken() {
        String token = jwtService.generateToken("domi@domi.kr", false);

        System.out.println(token);

        assertNotNull(token);
    }
}
