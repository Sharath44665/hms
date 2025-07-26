package com.hms.appointment.api;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/appointment")
@Validated
public class AppointmentAPI {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/schedule")
    public ResponseEntity<Long> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO) throws HmsException {
        return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable long appointmentId) throws HmsException {
        appointmentService.cancelAppointment(appointmentId);
        return new ResponseEntity<>("Appointment Cancelled", HttpStatus.OK);
    }

    @GetMapping("/get/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointmentDetails(@PathVariable Long appointmentId) throws HmsException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetails(appointmentId), HttpStatus.OK);
    }
    
    @GetMapping("/get/details/{appointmentId}")
    public ResponseEntity<AppointmentDetails> getAppointmentDetailsWithName(@PathVariable Long appointmentId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentDetailsWithName(appointmentId), HttpStatus.OK);
    }
}
