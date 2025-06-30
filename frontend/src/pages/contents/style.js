import styled, { css } from 'styled-components';
import { flexCenter, fontWeightBold, fontWeightMedium } from '../../globals/common';

const S = {};

S.TabBox = styled.div`
  ${flexCenter}
  margin-bottom: 95px;
  margin-top: 79px;
`;

S.TabContainer = styled.div`
  position: relative;
  width: 834px;
  height: 55px;
  background: #eeeeee;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0;
`;

S.TabBtn = styled.div`
  position: absolute;
  width: calc(100% / 3);
  height: 100%;
  background:${({ theme }) => theme.PALLETE.primary.mainGreen};
  border-radius: 30px;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
`;

S.TabText = styled.div`
  ${flexCenter}
  width: calc(100% / 3);
  height: 100%;
  z-index: 1;

  a {
    font-size: 20px;
    font-weight: ${({ isSelected }) => (isSelected ? `700` : `500`)};
    color: ${({ isSelected }) => (isSelected ? '#000' : '#999')};
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
`;

export default S;
