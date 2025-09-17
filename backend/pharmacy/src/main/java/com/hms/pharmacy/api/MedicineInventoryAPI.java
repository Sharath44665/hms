package com.hms.pharmacy.api;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.exception.HmsException;
import com.hms.pharmacy.service.MedicineInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/pharmacy/inventory")
@RequiredArgsConstructor
public class MedicineInventoryAPI {
    private final MedicineInventoryService medicineInventoryService;

    @PostMapping("/add")
    public ResponseEntity<MedicineInventoryDTO> addMedicine(@RequestBody MedicineInventoryDTO medicineDTO) throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.addMedicine(medicineDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<MedicineInventoryDTO> updateMedicine(@RequestBody MedicineInventoryDTO medicineDTO) throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.updateMedicine(medicineDTO),HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MedicineInventoryDTO> getById(@PathVariable Long id) throws HmsException {
        return new ResponseEntity<>(medicineInventoryService.getMedicineById(id), HttpStatus.OK);
    }

   @GetMapping("/getAll")
    public ResponseEntity<List<MedicineInventoryDTO>> getAllMedicineInventory() throws HmsException{
        return new ResponseEntity<>(medicineInventoryService.getAllMedicines(), HttpStatus.OK);
   }
}
