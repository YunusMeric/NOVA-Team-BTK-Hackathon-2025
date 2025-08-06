package com.hackathon.hack.service;

import com.hackathon.hack.Dto.LangchainResponseDto;

public interface LangChainService {
    public LangchainResponseDto langChainPost(String description,String language);
}
