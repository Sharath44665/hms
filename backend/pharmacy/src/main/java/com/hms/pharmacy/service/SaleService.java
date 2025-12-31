package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.SaleDTO;
import com.hms.pharmacy.dto.SaleRequest;
import com.hms.pharmacy.exception.HmsException;

public interface SaleService {
    Long createSale(SaleRequest dto) throws HmsException;
    void updateSale(SaleDTO dto) throws HmsException;
    SaleDTO getSale(Long id) throws HmsException;
    SaleDTO getSaleByPrescriptionId(Long prescriptionId) throws HmsException;
}
