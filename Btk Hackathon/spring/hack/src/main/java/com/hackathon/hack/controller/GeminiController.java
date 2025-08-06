package com.hackathon.hack.controller;


import com.hackathon.hack.Dto.LangchainResponseDto;
import com.hackathon.hack.service.GeminiServiceImpl;
import com.hackathon.hack.service.ImageServiceImpl;
import com.hackathon.hack.service.LangchainServiceImpl;
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
    private final LangchainServiceImpl langchainService;

    @PostMapping("/analyze")
    public ResponseEntity<String> uploadFile(@RequestParam("files")MultipartFile file, @RequestHeader(value = "Accept-Language",defaultValue = "tr")String language) throws IOException {
        String base64image = imageService.multipartTobase(file);
        String response = geminiService.analyzedImage(base64image,language);
        LangchainResponseDto marketingDescription = langchainService.langChainPost(response,language);
        return ResponseEntity.ok(response);

    }
}
