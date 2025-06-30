package com.app.personalbuddyback.domain;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class CalendarVO {
    private Long id;
    private String calendarTitle;
    private Integer calendarIndex;
    private Integer calendarIsGroup;
    private Long memberId;
}
