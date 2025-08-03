package com.hackathon.hack.service;

import com.hackathon.hack.Dto.LangchainRequestDto;
import com.hackathon.hack.Dto.LangchainResponseDto;
import com.hackathon.hack.Dto.RequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class LangchainServiceImpl {


    @Autowired
    private RestTemplate restTemplate;

    public LangchainResponseDto langChainPost(String description) {
        String url = "http://localhost:8000/generate-marketing";
        LangchainRequestDto requestDto = new LangchainRequestDto();
        requestDto.setDescription(description);
        try{
        LangchainResponseDto langchainResponseDto = restTemplate.postForObject(url,requestDto,LangchainResponseDto.class);
        return langchainResponseDto;
    }catch(Exception e){
        e.printStackTrace();
        throw e;
        }
    }
}
