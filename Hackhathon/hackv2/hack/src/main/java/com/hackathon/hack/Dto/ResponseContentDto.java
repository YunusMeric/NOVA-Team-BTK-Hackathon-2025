package com.hackathon.hack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseContentDto {

    List<ResponsePartDto> parts;
    private String role;
}











