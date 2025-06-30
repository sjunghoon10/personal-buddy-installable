import styled from 'styled-components';
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightBold,
  fontWeightRegular,
} from '../../../../globals/common';

const S = {};

// 전체 이벤트 배너 영역
S.EventWrapper = styled.div`

`;

// 소제목 (예: BUDDYGROUND)
S.SubTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
    color: #666;
    padding-bottom: 3px;
    margin: 0 0 6px 0;
`;

// 메인 타이틀 (예: 진행중인 이벤트)
S.MainTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #222;
  margin-top: 1px;
  text-align: left;
  padding-bottom: 55px;
`;

// Swiper 전체 wrapper
S.BannerSliderWrapper = styled.div`
  width: 1400px;
  overflow: visible !important;
`;

// 배너 카드 1장
S.BannerCard = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 680px !important;
  height: 450px !important;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 100%;
  }
`;


export default S;
