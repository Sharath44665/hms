package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exception.HmsException;

import java.util.List;

public interface AppointmentService {
    Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HmsException;

    void cancelAppointment(Long appointmentId) throws HmsException;

    void completeAppointment(Long appointmentId);

    void rescheduleAppointment(Long appointmentId, String newDateTime);

    AppointmentDTO getAppointmentDetails(Long appointmentId) throws HmsException;

    AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HmsException;

    List<AppointmentDetails> getAllAppointmentsByPatientId(Long patientId) throws HmsException;

    List<AppointmentDetails> getAllAppointmentsByDoctorId(Long doctorId) throws HmsException;

}
