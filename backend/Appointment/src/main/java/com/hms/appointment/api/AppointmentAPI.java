package com.hms.appointment.api;

import com.hms.appointment.dto.*;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.service.AppointmentService;
import com.hms.appointment.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/appointment")
@Validated
public class AppointmentAPI {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private PrescriptionService prescriptionService;

    @PostMapping("/schedule")
    public ResponseEntity<Long> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO) throws HmsException {
        System.out.println("----> "+ appointmentDTO.toString());
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

    @GetMapping("/getAllByPatient/{patientId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentByPatientId(@PathVariable Long patientId)throws HmsException{
        return new ResponseEntity<>(appointmentService.getAllAppointmentsByPatientId(patientId),HttpStatus.OK);
    }

    @GetMapping("/getAllByDoctor/{doctorId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentsByDoctor(@PathVariable Long doctorId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAllAppointmentsByDoctorId(doctorId), HttpStatus.OK);
    }

    @GetMapping("/countByPatient/{patientId}")
    public ResponseEntity<List<MonthlyVisitDTO>> getAppointmentCountByPatientId(@PathVariable Long patientId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentCountByPatient(patientId), HttpStatus.OK);
    }

    @GetMapping("/countByDoctor/{doctorId}")
    public ResponseEntity<List<MonthlyVisitDTO>> getAppointmentCountByDoctorId(@PathVariable Long doctorId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentCountByDoctor(doctorId), HttpStatus.OK);
    }

    @GetMapping("/visitCount")
    public ResponseEntity<List<MonthlyVisitDTO>> getAppointmentCounts() throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentCounts(), HttpStatus.OK);
    }


    @GetMapping("/countReasonByPatient/{patientId}")
    public ResponseEntity<List<ReasonCountDTO>> getReasonsByPatient(@PathVariable Long patientId) {
        return new ResponseEntity<>(appointmentService.getReasonCountByPatient(patientId), HttpStatus.OK);
    }

    @GetMapping("/countReasonByDoctor/{doctorId}")
    public ResponseEntity<List<ReasonCountDTO>> getReasonsByDoctor(@PathVariable Long doctorId) {
        return new ResponseEntity<>(appointmentService.getReasonCountByDoctor(doctorId), HttpStatus.OK);
    }

    @GetMapping("/countReasons")
    public ResponseEntity<List<ReasonCountDTO>> getReasons() {
        return new ResponseEntity<>(appointmentService.getReasonCount(), HttpStatus.OK);
    }

    @GetMapping("/getMedicinesByPatient/{patientId}")
    public ResponseEntity<List<MedicineDTO>> getMedicinesByPatientId(@PathVariable Long patientId) throws HmsException {
        return new ResponseEntity<>(prescriptionService.getMedicineByPatientId(patientId), HttpStatus.OK);
    }

    @GetMapping("/today")
    public ResponseEntity<List<AppointmentDetails>> getTodayAppointment() throws HmsException {
        return new ResponseEntity<>(appointmentService.getTodaysAppointments(), HttpStatus.OK);
    }


}
