package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.exceptions.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    @Value("${domi.jwt.key}")
    private String jwtSecret;

    @Value("${domi.jwt.access.expire}")
    private Long accessExpire;

    @Value("${domi.jwt.refresh.expire}")
    private Long refreshExpire;

    private SecretKey secretKey;

    @PostConstruct
    private void init() {
        secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(String email, boolean refresh) {
        return Jwts.builder()
                .id(email)
                .claim("refresh", refresh)
                .issuer("domi-ggmAsset")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + (refresh ? refreshExpire : accessExpire) * 1000))
                .signWith(secretKey, Jwts.SIG.HS512)
                .compact();
    }

    public Claims parseToken(String token) {
        Claims result;

        try {
            result = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (MalformedJwtException e) {
            throw new TokenException(TokenException.Type.INVALID_TOKEN);
        } catch (SignatureException e) {
            throw new TokenException(TokenException.Type.INVALID_JWT_SIGNATURE);
        }

         return result;
    }
}
