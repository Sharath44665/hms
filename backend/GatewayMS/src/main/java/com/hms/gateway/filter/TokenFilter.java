package com.hms.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
    public static final String SECRET = "5fec07d7f7d4e67419cea1b4b1c44fddae8835885921ac01ec592e4eefcfec2e2f6997d3b71272154a96cb3dbde2c1c4790b2c5626c131d5be5ef85bec54c5e8";

    // Key signingKey = Keys.hmacShaKeyFor(SECRET.getBytes());
    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();
            if (path.equals("/users/login") || path.equals("/users/register")) {
                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build());
            }
            HttpHeaders header = exchange.getRequest().getHeaders();
            if (!header.containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Authorization header is missing");
            }
            String authHeader = header.getFirst(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || authHeader.startsWith("Bearer")) {
                throw new RuntimeException("Authorization header is invalid");
            }
            String token = authHeader.substring(7);
            try {
                Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
                // Claims claims = Jwts.parse
                // r().verifyWith(signingKey).build().parseClaimsJws(SECRET).getBody();

                exchange = exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build();
            } catch (Exception e) {
                throw new RuntimeException("Token is invalid");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {
    }

}
