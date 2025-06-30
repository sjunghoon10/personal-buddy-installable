package com.app.personalbuddyback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-calendar") // 클라이언트가 연결할 엔드포인트
                .setAllowedOriginPatterns("*") // 배포시 도메인 제한 가능
                .withSockJS(); // 브라우저 호환성 위해 SockJS 사용
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // 구독 채널
        registry.setApplicationDestinationPrefixes("/app"); // 클라이언트 메시지 전송 prefix
    }
}