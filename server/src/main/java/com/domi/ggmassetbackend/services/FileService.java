package com.domi.ggmassetbackend.services;

import com.domi.ggmassetbackend.data.enums.FileCategory;
import com.domi.ggmassetbackend.exceptions.DomiException;
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
            throw new DomiException("FILE0", "파일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        return file;
    }

    public void deleteFile(FileCategory category, String fileName) {
        File file = getFile(category, fileName);

        if (!file.delete())
            throw new DomiException("FILE1", "파일 삭제에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
