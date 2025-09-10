package com.hms.media.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig { 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // http.authorizeHttpRequests(
        // (requests) ->
        // requests.requestMatchers("/**").permitAll().anyRequest().authenticated());
        // http.csrf(csrf -> csrf.disable());

        // return http.build();

        // http.csrf().disable().authorizeHttpRequests(
        // auth -> auth.requestMatchers(request ->
        // "SECRET".equals(request.getHeader("X-Secret-Key"))).permitAll()
        // .anyRequest().denyAll());
        // return http.build();

        http.csrf(AbstractHttpConfigurer::disable) // Use Lambda DSL to disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(request -> "SECRET".equals(request.getHeader("X-Secret-Key"))).permitAll()
                        .anyRequest().denyAll());
        return http.build();
    }
}
