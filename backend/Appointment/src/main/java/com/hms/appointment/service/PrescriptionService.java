package com.hms.appointment.service;

import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.dto.PrescriptionDetails;
import com.hms.appointment.exception.HmsException;

import java.util.List;

public interface PrescriptionService {
    public Long savePrescription(PrescriptionDTO request);

    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId) throws HmsException;

    public PrescriptionDTO getPrescriptionById(Long prescriptionId) throws HmsException;

    public List<PrescriptionDetails> getPrescriptionsByPatientId(Long patientId) throws HmsException;
}
