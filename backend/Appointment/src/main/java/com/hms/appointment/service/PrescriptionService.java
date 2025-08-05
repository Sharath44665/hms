package com.hms.appointment.service;

import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.exception.HmsException;

public interface PrescriptionService {
    public Long savePrescription(PrescriptionDTO request);
    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId) throws HmsException;
    public PrescriptionDTO getPrescriptionById(Long prescriptionId) throws HmsException;
}
