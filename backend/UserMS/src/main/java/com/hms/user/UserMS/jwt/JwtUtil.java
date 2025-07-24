package com.hms.user.UserMS.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    private static final Long JWT_TOKEN_VALIDITY = 5*60*60L;

    // chat-gpt: give me node command to generate secret key for jwt
    // OR
    // node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    private static final String SECRET = "5fec07d7f7d4e67419cea1b4b1c44fddae8835885921ac01ec592e4eefcfec2e2f6997d3b71272154a96cb3dbde2c1c4790b2c5626c131d5be5ef85bec54c5e8";

    public String  generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails; 
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());
        return doGenerateToken(claims, user.getUsername());

    }
    public String doGenerateToken(Map<String, Object> claims, String subject ){
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY * 1000)).signWith(SignatureAlgorithm.HS512, SECRET ).compact();
    }
}
