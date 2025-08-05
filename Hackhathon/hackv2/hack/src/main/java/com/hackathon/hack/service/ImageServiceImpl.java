package com.hackathon.hack.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Base64;
import java.util.UUID;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ImageServiceImpl implements IImageService {
    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;
    public String saveFiles(MultipartFile file) throws IOException {
        File uploadDir = new File(UPLOAD_DIR);
        if(!uploadDir.exists()){
            uploadDir.mkdirs();
        }
        String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filepath = UPLOAD_DIR + uniqueName;
        File dest = new File(filepath);
        file.transferTo(dest);
        return filepath;
    }

    @Override
    public String multipartTobase(MultipartFile file) {
        try {
            byte[] base = file.getBytes();
            return Base64.getEncoder().encodeToString(base);
        }catch(IOException e){
            throw new RuntimeException("Dönüşüm hatası!!!",e);

        }
    }
}
