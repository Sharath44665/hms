package com.hms.appointment.entity;

import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.dto.PrescriptionDetails;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="appointment_id")
    private Appointment appointment;
    private LocalDate prescriptionDate;
    private String notes;

    public Prescription(Long id){
        this.id=id;
    }

    public PrescriptionDTO toDTO(){
        return new PrescriptionDTO(id, patientId, doctorId, appointment.getId(), prescriptionDate, notes, null);
    }

    public PrescriptionDetails toDetails (){
        return  new PrescriptionDetails(id, patientId, doctorId, null, appointment.getId(), prescriptionDate, notes, null);
    }

}
