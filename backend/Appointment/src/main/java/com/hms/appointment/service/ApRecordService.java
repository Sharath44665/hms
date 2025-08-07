package com.hms.appointment.service;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.exception.HmsException;

import java.util.List;

public interface ApRecordService {
    public Long createApRecord(ApRecordDTO request) throws HmsException;

    public void updateApRecord(ApRecordDTO request) throws HmsException;

    public ApRecordDTO getApRecordByAppointmentId(Long appointmentId) throws HmsException;

    public ApRecordDTO getApRecordDetailsByAppointmentId(Long appointmentId) throws HmsException;

    public ApRecordDTO getApRecordById(Long recordId) throws HmsException;

    List<RecordDetails> getRecordsByPatientId(Long patientId) throws HmsException;

    Boolean isRecordExists(Long appointmentId) throws HmsException;
}
