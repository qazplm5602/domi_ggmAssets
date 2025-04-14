package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.entity.Thumbnail;
import com.domi.ggmassetbackend.data.enums.FileCategory;
import com.domi.ggmassetbackend.data.enums.ThumbnailType;
import com.domi.ggmassetbackend.exceptions.ThumbnailException;
import com.domi.ggmassetbackend.repositories.ThumbnailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class ThumbnailService {
    private final int MAX_PROCESS_COUNT = 10; // 썸네일 최대 3개까지만 동시 처리
    private final FileService fileService;
    private final ThumbnailRepository thumbnailRepository;

    public List<Thumbnail> imageSave(List<Thumbnail> thumbnails) throws InterruptedException {
        Semaphore semaphore = new Semaphore(MAX_PROCESS_COUNT);
        ExecutorService executor = Executors.newFixedThreadPool(MAX_PROCESS_COUNT);

        List<Thumbnail> result = new ArrayList<>();
        for (int i = 0; i < thumbnails.size(); i++) {
            result.add(null); // 갯수 만큼 자리좀...
        }

        for (int i = 0; i < thumbnails.size(); i++) {
            final int index = i;

            executor.submit(() -> {
                try {
                    semaphore.acquire();
//                    System.out.println("Executing task " + index + " by thread " + Thread.currentThread().getName());

                    Thumbnail loadImage = imageDownloadApply(thumbnails.get(index));

//                    System.out.println("Task " + index + " completed by thread " + Thread.currentThread().getName());

                    result.set(index, loadImage);
//                    result.add(loadImage);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                } finally {
                    // 작업이 끝나면 세마포어를 반환하여 다른 작업을 실행할 수 있도록 함
                    semaphore.release();
                }
            });
        }

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);

        return result;
    }

    Thumbnail imageDownloadApply(Thumbnail thumbnail) throws IOException, URISyntaxException {
        String contentUrl = thumbnail.getContentUrl();
        String previewUrl = thumbnail.getPreviewUrl();

        previewUrl = getImageByUrl(previewUrl);
        if (thumbnail.getType() == ThumbnailType.Image) { // 유튭은 content가 youtube url 임
            contentUrl = getImageByUrl(contentUrl);
        }

        return new Thumbnail(null, thumbnail.getType(), contentUrl, previewUrl, thumbnail.getSort());
    }

    String getImageByUrl(String imageUrl) throws IOException, URISyntaxException {
        URL url = null;
        InputStream in = null;
        OutputStream out = null;

        // 생략 되어있는 url
        if (!imageUrl.startsWith("http")) {
            imageUrl = "http:" + imageUrl;
        }

        String fileName = fileService.generateFileName(imageUrl);

        try {
            url = new URI(imageUrl).toURL();
            in = url.openStream();
            out = fileService.getFileStream(FileCategory.Thumbnail, fileName);

            while (true) {
                int data = in.read();

                if (data == -1) {
                    break;
                }

                out.write(data);
            }
        } finally {
            if (in != null) {
                in.close();
            }

            if (out != null) {
                out.close();
            }
        }

        return fileName;
    }

    Thumbnail getThumbnailById(UUID id) {
        return thumbnailRepository.findById(id).orElseThrow(() -> new ThumbnailException(ThumbnailException.Type.NOT_FOUND));
    }

    Thumbnail getThumbnailByIdWithLock(UUID id) {
        return thumbnailRepository.findByIdWithLock(id).orElseThrow(() -> new ThumbnailException(ThumbnailException.Type.NOT_FOUND));
    }

    void setThumbnailContentUrl(UUID id, String url) {
        thumbnailRepository.updateContentUrl(id, url);
    }

    void setThumbnailPreviewUrl(UUID id, String url) {
        thumbnailRepository.updatePreviewUrl(id, url);
    }

    Thumbnail save(Thumbnail thumbnail) {
        return thumbnailRepository.save(thumbnail);
    }
}
