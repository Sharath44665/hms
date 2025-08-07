package com.hms.appointment.service;

import com.hms.appointment.client.ProfileClient;
import com.hms.appointment.dto.DoctorName;
import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.dto.PrescriptionDetails;
import com.hms.appointment.entity.Prescription;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.repository.PrescriptionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;

    private final MedicineService medicineService;

    private final ProfileClient profileClient;

    @Override
    public Long savePrescription(PrescriptionDTO request) {
        request.setPrescriptionDate(LocalDate.now());
        Long prescriptionId = prescriptionRepository.save(request.toEntity()).getId();
        request.getMedicines().forEach(medicine -> medicine.setPrescriptionId(prescriptionId));
        medicineService.saveAllMedicines(request.getMedicines());
//        request.setId(prescriptionId);
        return prescriptionId;
    }

    @Override
    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId) throws HmsException {
        PrescriptionDTO prescriptionDTO = prescriptionRepository.findByAppointment_id(appointmentId).orElseThrow(() -> new HmsException("PRESCRIPTION_NOT_FOUND")).toDTO();
        prescriptionDTO.setMedicines(medicineService.getAllMedicinesByPrescriptionId(prescriptionDTO.getId()));
        return prescriptionDTO;
    }

    @Override
    public PrescriptionDTO getPrescriptionById(Long prescriptionId) throws HmsException {
        PrescriptionDTO dto = prescriptionRepository.findById(prescriptionId).orElseThrow(() -> new HmsException("PRESCRIPTION_NOT_FOUND")).toDTO();
        dto.setMedicines(medicineService.getAllMedicinesByPrescriptionId(dto.getId()));
        return dto;
    }

    @Override
    public List<PrescriptionDetails> getPrescriptionsByPatientId(Long patientId) throws HmsException {
        List<Prescription> prescriptions = prescriptionRepository.findAllByPatientId(patientId);
        List<PrescriptionDetails> prescriptionDetails = prescriptions.stream()
                .map(Prescription::toDetails)
                .toList();
        prescriptionDetails.forEach(details -> {
            details.setMedicines(medicineService.getAllMedicinesByPrescriptionId(details.getId()));
        });
        List<Long> doctorsIds = prescriptionDetails.stream()
                .map(PrescriptionDetails::getDoctorId)
                .distinct()
                .toList();
        List<DoctorName> doctorNames = profileClient.getDoctorsById(doctorsIds);
        Map<Long, String> doctorMap = doctorNames.stream()
                .collect(Collectors.toMap(DoctorName::getId, DoctorName::getName));
        prescriptionDetails.forEach(detais -> {
            String doctorName = doctorMap.get(detais.getDoctorId());
            if (doctorName != null) {
                detais.setDoctorName(doctorName);
            } else {
                detais.setDoctorName("Unknown Doctor");
            }
        });


        return prescriptionDetails;
    }
}
