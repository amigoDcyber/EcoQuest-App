package com.app.EcoQuest.controller;

import com.app.EcoQuest.dto.ScoreDTO;
import com.app.EcoQuest.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ScoreController {

    private final ScoreService scoreService;

    // POST /api/scores - submit a score
    @PostMapping
    public ResponseEntity<ScoreDTO> submitScore(@RequestBody ScoreDTO dto) {
        return ResponseEntity.ok(scoreService.submitScore(dto));
    }

    // GET /api/scores - get all scores
    @GetMapping
    public ResponseEntity<List<ScoreDTO>> getAllScores() {
        return ResponseEntity.ok(scoreService.getAllScores());
    }
}
