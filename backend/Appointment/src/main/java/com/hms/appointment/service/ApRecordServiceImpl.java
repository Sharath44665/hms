package com.hms.appointment.service;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.entity.ApRecord;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.repository.ApRecordRepository;
import com.hms.appointment.utility.StringListConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApRecordServiceImpl implements ApRecordService{

    private ApRecordRepository apRecordRepository;
    @Override
    public Long createApRecord(ApRecordDTO request) throws HmsException {
        Optional<ApRecord> existingRecord = apRecordRepository.findByAppointment_Id(request.getAppointmentId());

        if(existingRecord.isPresent()){
            throw new HmsException("APPOINTMENT_RECORD_ALREADY_EXISTS");
        }
        return apRecordRepository.save(request.toEntity()).getId();
    }

    @Override
    public void updateApRecord(ApRecordDTO request) throws HmsException {
        ApRecord existing = apRecordRepository.findById(request.getId()).orElseThrow(()-> new HmsException("APPOINTMENT_RECORD_NOT_FOUND"));
        existing.setNotes(request.getNotes());
        existing.setDiagnosis(request.getDiagnosis());
        existing.setFollowUpDate(request.getFollowUpDate());
        existing.setSymptoms(StringListConverter.convertListToString(request.getSymptoms()));
        existing.setTests(StringListConverter.convertListToString(request.getTests()));
        apRecordRepository.save(existing);
    }

    @Override
    public ApRecordDTO getApRecordByAppointmentId(Long appointmentId) throws HmsException {
        return apRecordRepository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HmsException(("APPOINTMENT_RECORD_NOT_FOUND"))).toDTO();
    }

    @Override
    public ApRecordDTO getApRecordById(Long recordId) throws HmsException {
        return apRecordRepository.findById(recordId).orElseThrow(()-> new HmsException("APPOINTMENT_RECORD_NOT_FOUND")).toDTO();
    }
}
