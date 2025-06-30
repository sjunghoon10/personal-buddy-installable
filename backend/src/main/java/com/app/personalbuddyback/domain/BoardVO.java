package com.app.personalbuddyback.domain;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Data
@Component
public class BoardVO {
    private Long id;
    private String boardTitle;
    private String boardContent;
    private int boardContentViews;
    private Date boardContentCreateDate;
    private Date boardContentUpdateDate;
    private String boardHashtag;
    private Long memberId;
    // 이미지 수정용: 삭제할 이미지 이름들
    private List<String> removedImageNames;

}
