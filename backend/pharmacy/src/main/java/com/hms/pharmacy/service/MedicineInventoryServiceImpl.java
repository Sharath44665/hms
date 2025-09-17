package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.dto.StockStatus;
import com.hms.pharmacy.entity.MedicineInventory;
import com.hms.pharmacy.exception.HmsException;
import com.hms.pharmacy.repository.MedicineInventoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicineInventoryServiceImpl implements MedicineInventoryService {

    private final MedicineInventoryRepository medicineInventoryRepository;
    private final MedicineService medicineService;

    @Override
    public List<MedicineInventoryDTO> getAllMedicines() throws HmsException {
        List<MedicineInventory> inventories = (List<MedicineInventory>) medicineInventoryRepository.findAll();

        return inventories.stream()
                .map(MedicineInventory::toDTO).toList();
    }

    @Override
    public MedicineInventoryDTO getMedicineById(Long id) throws HmsException {
        return medicineInventoryRepository.findById(id).orElseThrow(() -> new HmsException("INVENTORY_NOT_FOUND")).toDTO();
    }

    @Override
    public MedicineInventoryDTO addMedicine(MedicineInventoryDTO medicine) throws HmsException {
        medicine.setAddedDate(LocalDate.now());
        medicineService.addStock(medicine.getMedicineId(), medicine.getQuantity());
        medicine.setInitialQuantity(medicine.getQuantity());
        medicine.setStatus(StockStatus.ACTIVE);
        return medicineInventoryRepository.save(medicine.toEntity()).toDTO();
    }

    @Override
    public MedicineInventoryDTO updateMedicine(MedicineInventoryDTO medicine) throws HmsException {
        MedicineInventory existingInventory = medicineInventoryRepository.findById(medicine.getId()).orElseThrow(() -> new HmsException(("INVENTORY_NOT_FOUND")));
        existingInventory.setBatchNo(medicine.getBatchNo());

        if (existingInventory.getInitialQuantity() < medicine.getQuantity()) {
            medicineService.addStock(medicine.getMedicineId(), medicine.getQuantity() - existingInventory.getInitialQuantity());
        } else if (existingInventory.getInitialQuantity() > medicine.getQuantity()) {
            medicineService.removeStock(medicine.getMedicineId(), existingInventory.getInitialQuantity() - medicine.getQuantity());
        }
        existingInventory.setQuantity(medicine.getQuantity());
        existingInventory.setInitialQuantity(medicine.getQuantity());
        existingInventory.setExpiryDate(medicine.getExpiryDate());
        return medicineInventoryRepository.save(existingInventory).toDTO();
    }

    @Override
    public void deleteMedicine(Long id) throws HmsException {
        medicineInventoryRepository.deleteById(id);
    }

    public void markExpired(List<MedicineInventory> inventories) throws HmsException{
        for(MedicineInventory inventory: inventories){
            inventory.setStatus(StockStatus.EXPIRED);
        }
        medicineInventoryRepository.saveAll(inventories);
    }

    @Override
    @Scheduled(cron = "0 39 19 * * ?") // delete at 6:34 pm
    public void deleteExpiredMedicine() throws HmsException {
        System.out.println("Deleting expired medicines...");
        List<MedicineInventory> expiredMedicines = medicineInventoryRepository.findByExpiryDateBefore(LocalDate.now());
        for (MedicineInventory medicine : expiredMedicines) {
            medicineService.removeStock(medicine.getMedicine().getId(), medicine.getQuantity());

        }
        this.markExpired(expiredMedicines);
    }

    @Scheduled(cron = "0 30 14 * * ?")
    public  void print(){
        System.out.println("scheduled task running...");
    }
    /*
    * Breaking down 0 30 14 * * ?:0: Seconds (0th second of the minute).
    30: Minutes (30th minute of the hour).
    14: Hours (14:00, or 2:00 PM in 24-hour format).
    *: Day of month (any day of the month).
    *: Month (any month).
    ?:  Day of week (no specific day of the week; used when day-of-month is specified).
    *  */
}
