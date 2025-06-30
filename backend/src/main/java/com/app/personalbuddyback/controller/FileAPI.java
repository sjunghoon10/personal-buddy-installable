package com.app.personalbuddyback.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/files/api")
public class FileAPI {

    // EC2 서버 경로
    private final String basePath = "/home/ubuntu/Personal_Buddy/";

    private String getDatePath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @PostMapping("/files-upload")
    public ResponseEntity<Map<String, Object>> uploadFiles(@RequestParam("imgFiles") List<MultipartFile> imgFiles,
                                                           @RequestParam("dataType") String dataType) throws IOException {
        String filePath = "images/" + dataType + "/" + getDatePath();
        Map<String, Object> response = new HashMap<>();
        List<String> uuids = new ArrayList<>();
        List<String> fileNames = new ArrayList<>();
        File file = new File(basePath + filePath);

        if (!file.exists()) {
            file.mkdirs();
        }

        for (int i = 0; i < imgFiles.size(); i++) {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + "_" + imgFiles.get(i).getOriginalFilename();
            uuids.add(uuid);
            fileNames.add(fileName);

            File dest = new File(file, fileName);
            imgFiles.get(i).transferTo(dest);

            if (imgFiles.get(i).getContentType() != null && imgFiles.get(i).getContentType().startsWith("image")) {
                try (FileOutputStream out = new FileOutputStream(new File(file, "t_" + fileName))) {
                    Thumbnailator.createThumbnail(imgFiles.get(i).getInputStream(), out, 100, 100);
                }
            }
        }

        response.put("filePath", filePath);
        response.put("fileNames", fileNames);
        response.put("message", "upload success");
        log.info("Uploaded to: {}", filePath);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/file-upload")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("imgFile") MultipartFile imgFile,
                                                          @RequestParam("dataType") String dataType) throws IOException {
        String filePath = "images/" + dataType;
        File dir = new File(basePath + filePath);
        Map<String, Object> response = new HashMap<>();

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + "_" + imgFile.getOriginalFilename();
        File dest = new File(dir, fileName);
        imgFile.transferTo(dest);

        if (imgFile.getContentType() != null && imgFile.getContentType().startsWith("image")) {
            File thumbnailFile = new File(dir, "t_" + fileName);
            Thumbnails.of(imgFile.getInputStream()).size(100, 100).toFile(thumbnailFile);
        }

        response.put("filePath", filePath);
        response.put("fileName", fileName);
        response.put("memberImgPath", filePath); // 상대경로 반환
        response.put("message", "upload success");

        log.info("Single upload to: {}", filePath);
        return ResponseEntity.ok(response);
    }

    @ResponseBody
    @GetMapping("/display")
    public byte[] displayImg(@RequestParam("filePath") String filePath,
                             @RequestParam("fileName") String fileName) throws IOException {
        Path fullPath = filePath.startsWith("/") ?
                Paths.get(filePath, fileName) :
                Paths.get(basePath, filePath, fileName);

        return FileCopyUtils.copyToByteArray(fullPath.toFile());
    }
}
