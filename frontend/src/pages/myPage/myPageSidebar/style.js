import styled from 'styled-components';
import { blackColor, fontSizeH6, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightMedium, fontWeightRegular, gray5Color, mainGreenColor, whiteColor } from '../../../globals/common';

const S = {};

S.MyPageMemberProfile = styled.div`
    display: flex;
    width: 200px;
    height: 200px;
`

S.MyPageMemberProfileImg = styled.img`
    object-fit: cover;
    width: 200px;
    height: 200px;
`

S.MyPageMemberInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px ${({ theme }) => theme.PALLETE.gray.gray2};
    width: 198px;
    position: relative;
`

S.MyPageMemberInfoNickName = styled.div`
    font-size: 18px;
    flex-shrink: 0;
    font-weight: 500;
    color: #222;
    text-align: center;
    margin-top: 30px;
    width: 140px;
    cursor: pointer;
    white-space: nowrap;  
    overflow: hidden;          
    text-overflow: ellipsis; 
`

S.MyPageMemberInfoStatusMessage = styled.div`
    ${fontSizeH9}
    ${gray5Color}
    ${fontWeightRegular}
    margin-top: 10px;
    text-align: center;
    width: 140px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
`

S.MyPageMemberInfoFollowContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 190px;
    margin: 20px 0;
    ${gray5Color}
    ${fontSizeH8}
    ${fontWeightBold}
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    & span {
        font-size: 13px;
        font-weight: 300;
    }

    & .point {
        font-weight: 500;
    }
`

S.MyPageMemberInfoFollow = styled.div`
    display: flex;
    margin: 0 5px;
    cursor: pointer;
`

S.MyPageMemberInfoFollowCount = styled.div`
    ${mainGreenColor};
    margin-left: 2px;
    cursor: pointer;
`

S.MyPageTapContainer = styled.div`
    width: 198px;
    border: solid 1px ${({ theme }) => theme.PALLETE.gray.gray2};
    border-top: none;
    a {
        text-decoration: none;
        ${blackColor};
        &.active {
            ${mainGreenColor};
        }
    }
`

S.MyPageTitleContainer = styled.div`
    padding: 20px 20px 10px 20px;
    ${fontSizeH6}
    ${fontWeightMedium}
`

S.MyPageTitleIcon = styled.div`
    margin-right: 5px;
`

S.MyPageTitle = styled.div`
    display: flex;
    align-items: center;

    & span {
        font-size: 16px;
        flex-shrink: 0;
        font-weight: 500;
        color: #222;
    }

`

S.MyPageSubTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 24px;
    ${fontSizeH8}
    ${fontWeightRegular}

    .active span {
        color : #01CD74;
        font-size: 14px;
        font-weight: 500;
    }

    & span {
        color : #222;
        font-size: 14px;
        font-weight: 300;
    }
`

S.MyPageButtonContainer = styled.div`
    width: 200px;
    height: 40px;
`

S.FollowBtn = styled.button`
    width: 50%;
    height: 100%;
    border: none;
    ${whiteColor}
    ${fontSizeH8}
    background-color: ${({ $isFollow, theme }) => 
        $isFollow === 1 ? theme.PALLETE.gray.gray4 : theme.PALLETE.primary.mainGreen
    };
`

S.MessageBtn = styled.button`
    width: 50%;
    height: 100%;
    border: none;
    background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    ${whiteColor}
    ${fontSizeH8}
`

//------------------------ [ 드롭다운 스타일 ]
S.ProfileCardDropdown = styled.div`
  position: fixed;
  z-index: 11000;
`;

//------------------------ [ 카드 백그라운드 스타일 ]
S.CardBG = styled.div`
  position: fixed;
  left: 0;
  top : 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
`

export default S;