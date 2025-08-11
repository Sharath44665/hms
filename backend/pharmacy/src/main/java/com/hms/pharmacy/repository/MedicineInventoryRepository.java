package com.hms.pharmacy.repository;

import com.hms.pharmacy.entity.MedicineInventory;
import org.springframework.data.repository.CrudRepository;

public interface MedicineInventoryRepository extends CrudRepository<MedicineInventory, Long> {
}
