package com.hms.appointment.service;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.exception.HmsException;

public interface ApRecordService {
    public Long createApRecord(ApRecordDTO request) throws HmsException;

    public void updateApRecord(ApRecordDTO request) throws HmsException;

    public ApRecordDTO getApRecordByAppointmentId(Long appointmentId) throws HmsException;

    public ApRecordDTO getApRecordById(Long recordId) throws HmsException;
}
