package com.hms.pharmacy.entity;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MedicineInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="medicine_id", nullable = false)
    private Medicine medicine;
    private String batchNo;
    private Integer quantity;
    private LocalDate expiryDate;
    private LocalDate addedDate;

    public MedicineInventoryDTO toDTO(){
        return new MedicineInventoryDTO(id,
                medicine != null?medicine.getId():null,
                batchNo, quantity,expiryDate, addedDate);
    }
}
