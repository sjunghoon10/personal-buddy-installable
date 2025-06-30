# Personal Buddy – 일정 공유 캘린더 설치형 웹 서비스

<br>

이 프로젝트는 팀 프로젝트 "Personal Buddy"를 누구나 직접 설치하고 실행할 수 있도록 정리한 설치형 웹 애플리케이션 입니다.  
AWS EC2와 Oracle ADB 환경에서 실행되며, 일정/초대/공유 기능이 포함된 협업 캘린더 시스템입니다.
<br>
<br>




## 기술 스택

### Backend
- Java 17, Spring Boot 3.x
- MyBatis, Oracle Autonomous Database (TNS + Wallet 기반)
- JWT, OAuth2 (Google / Naver / Kakao)
- REST API + Swagger

### Frontend
- React (Create React App)
- Axios, Styled-components

### DevOps / 배포
- AWS EC2 (Ubuntu 22.04)
- Oracle ADB + Wallet
- Nginx (정적 파일 서빙)
- Git, deploy.sh 자동 배포 스크립트

---

## 프로젝트 구조
```
personal-buddy-installable/
├── frontend/ # CRA 프론트엔드
│ ├── .env.example
│ ├── public/
│ ├── src/
│ └── build/ # npm run build 결과물
├── backend/ # Spring Boot 백엔드
│ └── application-example.yml
├── deploy.sh # 자동 배포 스크립트
├── .gitignore
└── README.md
```

## 설치 및 실행 가이드

### Oracle ADB 설정

1. Oracle Cloud에서 ADB 인스턴스를 생성합니다.
2. Wallet.zip을 다운로드하여 EC2 내 `/home/ubuntu/wallet/` 경로에 압축 해제합니다.
3. 백엔드 설정 파일 `application-prod.yml`에서 TNS 경로를 아래처럼 설정합니다.
    ```
    yaml
    spring.datasource.url=jdbc:oracle:thin:@your-db-name_high?TNS_ADMIN=/home/ubuntu/wallet
    ```
### GitHub에서 프로젝트 클론:
```
git clone https://github.com/your-id/personal-buddy-installable.git
cd personal-buddy-installable
```

### 환경 변수 파일 복사 및 설정
# 프론트엔드
```
cd frontend
cp .env.example .env   # 실제 값 입력
```

# 백엔드
```
cd ../backend
cp application-example.yml application-prod.yml   # 실제 값 입력
```
