package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.SaleItemDTO;
import com.hms.pharmacy.exception.HmsException;

import java.util.List;

public interface SaleItemService {
    Long createSaleItem(SaleItemDTO saleItemDTO) throws HmsException;

    void createSaleItem(Long saleId, List<SaleItemDTO> saleItemDTOS) throws HmsException;
    void createMultipleSaleItem(Long saleId, Long medicineId, List<SaleItemDTO> saleItemDTOS) throws HmsException;

    void updateSaleItem(SaleItemDTO saleItemDTO) throws HmsException;
    List<SaleItemDTO> getSaleItemsBySaleId(Long saleId) throws HmsException;
    SaleItemDTO getSaleItem(Long id)throws HmsException;
}
