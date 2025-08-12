package com.hms.pharmacy.dto;

import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.entity.MedicineCategory;
import com.hms.pharmacy.entity.MedicineType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineDTO {
    private Long id;
    private String name;
    private String dosage;
    private MedicineCategory category; // antibiotics, antivirals
    private MedicineType type; // tablet, syrup
    private String manufacturer;
    private Integer unitPrice;
    private Integer stock;
    private LocalDateTime createdAt;

    public Medicine toEntity(){
        return new Medicine(id, name, dosage, category, type, manufacturer, unitPrice, stock, createdAt );
    }
}
