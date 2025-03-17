package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.enums.FileCategory;
import com.domi.ggmassetbackend.exceptions.DomiException;
import com.domi.ggmassetbackend.exceptions.FileException;
import com.domi.ggmassetbackend.utils.MiscUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class FileService {
    @Value("${domi.files.path}")
    private String folderPath;

    private String getCategoryFolder(FileCategory category) {
        return String.format("%s/%s", folderPath, category.name().toLowerCase());
    }

    private String getFilePath(FileCategory category, String fileName) {
        return String.format("%s/%s", getCategoryFolder(category), fileName);
    }

    public String createFile(FileCategory category, MultipartFile file) throws IOException {
        String id = MiscUtils.generateRandomStr(15, false);
        String originalFileName = file.getOriginalFilename();
        String ext = "";

        // 확장자가 있음
        if (originalFileName != null && originalFileName.contains(".")) {
            ext = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String path = getFilePath(category, id + ext);
        File serverFile = new File(path);
        file.transferTo(serverFile);

        return id + ext;
    }

    public File getFile(FileCategory category, String fileName) {
        String path = getFilePath(category, fileName);
        File file = new File(path);

        if (!file.exists()) {
            throw new FileException(FileException.Type.NOT_FOUND_FILE);
        }

        return file;
    }

    public void deleteFile(FileCategory category, String fileName) {
        File file = getFile(category, fileName);

        if (!file.delete())
            throw new FileException(FileException.Type.ERROR_FILE_DELETE);
    }

    public FileCategory getCategory(String name) {
        String formatName = name.substring(0, 1).toUpperCase() + name.substring(1);

        try {
            return FileCategory.valueOf(formatName);
        } catch (IllegalArgumentException e) {
            throw new FileException(FileException.Type.WRONG_CATEGORY);
        }
    }
}
