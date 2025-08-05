package com.hms.appointment.api;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.service.ApRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;

@RestController
@CrossOrigin
@RequestMapping("/appointment-report")
@Validated
@RequiredArgsConstructor
public class ApRecordAPI {
    private final ApRecordService apRecordService;

    @PostMapping("/create")
    public ResponseEntity<Long> createAppointmentReport(@RequestBody ApRecordDTO request) throws HmsException {
        return new ResponseEntity<>(apRecordService.createApRecord(request), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAppointmentReport(@RequestBody ApRecordDTO request) throws HmsException{
        apRecordService.updateApRecord(request);
        return  new ResponseEntity<>("Appointment Report Updated", HttpStatus.OK);
    }

    @GetMapping("/getAppointmentId/{appointmentId}")
    public ResponseEntity<ApRecordDTO> getAppointmentReportByAppointmentId(@PathVariable Long appointmentId) throws HmsException{
        return new ResponseEntity<>(apRecordService.getApRecordByAppointmentId(appointmentId), HttpStatus.OK);
    }

    @GetMapping("/getById/{recordId}")
    public ResponseEntity<ApRecordDTO> getAppointmentReportById(@PathVariable Long recordId) throws HmsException{
        return new ResponseEntity<>(apRecordService.getApRecordById(recordId), HttpStatus.OK);
    }
}
