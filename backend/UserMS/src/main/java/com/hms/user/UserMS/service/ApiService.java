package com.hms.user.UserMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.hms.user.UserMS.dto.Roles;
import com.hms.user.UserMS.dto.UserDTO;

import reactor.core.publisher.Mono;

@Service
public class ApiService {
    @Autowired
    private WebClient.Builder webClient;

    public Mono<Long> addProfile(UserDTO userDTO) {
        if (userDTO.getRole().equals(Roles.DOCTOR)) {
            return webClient.build().post().uri("http://localhost:9100/profile/doctor/add").bodyValue(userDTO)
                    .retrieve().bodyToMono(Long.class);
        } else if (userDTO.getRole().equals(Roles.PATIENT)) {
            return webClient.build().post().uri("http://localhost:9100/profile/patient/add").bodyValue(userDTO)
                    .retrieve().bodyToMono(Long.class);
        }
        return null;
    }
}
