package com.hms.user.UserMS.jwt;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hms.user.UserMS.dto.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails  {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Roles role;
    private String name;
    private Long profileId;
    private Collection<? extends GrantedAuthority > authorities; 
    
}
