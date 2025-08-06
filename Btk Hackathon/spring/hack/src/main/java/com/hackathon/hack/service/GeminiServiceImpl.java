package com.hackathon.hack.service;

import com.hackathon.hack.Dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

import java.util.List;

@Service
public class GeminiServiceImpl implements IGeminiService {

    @Autowired
    private RestTemplate restTemplate;


    public String analyzedImage(String base64Image,String language){

        String prompt;
        if ("en".equalsIgnoreCase(language)) {
            prompt = "Create a detailed and SEO-friendly product description for an e-commerce site about this product. Write a natural text that does not sound like AI generated. Use proper paragraph structure and avoid special characters like stars.";
        } else {
            prompt = "Bu ürün özellikleri hakkında e-ticaret sitesinde ürün açıklaması kısmında gözükecek şekilde detaylı ve SEO uyumlu bir açıklama oluştur. Yapay zeka cevap veriyormuş gibi olmayan bir metin yaz. Paragraf yapısı düzgün olsun yıldız vb. karakterler kullanmamalısın.";
        }

        RequestInlineDataDto inlineDataDto = new RequestInlineDataDto("image/jpeg",base64Image);
    RequestPartDto text = new RequestPartDto(null,prompt); // Text metni oluşturduk.
    RequestPartDto image = new RequestPartDto(inlineDataDto,null);// Image oluştur.

    List<RequestPartDto> listpartdto = new ArrayList<>();
    listpartdto.add(text);
    listpartdto.add(image);

    RequestContentDto contentDto = new RequestContentDto();
    contentDto.setParts(listpartdto);

    List<RequestContentDto> listcntntdto = new ArrayList<>();
    listcntntdto.add(contentDto);

    RequestDto requestDto = new RequestDto();
    requestDto.setContents(listcntntdto);


    String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCYuw066hc-Zq-0y2irXIp_nVdSH7laWWs";
    ResponseDto response = restTemplate.postForObject(url,requestDto,ResponseDto.class);
    String description = response.getCandidates().get(0).getContent().getParts().get(0).getText();
    System.out.println(response);

    return description;





    }
}
