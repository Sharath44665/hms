package com.hms.media.repository;

import org.springframework.data.repository.CrudRepository;

import com.hms.media.entity.MediaFile;

public interface MediaFileRepository extends CrudRepository<MediaFile, Long> {
    
}
