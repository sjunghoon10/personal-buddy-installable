import styled, { keyframes } from "styled-components";
import { blackColor, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightRegular, gray5Color, mainGreenColor, whiteColor } from "../../../globals/common";

const S = {};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

S.Backdrop = styled.div`
  animation: ${fadeInUp} 0.1s ease-out;
  position: fixed;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

S.ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  width: 400px;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  ${fontSizeH8}
`

S.TitleContainer = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
  ${whiteColor}
  height: 40px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

S.Title = styled.div`
  margin: 0;
`;

S.CloseButton = styled.img`
  cursor: pointer;
`;

S.TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 25px 5px 25px;
`;

S.SelectBox = styled.select`
  &:focus {
    outline: none;
  }
  width: 100px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  ${fontSizeH8}
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({$memberId, $profileMemberId}) =>
    $memberId === $profileMemberId ? "240px" : "350px"
  };
  height: 30px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
  border-radius: 5px;
`;

S.SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  padding-left: 8px;
`

S.SearchInput = styled.textarea`
  border: none;
  font: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  ${fontSizeH8}
  ${fontWeightRegular}
  width: 100%;
  height: 100%;
  padding: 6px;
  border-radius: 5px;
`

S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  padding-bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`

S.ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 0 25px;
  cursor: pointer;
  transition: 0.18s;
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.gray.gray2}
  }
`

S.MemberInfoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

S.MemberImg = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
  }
`

S.MemberInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 2px;
  padding-left: 8px;
`

S.MemberStatusContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
`

S.MemberNickName = styled.span`
  ${fontSizeH8}
  ${blackColor}
  ${fontWeightRegular}
`

S.MemberStatusFollow = styled.span`
  ${fontSizeH9}
  ${mainGreenColor}
  ${fontWeightRegular}
`

S.MemberFavoriteImg = styled.img`
  width: 14px;
  height: 13px;
  position: relative;
  top: -1px;
`

S.MemberStatusMessage = styled.span`
  ${fontSizeH9}
  ${gray5Color}
  ${fontWeightRegular}
`

S.UnFollowBtn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.PALLETE.gray.gray5};
  ${whiteColor}
  ${fontWeightBold}
  ${fontSizeH8}
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.pointRed};
  }
`

S.ProfileCardDropdown = styled.div`
    position: fixed;
    z-index: 10003;
`;

S.CardBG = styled.div`
    position: fixed;
    left: 0;
    top : 0;
    width: 100vw;
    height: 100vh;
    z-index: 10002;
`

export default S;