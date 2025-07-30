package com.hackathon.hack.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IImageService {
    public String saveFiles(MultipartFile file) throws IOException;

    public String multipartTobase(MultipartFile file);
}
