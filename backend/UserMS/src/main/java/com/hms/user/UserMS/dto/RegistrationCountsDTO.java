package com.hms.user.UserMS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationCountsDTO {
    private List<MonthlyRoleCountDTO> doctorCounts;
    private List<MonthlyRoleCountDTO> patientCounts;
}
