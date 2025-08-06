package com.hackathon.hack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCandidateDto {
    String finishReason;
    int index;
    ResponseContentDto content;
}
