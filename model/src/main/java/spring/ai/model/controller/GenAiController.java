package spring.ai.model.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spring.ai.model.service.ChatService;
import spring.ai.model.service.GenImageService;
import spring.ai.model.service.GenerateRecipeService;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class GenAiController {

    private final ChatService chatService;
    private final GenImageService imageService;
    private final GenerateRecipeService recipeService;

    public GenAiController(ChatService chatService, GenImageService imageService, GenerateRecipeService recipeService) {

        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;

    }

    @GetMapping("/ask-ai")
    public ResponseEntity<Map<String, String>> getResponse(@RequestParam(defaultValue = "whats up?") String prompt) {

        String response = chatService.getResponse(prompt);

        return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.OK);

    }

    @GetMapping("/generate-image")
    public ResponseEntity<Map<String, String>> generateImage(@RequestParam(defaultValue = "Generate image of cute cat sitting on the huge tree house build upon the tree.") String prompt) {

        String publicUrl = imageService.generateImage(prompt);

        return new ResponseEntity<>(Collections.singletonMap("imageUrl", publicUrl), HttpStatus.OK);

    }

    @GetMapping("/generate-recipe")
    public ResponseEntity<Map<String, String>> generateRecipe(
            @RequestParam String ingredients,
            @RequestParam(defaultValue = "any") String cuisine,
            @RequestParam(defaultValue = "") String dietRestrictions
    ) {

        String generatedRecipe = recipeService.getResponse(ingredients, cuisine, dietRestrictions);

        return new ResponseEntity<>(Collections.singletonMap("generatedRecipe", generatedRecipe), HttpStatus.OK);

    }

}
