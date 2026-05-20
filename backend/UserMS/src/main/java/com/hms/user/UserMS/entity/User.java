package com.hms.user.UserMS.entity;

import com.hms.user.UserMS.dto.Roles;
import com.hms.user.UserMS.dto.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private Roles role;
    private Long profileId;
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;
//    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public UserDTO toDTO(){
        return new UserDTO(this.id, this.name, this.email, this.password, this.role, this.profileId, this.createdAt, this.updatedAt);
    }

    @PrePersist
    protected void prePersist(){
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void preUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}
