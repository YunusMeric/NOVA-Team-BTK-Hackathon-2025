package com.hackathon.hack.controller;


import com.hackathon.hack.service.GeminiServiceImpl;
import com.hackathon.hack.service.ImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "http://localhost:3000")
public class GeminiController {

    private final ImageServiceImpl imageService;
    private final GeminiServiceImpl geminiService;

    @PostMapping("/analyze")
    public ResponseEntity<String> uploadFile(@RequestParam("files")MultipartFile file) throws IOException {
        String base64image = imageService.multipartTobase(file);
        String response = geminiService.analyzedImage(base64image);
        return ResponseEntity.ok(response);

    }
}
