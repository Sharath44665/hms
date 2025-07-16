package com.hms.user.UserMS.service;

import com.hms.user.UserMS.dto.UserDTO;
import com.hms.user.UserMS.exception.HmsException;

public interface UserService {
    public void registerUser(UserDTO userDTO) throws HmsException;
    public UserDTO loginUser(UserDTO userDTO) throws HmsException;
    public UserDTO getByUserId(Long id) throws HmsException;
    public void updateUser(UserDTO userDTO);
    public UserDTO getUser(String email) throws HmsException;
}
