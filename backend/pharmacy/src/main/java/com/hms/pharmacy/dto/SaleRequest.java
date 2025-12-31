package com.hms.pharmacy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleRequest {
    private Long prescriptionId;
    private Double totalAmount;
    private List<SaleItemDTO> saleItems;
}
