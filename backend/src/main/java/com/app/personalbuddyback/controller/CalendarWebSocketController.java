package com.app.personalbuddyback.controller;

import com.app.personalbuddyback.domain.CalendarMessageDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CalendarWebSocketController {

    @MessageMapping("/calendar")
    @SendTo("/topic/calendar")
    public CalendarMessageDTO handleCalendarMessage(CalendarMessageDTO message) {
        System.out.println("Received WebSocket Message: " + message.getContent());

        // TODO: DB 연동시 이 자리에서 DB 반영 가능
        return message;  // 브로드캐스트
    }
}