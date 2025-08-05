package com.hms.appointment.entity;

import com.hms.appointment.dto.MedicineDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long medicineId;
    private String dosage;
    private String frequency; // 1-0-1
    private Integer duration; // in days
    private String route; // e.g., oral, intravenous
    private String type; // e.g., tablet, syrup, injection
    private String instructions;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    public MedicineDTO toDTO() {
        return new MedicineDTO(id, name, medicineId, dosage, frequency, duration, route, type, instructions, prescription.getId());
    }

}
