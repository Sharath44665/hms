package com.hms.user.UserMS.entity;

import com.hms.user.UserMS.dto.Roles;
import com.hms.user.UserMS.dto.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    public UserDTO toDTO(){
        return new UserDTO(this.id, this.name, this.email, this.password, this.role, this.profileId);
    }

}
