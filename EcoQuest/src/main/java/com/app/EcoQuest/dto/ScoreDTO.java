package com.app.EcoQuest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreDTO {

    private Long id;
    private String playerName;
    private int totalScore;
    private int totalQuestions;
}
