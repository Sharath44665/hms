package com.hms.user.UserMS.api;

import com.hms.user.UserMS.dto.ResponseDTO;
import com.hms.user.UserMS.dto.UserDTO;
import com.hms.user.UserMS.exception.HmsException;
import com.hms.user.UserMS.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Validated
@CrossOrigin
public class UserAPI {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws HmsException {
        userService.registerUser(userDTO);
        return new ResponseEntity<>(new ResponseDTO("Account created"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserDTO userDTO) throws HmsException {
        return new ResponseEntity<>(userService.loginUser(userDTO),HttpStatus.OK);
    }

}
