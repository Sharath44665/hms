package com.hms.pharmacy.repository;

import com.hms.pharmacy.dto.StockStatus;
import com.hms.pharmacy.entity.MedicineInventory;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface MedicineInventoryRepository extends CrudRepository<MedicineInventory, Long> {
    List<MedicineInventory> findByExpiryDateBefore(LocalDate date);
    // medicineId and expiryDate>now and quantity greater than 0, top 1 asc by expiry date
    // select * from medicine_inventory where medicine_id =? and expiry_date > now() and quantity > 0 order by expiry_date asc limit 1
    List<MedicineInventory> findByMedicineIdAndExpiryDateAfterAndQuantityGreaterThanAndStatusOrderByExpiryDateAsc(Long medicineId, LocalDate date, Integer quantity, StockStatus status);
}
