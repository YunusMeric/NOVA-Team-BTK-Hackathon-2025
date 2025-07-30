package com.hackathon.hack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestPartDto {

   private RequestInlineDataDto inline_data;
   private String text;
}
