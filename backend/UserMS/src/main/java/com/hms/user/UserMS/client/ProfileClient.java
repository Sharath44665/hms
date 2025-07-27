package com.hms.user.UserMS.client;

import com.hms.user.UserMS.config.FeignClientInterceptor;
import com.hms.user.UserMS.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ProfileMs", configuration = FeignClientInterceptor.class)
public interface ProfileClient {
    @PostMapping("/profile/doctor/add")
    Long addDoctor(@RequestBody UserDTO userDTO);
    @PostMapping("/profile/patient/add")
    Long addPatient(@RequestBody UserDTO userDTO);

}
