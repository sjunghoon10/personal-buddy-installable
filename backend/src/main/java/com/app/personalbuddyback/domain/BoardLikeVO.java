package com.app.personalbuddyback.domain;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
public class BoardLikeVO {
    private Long id;
    private Date boardLikeCreateDate;
    private Long boardId;
    private Long memberId;
}
