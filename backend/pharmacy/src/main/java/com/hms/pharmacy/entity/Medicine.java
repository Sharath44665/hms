package com.hms.pharmacy.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String dosage;
    private MedicineCategory category; // antibiotics, antivirals
    private MedicineType type; // tablet, syrup
    private String manufacturer;
    private Integer unitPrice;
    private LocalDateTime createdAt;

    public Medicine(Long id){
        this.id = id;
    }

}
