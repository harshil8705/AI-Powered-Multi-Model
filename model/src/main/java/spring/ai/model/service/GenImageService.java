package spring.ai.model.service;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.stabilityai.StabilityAiImageModel;
import org.springframework.ai.stabilityai.api.StabilityAiImageOptions;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class GenImageService {

    private final StabilityAiImageModel imageModel;

    private static final Path STATIC_IMG_DIR =
            Paths.get("target/generated-images/");

    public GenImageService(StabilityAiImageModel imageModel) {

        this.imageModel = imageModel;

    }

    public String generateImage(String prompt) {

        ImageResponse response = imageModel.call(
                new ImagePrompt(
                        prompt,
                        StabilityAiImageOptions.builder()
                                .stylePreset("cinematic")
                                .N(1)
                                .height(512)
                                .width(512)
                                .build()
                )
        );

        String base64Image = response.getResult().getOutput().getB64Json();

        try {

            Files.createDirectories(STATIC_IMG_DIR);

        } catch (IOException e) {}

        String fileName = "img-" + UUID.randomUUID() + ".png";
        Path filePath  = STATIC_IMG_DIR.resolve(fileName);

        try (FileOutputStream fos = new FileOutputStream(filePath.toFile())) {

            byte[] decoded = Base64.getDecoder().decode(base64Image);
            fos.write(decoded);

        } catch (IOException e) {

            throw new IllegalStateException("Failed to write image", e);

        }

        return "/images/" + fileName;

    }

}
