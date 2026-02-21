package com.hms.profile.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hms.profile.dto.DoctorDropdown;
import com.hms.profile.entity.Patient;

public interface PatientRepository extends CrudRepository<Patient, Long>{
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByAadharNo(String aadharNo);
    @Query("SELECT d.id AS id, d.name AS name FROM Patient d WHERE d.id IN ?1")
    List<DoctorDropdown> findAllPatientDropdownsByIds(List<Long> ids);
}
