package com.domi.ggmassetbackend.controllers;

import com.domi.ggmassetbackend.data.enums.FileCategory;
import com.domi.ggmassetbackend.services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@RequestMapping("/files")
@RestController
public class FileController {
    private final FileService fileService;

    @GetMapping("/{mode}/{name}")
    public ResponseEntity<Resource> getDownloadFile(@PathVariable String mode, @PathVariable String name) {
        FileCategory category = fileService.getCategory(mode);
        File file = fileService.getFile(category, name);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"");

        FileSystemResource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .headers(headers)
                .cacheControl(CacheControl.maxAge(1, TimeUnit.DAYS))
                .body(resource);
    }
}
