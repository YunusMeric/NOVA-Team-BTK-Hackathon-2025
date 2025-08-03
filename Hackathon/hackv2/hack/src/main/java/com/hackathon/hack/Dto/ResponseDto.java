package com.hackathon.hack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ResponseDto {
    List<ResponseCandidateDto> candidates;
    private String modelVersion;
    private String responseId;
}
