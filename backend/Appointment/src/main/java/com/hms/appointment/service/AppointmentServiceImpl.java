package com.hms.appointment.service;

import com.hms.appointment.client.ProfileClient;
import com.hms.appointment.dto.*;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private  ApiService apiService;

    @Autowired
    private ProfileClient profileClient;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HmsException {
        Boolean doctorExists = profileClient.doctorExists(appointmentDTO.getDoctorId());
        if (doctorExists == null || !doctorExists) {
            throw new HmsException("DOCTOR_NOT_FOUND");
        }

        Boolean patientExists = profileClient.patientExists(appointmentDTO.getPatientId());
        if(patientExists == null || !patientExists){
            throw new HmsException("PATIENT_NOT_FOUND");
        }
        appointmentDTO.setStatus(Status.SCHEDULED);
        return appointmentRepository.save(appointmentDTO.toEntity()).getId();
    }

    @Override
    public void cancelAppointment(Long appointmentId) throws HmsException {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND"));

        if (appointment.getStatus().equals(Status.CANCELLED)){
            throw new HmsException("APPOINTMENT_ALREADY_CANCELLED");
        }
        appointment.setStatus(Status.CANCELLED);
        appointmentRepository.save(appointment);
    }

    @Override
    public void completeAppointment(Long appointmentId) {

    }

    @Override
    public void rescheduleAppointment(Long appointmentId, String newDateTime) {

    }

    @Override
    public AppointmentDTO getAppointmentDetails(Long appointmentId) throws HmsException {
        return appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND")).toDTO();
    }

    @Override
    public AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HmsException {
        AppointmentDTO appointmentDTO = appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND")).toDTO();
        DoctorDTO doctorDTO= profileClient.getDoctorById(appointmentDTO.getDoctorId());
        PatientDTO patientDTO = profileClient.getPatientById(appointmentDTO.getPatientId());
        return new AppointmentDetails(appointmentDTO.getId(), appointmentDTO.getPatientId(), patientDTO.getName(), patientDTO.getEmail(), patientDTO.getPhone(), appointmentDTO.getDoctorId(), doctorDTO.getName(),appointmentDTO.getAppointmentTime(), appointmentDTO.getStatus(), appointmentDTO.getReason(), appointmentDTO.getNotes());
    }

    @Override
    public List<AppointmentDetails> getAllAppointmentsByPatientId(Long patientId) throws HmsException {
        return appointmentRepository.findAllByPatientId(patientId).stream()
                .map(appointment -> {
                    DoctorDTO doctorDTO = profileClient.getDoctorById(appointment.getDoctorId());
                    appointment.setDoctorName(doctorDTO.getName());
                    return appointment;
                }).toList();
    }

    @Override
    public List<AppointmentDetails> getAllAppointmentsByDoctorId(Long doctorId) throws HmsException {
        return appointmentRepository.findAllByDoctortId(doctorId).stream()
                .map(appointment ->{
                    PatientDTO patientDTO = profileClient.getPatientById(appointment.getPatientId());
                    appointment.setPatientName(patientDTO .getName());
                    appointment.setPatientEmail(patientDTO.getEmail());
                    appointment.setPatientPhone(patientDTO.getPhone());
                    return  appointment;
                        }

                ).toList();
    }
}
