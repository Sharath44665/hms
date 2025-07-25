package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.exception.HmsException;

public interface AppointmentService {
    Long scheduleAppointment(AppointmentDTO appointmentDTO);

    void cancelAppointment(Long appointmentId) throws HmsException;

    void completeAppointment(Long appointmentId);

    void rescheduleAppointment(Long appointmentId, String newDateTime);

    AppointmentDTO getAppointmentDetails(Long appointmentId) throws HmsException;
}
