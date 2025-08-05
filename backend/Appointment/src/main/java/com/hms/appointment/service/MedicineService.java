package com.hms.appointment.service;

import com.hms.appointment.dto.MedicineDTO;

import java.util.List;

public interface MedicineService {
    public Long saveMedicine(MedicineDTO request);

    public List<MedicineDTO> saveAllMedicines(List<MedicineDTO> requestList);

    public List<MedicineDTO> getAllMedicinesByPrescriptionId(Long prescriptionId);

}
