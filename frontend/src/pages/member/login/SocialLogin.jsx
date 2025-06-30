import React from "react";
import S from "./style";

const SocialLogin = () => {
  // 소셜 로그인
  const navigateGoogleAuth = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`;
  };
  const navigateKaKaoAuth = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/kakao`;
  };
  const navigateNaverAuth = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/naver`;
  };

  return (
    <S.ButtonWrapper>
      <S.SocialButton onClick={navigateKaKaoAuth}>
        <img src="/assets/images/member/kakao-logo.png" alt="Kakao" />
        카카오 계정으로 로그인
      </S.SocialButton>
      <S.SocialButton onClick={navigateNaverAuth}>
        <img src="/assets/images/member/naver-logo.png" alt="naver" />
        네이버 계정으로 로그인
      </S.SocialButton>
      <S.SocialButton onClick={navigateGoogleAuth}>
        <img src="/assets/images/member/google-logo.png" alt="google" />
        구글 계정으로 로그인
      </S.SocialButton>
    </S.ButtonWrapper>
  );
};

export default SocialLogin;
