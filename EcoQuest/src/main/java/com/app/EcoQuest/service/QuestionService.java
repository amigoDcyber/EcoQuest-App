package com.app.EcoQuest.service;

import com.app.EcoQuest.dto.QuestionDTO;
import com.app.EcoQuest.model.Question;
import com.app.EcoQuest.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    // Get all questions
    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get one question by id
    public Optional<QuestionDTO> getQuestionById(Long id) {
        return questionRepository.findById(id)
                .map(this::mapToDTO);
    }

    // Save a new question
    public QuestionDTO createQuestion(QuestionDTO dto) {
        Question question = mapToEntity(dto);
        Question saved = questionRepository.save(question);
        return mapToDTO(saved);
    }

    // Map entity to DTO
    private QuestionDTO mapToDTO(Question question) {
        return new QuestionDTO(
                question.getId(),
                question.getQuestionText(),
                question.getOptionA(),
                question.getOptionB(),
                question.getOptionC(),
                question.getOptionD(),
                question.getCorrectAnswer()
        );
    }

    // Map DTO to entity
    private Question mapToEntity(QuestionDTO dto) {
        Question question = new Question();
        question.setQuestionText(dto.getQuestionText());
        question.setOptionA(dto.getOptionA());
        question.setOptionB(dto.getOptionB());
        question.setOptionC(dto.getOptionC());
        question.setOptionD(dto.getOptionD());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        return question;
    }
}
