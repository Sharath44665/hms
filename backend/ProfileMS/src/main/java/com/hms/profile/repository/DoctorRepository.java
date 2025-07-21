package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hms.profile.entity.Doctor;

public interface DoctorRepository extends CrudRepository<Doctor, Long>{
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNo(String licenseNo);
}
