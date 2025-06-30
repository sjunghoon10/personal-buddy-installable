import styled from "styled-components";
import {
  fontSizeH6,
  fontSizeH4,
  fontSizeH8,
  fontWeightMedium,
} from "../../../../globals/common";

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 123px;
`;

S.LocationContainer = styled.div`
  top: 100%;
  left: 0;
  padding-top: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

S.DailyButtonContainer = styled.div`
display: flex;
justify-content: end;
`;

S.WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-weight: 500;

  img {
    width: 24px;
    height: 24px;
  }
`;

S.TitleWord = styled.div`
  width: 100%;
  font-size: 24px;
  ${fontSizeH4};
`;

S.TitleWord = styled.div`
  width: 100%;
  font-size: 24px;
  ${fontSizeH4};
`;

S.MenuWord = styled.div`
  width: 100%;
  font-size: 14px;
  ${fontSizeH8};
`;

S.TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

S.Tab = styled.button`
  display: flex; 
  align-items: center; 
  justify-content: center;
  text-align: center;
  line-height: 33px;
  font-size: 16px;
  padding: 0 12px;
  height: 33px;
  color: #06c371;
  font-weight: ${fontWeightMedium};
  background-color: white;
  border: none;
  border-top-left-radius: 6.3px;
  border-top-right-radius: 6.3px;
  border-top: 1px solid #06c371;
  border-left: 1px solid #06c371;
  border-right: 1px solid #06c371;
  cursor: pointer;
  white-space: nowrap;

  &.selected {
    background-color: #06c371;
    color: #ffffff;
  }
`;

S.ItemWrapper = styled.div`

`;

S.ModifyButton = styled.img`
  background-color: white;
  padding: 4px;
  border-radius: 4px;
`;
S.DailyButtonWrapper = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #01cd74;
    color: #fff;
    width: 80px;
    height: 30px;
    border-radius: 30px;
    text-decoration: none;
    font-size: 16px;
    ${fontWeightMedium};

    &:hover {
      opacity: 0.9;
    }
  }
`;

S.DailyViewButton = styled.button`
  width: 100px;
  padding: 8px 12px;
  background: #01CD74;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

S.DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 1000;
`;

S.DropdownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export default S;
