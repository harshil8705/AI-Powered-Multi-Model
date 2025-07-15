package spring.ai.model.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GenerateRecipeService {

    private final ChatClient chatClient;

    public GenerateRecipeService(OllamaChatModel chatClient) {

        this.chatClient = ChatClient.create(chatClient);

    }

    public String getResponse(String ingredients, String cuisine, String dietRestrictions) {

        var template = """
                I want to create a recipe using the following ingredients : {ingredients}.
                The cuisine type I prefer is : {cuisine}.
                Please consider the following diet restrictions for me : {dietRestrictions}.
                Please provide me the detailed recipe including title, list of ingredients, and cooking instructions.
                And please generate the response in the simple and understandable english which is used in india.
                Give response in the simple and sober manner and not to use any complicated words strictly stick to the simple indian english and generate your response.
                """;

        PromptTemplate promptTemplate = new PromptTemplate(template);

        Map<String, Object> params = Map.of(
                "ingredients", ingredients,
                "cuisine", cuisine,
                "dietRestrictions", dietRestrictions
        );

        Prompt prompt = promptTemplate.create(params);

        return chatClient.prompt(prompt).call().content();

    }

}
