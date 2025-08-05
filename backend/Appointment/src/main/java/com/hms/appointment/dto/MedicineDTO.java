package com.hms.appointment.dto;

import com.hms.appointment.entity.Medicine;
import com.hms.appointment.entity.Prescription;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDTO {
    private Long id;
    private String name;
    private Long medicineId;
    private String dosage;
    private String frequency; // 1-0-1
    private Integer duration; // in days
    private String route; // e.g., oral, intravenous
    private String type; // e.g., tablet, syrup, injection
    private String instructions;
    private Long prescriptionId;

    public Medicine toEntity(){
        return new Medicine(id, name, medicineId, dosage, frequency, duration, route, type, instructions, new Prescription(prescriptionId) );
    }
}
