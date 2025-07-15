package spring.ai.model.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(OllamaChatModel chatClient) {

        this.chatClient = ChatClient.create(chatClient);

    }

    public String getResponse(String promptText) {

        return chatClient.prompt(promptText).call().content();

    }

}
