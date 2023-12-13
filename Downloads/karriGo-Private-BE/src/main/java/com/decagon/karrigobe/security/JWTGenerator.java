package com.decagon.karrigobe.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JWTGenerator {

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final Logger LOG = LoggerFactory.getLogger(JWTGenerator.class);

    public String generateToken(Authentication authentication, Long minutes) {
        String email = authentication.getName();

        return generateNewToken(email, minutes);
    }

    public String generateSignupToken(String email, Long minutes){
        Date currentDate = new Date();
        Date expireDate = new Date(System.currentTimeMillis() + 1000 * 60 * minutes);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
    }

    private String generateNewToken(String email, Long minutes){

        LOG.info("User with email: {} logged in", email);

        Date currentDate = new Date();
        Date expireDate = new Date(System.currentTimeMillis() + 1000 * 60 * minutes);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
    }

    public String getEmailFromJWT(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            LOG.warn("Token was expired or incorrect");
            return false;
        }catch (ExpiredJwtException exception){
            LOG.warn("Token was expired!");
            return false;
        }
    }
}
