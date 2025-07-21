package com.hms.profile.dto;

import java.time.LocalDate;

import com.hms.profile.entity.Doctor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    private String phone;
    private String address;
    private String licenseNo;
    private String specilaization;
    private String department;
    private Integer totalExp;

    public Doctor toEntity() {
        return new Doctor(this.id, this.name, this.email, this.dob, this.phone, this.address, this.licenseNo,
                this.specilaization, this.department, this.totalExp);
    }
}
