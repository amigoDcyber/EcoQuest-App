package com.app.EcoQuest.config;

import com.app.EcoQuest.model.Question;
import com.app.EcoQuest.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final QuestionRepository questionRepository;

    @Override
    public void run(String... args) {

        // Only seed if table is empty
        if (questionRepository.count() == 0) {
            List<Question> questions = List.of(
                new Question(null,
                    "What colour bin is commonly used for recycling?",
                    "Red", "Blue", "Black", "Purple", "B"),

                new Question(null,
                    "Which of these helps reduce plastic waste?",
                    "Using reusable bags", "Throwing plastic in rivers",
                    "Burning plastic", "Using more plastic bottles", "A"),

                new Question(null,
                    "What does recycling do?",
                    "Destroys the planet", "Turns waste into new products",
                    "Creates more rubbish", "Uses more plastic", "B"),

                new Question(null,
                    "Which energy source is renewable?",
                    "Coal", "Oil", "Wind", "Gas", "C"),

                new Question(null,
                    "Turning off lights when leaving a room helps save?",
                    "Water", "Electricity", "Food", "Plastic", "B"),

                new Question(null,
                    "Which item is usually recyclable?",
                    "Plastic bottle", "Banana peel",
                    "Used tissue", "Dirty napkin", "A"),

                new Question(null,
                    "Trees help the planet by?",
                    "Cleaning the air", "Making pollution",
                    "Destroying oxygen", "Heating the earth", "A"),

                new Question(null,
                    "What should you do with trash?",
                    "Throw it anywhere", "Leave it on the ground",
                    "Put it in a bin", "Drop it in the street", "C"),

                new Question(null,
                    "Riding a bicycle instead of a car helps?",
                    "Increase pollution", "Reduce pollution",
                    "Waste energy", "Create smoke", "B"),

                new Question(null,
                    "Which of these saves water?",
                    "Leaving taps running", "Taking shorter showers",
                    "Washing cars every day", "Playing with water", "B")
            );

            questionRepository.saveAll(questions);
            System.out.println("10 questions seeded successfully!");
        }
    }
}
