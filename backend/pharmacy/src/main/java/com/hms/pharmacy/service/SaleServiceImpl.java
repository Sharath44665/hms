package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.SaleDTO;
import com.hms.pharmacy.entity.Sale;
import com.hms.pharmacy.exception.HmsException;
import com.hms.pharmacy.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {
    private final SaleRepository saleRepository;
    @Override
    public Long createSale(SaleDTO dto) throws HmsException {
        if(saleRepository.existsByPrescriptionId(dto.getPrescriptionId())){
            throw new HmsException("SALE_ALREADY_EXISTS");
        }
        dto.setSaleDate(LocalDateTime.now());
        return saleRepository.save(dto.toEntity()).getId();
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
