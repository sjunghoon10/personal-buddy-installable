# backend/Dockerfile

FROM eclipse-temurin:17-jdk
ENV TZ=Asia/Seoul

WORKDIR /app

COPY build/libs/personal-buddy-back-1.0.jar app.jar
COPY src/main/resources/tns /app/tns

ENTRYPOINT ["java", "-Doracle.net.tns_admin=/app/tns", "-jar", "app.jar"]
