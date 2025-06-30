import styled from 'styled-components';

const S = {};

S.PlaceWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
`;

S.PlaceRecommend = styled.div`
    width: 1421px;
    margin: 0 0 100px 0;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

S.PlaceList = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
`;

S.PlaceItem = styled.div`
    display: flex;
    align-items: center;
    padding: 22px;
    border-radius: 10px;
    width: 650px;
    height: 135px;
    position: relative;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
`;

S.PlaceHover = styled.div`
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 70%;
    background: #4CAF50;
    border-radius: 5px;
    opacity: 0;  // 기본 숨김
    transition: opacity 0.3s ease-in-out;

    ${S.PlaceItem}.active & {
        opacity: 1;  // active 클래스일 때만 보이게
    }
`;

S.PlaceItemImg = styled.img`
    width: 180px;
    height: 135px;
    object-fit: cover;
    border-radius: 10px;
    margin-left: 12px;

    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

S.PlaceInfo = styled.div`
    margin-left: 15px;
    flex: 1;
`;

S.PlaceDetails = styled.div`
    width: 680px;
    height: 520px;
    background-color: #f5f5f5;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    top: 0;
    bottom: 0;
`;

S.PlaceDetailsImg = styled.img`
    width: 90%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
`;

S.PlaceTitle1 = styled.h2`
    font-size: 24px;
    font-weight: 500;
    line-height: 35px;
    margin-bottom: 50px;
    margin-top: 100px;
`;


S.SubTitle = styled.span`
    font-size: 18px;
    font-weight: 300;
    color: #666;
    display: flex;
    margin: 0 0 13px 0;
`

S.MainTitle = styled.span`
    display: flex;
    font-size: 30px;
    font-weight: 700;
    color: #222;
    margin: 0 0 40px 0;
`

S.ItemTitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin : 0 0 12px 0;
`

S.ItemTitle = styled.span`
    font-size: 16px;
    font-weight: 500;
    margin: 0 6px 0 0;
`

S.ItemSubTitle = styled.span`
    font-size: 16px;
    font-weight: 300;
    margin: 0 0 0 6px;
`

export default S;
