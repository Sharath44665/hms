package com.hms.appointment.entity;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    private Status status;
    private String reason;
    private String notes;

    public AppointmentDTO toDTO() {
        return new AppointmentDTO(this.id, this.patientId, this.doctorId, this.appointmentTime, this.status, this.reason, this.notes);
    }

    public Appointment(Long id){
        this.id = id;
    }
}
