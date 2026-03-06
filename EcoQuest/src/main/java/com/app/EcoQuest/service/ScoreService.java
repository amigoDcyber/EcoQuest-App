package com.app.EcoQuest.service;

import com.app.EcoQuest.dto.ScoreDTO;
import com.app.EcoQuest.model.Score;
import com.app.EcoQuest.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreRepository scoreRepository;

    // Submit a new score
    public ScoreDTO submitScore(ScoreDTO dto) {
        Score score = new Score();
        score.setPlayerName(dto.getPlayerName());
        score.setTotalScore(dto.getTotalScore());
        score.setTotalQuestions(dto.getTotalQuestions());
        Score saved = scoreRepository.save(score);
        return mapToDTO(saved);
    }

    // Get all scores
    public List<ScoreDTO> getAllScores() {
        return scoreRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Map entity to DTO
    private ScoreDTO mapToDTO(Score score) {
        return new ScoreDTO(
                score.getId(),
                score.getPlayerName(),
                score.getTotalScore(),
                score.getTotalQuestions()
        );
    }
}
