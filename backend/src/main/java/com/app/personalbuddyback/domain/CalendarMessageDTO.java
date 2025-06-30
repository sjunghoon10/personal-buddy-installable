package com.app.personalbuddyback.domain;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class CalendarMessageDTO {
    private Long calendarId;
    private String eventType;
    private String content;

}