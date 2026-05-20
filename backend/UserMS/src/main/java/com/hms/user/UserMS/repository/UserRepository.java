package com.hms.user.UserMS.repository;

import com.hms.user.UserMS.dto.MonthlyRoleCountDTO;
import com.hms.user.UserMS.dto.Roles;
import com.hms.user.UserMS.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    @Query("SELECT new com.hms.user.UserMS.dto.MonthlyRoleCountDTO(CAST(FUNCTION('MONTHNAME', a.createdAt)as String) , COUNT(a)) FROM User a WHERE a.role=?1 AND YEAR(a.createdAt)=YEAR(CURRENT_DATE) GROUP BY FUNCTION('MONTH', a.createdAt), CAST(FUNCTION('MONTHNAME', a.createdAt)as String) ORDER BY FUNCTION('MONTH', a.createdAt)")
    List<MonthlyRoleCountDTO> countRegistrationByRoleGroupedByMonth(Roles role);
}
