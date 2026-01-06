package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.SaleDTO;
import com.hms.pharmacy.dto.SaleItemDTO;
import com.hms.pharmacy.dto.SaleRequest;
import com.hms.pharmacy.entity.Sale;
import com.hms.pharmacy.exception.HmsException;
import com.hms.pharmacy.repository.MedicineRepository;
import com.hms.pharmacy.repository.SaleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {
    private final SaleRepository saleRepository;
    private final SaleItemService saleItemService;
    private final MedicineInventoryService medicineInventoryService;


    @Override
    @Transactional
    public Long createSale(SaleRequest dto) throws HmsException {
        if(saleRepository.existsByPrescriptionId(dto.getPrescriptionId())){
            throw new HmsException("SALE_ALREADY_EXISTS");
        } 
        for(SaleItemDTO saleItem : dto.getSaleItems()){
    		saleItem.setBatchNo(
          medicineInventoryService.sellStock(saleItem.getMedicineId(), saleItem.getQuantity()));
      }

        Sale sale = new Sale(null, dto.getPrescriptionId(), LocalDateTime.now(), dto.getTotalAmount());
        sale = saleRepository.save(sale);
        saleItemService.createSaleItem(sale.getId(), dto.getSaleItems());
        return sale.getId();
    }

    @Override
    public void updateSale(SaleDTO dto) throws HmsException {
        Sale sale=  saleRepository.findById(dto.getId()).orElseThrow(()-> new HmsException("SALE_NOT_FOUND"));
        sale.setSaleDate(dto.getSaleDate());
        sale.setTotalAmount(dto.getTotalAmount());
        saleRepository.save(sale);
    }

    @Override
    public SaleDTO getSale(Long id) throws HmsException {
        return saleRepository.findById(id).orElseThrow(() -> new HmsException("SALE_NOT_FOUND")).toDTO();
    }

    @Override
    public SaleDTO getSaleByPrescriptionId(Long prescriptionId) throws HmsException {
        return saleRepository.findByPrescriptionId(prescriptionId).orElseThrow(() -> new HmsException("SALE_NOT_FOUND")).toDTO();
    }
}
