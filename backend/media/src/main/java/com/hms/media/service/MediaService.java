package com.hms.media.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.hms.media.dto.MediaFileDTO;
import com.hms.media.entity.MediaFile;

public interface MediaService {
    MediaFileDTO storeFile(MultipartFile file) throws IOException;
    public Optional<MediaFile> getFile(Long id);
    
}
