package com.hms.pharmacy.entity;

import com.hms.pharmacy.dto.SaleItemDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", nullable = false)
    private Medicine medicine;
    private String batchNo;
    private Integer quantity;
    private Double unitPrice;

    public SaleItemDTO toDTO() {
        return new SaleItemDTO(id,
                sale != null ? sale.getId() : null,
                medicine != null ? medicine.getId() : null,
                batchNo, quantity, unitPrice);
    }

}
