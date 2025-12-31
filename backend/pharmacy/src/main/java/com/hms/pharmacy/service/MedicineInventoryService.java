package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.entity.MedicineInventory;
import com.hms.pharmacy.exception.HmsException;

import java.util.List;

public interface MedicineInventoryService {
    List<MedicineInventoryDTO> getAllMedicines() throws HmsException;

    MedicineInventoryDTO getMedicineById(Long id) throws HmsException;

    MedicineInventoryDTO addMedicine(MedicineInventoryDTO medicine) throws HmsException;

    MedicineInventoryDTO updateMedicine(MedicineInventoryDTO medicine) throws HmsException;

    String sellStock(Long medicineId, Integer quantity) throws HmsException;

    void deleteMedicine(Long id) throws HmsException;

    public void deleteExpiredMedicine() throws HmsException;
}
