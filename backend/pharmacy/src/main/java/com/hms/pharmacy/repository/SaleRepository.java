package com.hms.pharmacy.repository;

import com.hms.pharmacy.entity.Sale;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SaleRepository extends CrudRepository<Sale, Long> {
    Boolean existsByPrescriptionId(Long prescriptionId);
    Optional<Sale> findByPrescriptionId(Long prescriptionId );
}
