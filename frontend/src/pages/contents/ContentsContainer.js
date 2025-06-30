import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import S from './style';

const ContentsContainer = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const getTransformValue = (pathName) => {
    if(pathName == "/main/contents") {
      return 'translateX(0)'
    } else if(pathName == "/main/contents/mytree") {
      return 'translateX(100%)'
    } else {
      return 'translateX(200%)'
    }
  }

  return (
    <div>
      <S.TabBox>
          <S.TabContainer>
            <S.TabBtn style={{ transform: getTransformValue(pathName)}} />
            <S.TabText isSelected={pathName === "/main/contents"}>
              <Link to={"/main/contents"}>ACHIEVEMENT</Link>
            </S.TabText>
            <S.TabText isSelected={pathName === "/main/contents/mytree"}>
              <Link to={"mytree"}>MY TREE</Link>
            </S.TabText>
            <S.TabText isSelected={pathName === "/main/contents/point-shop"}>
              <Link to={"point-shop"}>POINT SHOP</Link>
            </S.TabText>
          </S.TabContainer>
        </S.TabBox>
        <Outlet />
    </div>
  );
};

export default ContentsContainer;