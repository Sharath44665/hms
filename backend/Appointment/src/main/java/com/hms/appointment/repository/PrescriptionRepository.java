package com.hms.appointment.repository;

import com.hms.appointment.entity.Prescription;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PrescriptionRepository extends CrudRepository<Prescription, Long> {
    Optional<Prescription> findByAppointment_id(Long appointmentId);

    List<Prescription> findAllByPatientId(Long patientId);
}
