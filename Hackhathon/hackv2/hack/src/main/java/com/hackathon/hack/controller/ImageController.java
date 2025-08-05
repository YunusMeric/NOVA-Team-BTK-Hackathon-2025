package com.hackathon.hack.controller;


import com.hackathon.hack.service.ImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageServiceImpl imageService;

    @PostMapping("/upload")
    public ResponseEntity<String>uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
        String filepath = imageService.saveFiles(file);
        return ResponseEntity.ok("Dosya başarı bir şekilde yüklendi." + filepath);

    }
}
