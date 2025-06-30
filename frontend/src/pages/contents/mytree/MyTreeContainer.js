import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import S from './style';
import { useSelector } from 'react-redux';
import Sticker from './display/Sticker';
import ConfirmModal from '../../layout/modal/ConfirmModal';
import 'aos/dist/aos.css';
import AOS from "aos";

const MyTreeContainer = () => {
  
    const location = useLocation();
    const pathName = location.pathname;

    // 로그인된 유저정보
    const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;
    const [memberItems, setMemberItems] = useState([]);
    const [memberCustomizingList, setMemberCustomizingList] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSaveOkModal, setShowSaveOkModal] = useState(false);

  //   // 서버에 요청한 회원의 나무 적용 정보
    const [memberAppliedItemBackground, setMemberAppliedItemBackground] = useState({});
    const [memberAppliedItemTree, setMemberAppliedItemTree] = useState({});
    const [memberAppliedItemsSticker, setMemberAppliedItemSticker] = useState([]);

    const backgroundRef = useRef(null);

  const getSeleted = (pathName) => {
    if(pathName == "/main/contents/mytree") {
      return 'all'
    } else if(pathName == "/main/contents/mytree/background") {
      return 'background'
    } else if(pathName == "/main/contents/mytree/sticker"){
      return 'sticker'
    } else if(pathName == "/main/contents/mytree/tree"){
      return 'tree'
    }
  }

  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 500,
      once: true,
    })
    window.scrollTo(0, 0);

    const getItems = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/list`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "memberId": memberId,
          "itemType": null
        })
      })

      const data = await response.json();
      setMemberItems(data.memberTreeItemList);
    }

    const getAppliedItems = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/list/applied/${memberId}`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json();

      data.memberAppliedTrees.map((item) => {
        switch(item.itemType){
          case "스티커":
            setMemberAppliedItemSticker(prev => [...prev, item])
            break;
          case "배경":
            setMemberAppliedItemBackground(item);
            break;
          case "나무":
            setMemberAppliedItemTree(item);
            break;
        }
      })
    }

    const getCustomizingList = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/customizing-list/${memberId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json();
        setMemberCustomizingList(data.memberCustomizingList);
    }

    getItems();
    getAppliedItems();
    getCustomizingList();
  }, [memberId])

  const handleSave = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/edit`,{
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberCustomizingList)
    })

    const data = await response.json();
    setShowConfirmModal(false);
    setShowSaveOkModal(true);
  }

  // 컨펌 모달 상태를 변경하는 함수
  const handleConfirmModal = (state) => {
      setShowConfirmModal(state)
  }

  // 컨펌 모달 상태를 변경하는 함수
  const handleSaveOkModal = (state) => {
      setShowSaveOkModal(state)
  }

  return (
    <div>
      <S.SubTitle data-aos="fade-down-right">언젠가는 아름다워질 나의 나무</S.SubTitle>
      <S.MainTitle data-aos="fade-down-right">나의 성장 나무 🌳</S.MainTitle>
      {/* 전체 나무 요소 Wrapper */}
      <S.MyTreeWrapper data-aos="zoom-out">
        {/* 성장나무 배경요소이며, useRef는 요소 이동 시 렌더링 현상으로 인해 사용 (단순 display 용으론 필요 X) */}
        <S.MyTreeBackGround 
          url={
            memberAppliedItemBackground && memberAppliedItemBackground.itemImgPath && memberAppliedItemBackground.itemImgName ? 
            `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${memberAppliedItemBackground.itemImgPath}&fileName=${memberAppliedItemBackground.itemImgName}`
            :
            `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=images/tree/background&fileName=default-background.png`
            } 
          ref={backgroundRef}
          >
          {
            // 성장나무 내부에 띄울 스티커 요소
            // 각 회원이 가지고 있는 아이템 목록의 id를 가져와서, 목록화
            // 아이템 데이터 자체를 넘겨주어, 
            // 컴포넌트 내부에서 데이터 처리
            memberAppliedItemsSticker.map((sticker) => (
              <Sticker
                key={sticker.treeCustomizingId} sticker={sticker}
                memberAppliedItemsSticker={memberAppliedItemsSticker}
                setMemberAppliedItemSticker={setMemberAppliedItemSticker}
                memberCustomizingList={memberCustomizingList}
                setMemberCustomizingList={setMemberCustomizingList}
                backgroundRef={backgroundRef}
              />
              )
            )
          }
          {/* 성장나무 이미지 */}
          <S.MyTreeItemTreeIcon 
            url={ 
                memberAppliedItemTree && memberAppliedItemTree.itemImgPath && memberAppliedItemTree.itemImgName  ? 
                `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${memberAppliedItemTree.itemImgPath}&fileName=${memberAppliedItemTree.itemImgName}`
                :
                `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=images/tree/tree&fileName=default.png`
            }
          />
        </S.MyTreeBackGround>
        <S.ButtonWrapper>
          <S.SaveButton onClick={() => handleConfirmModal(!showConfirmModal)}>저장</S.SaveButton>
          <S.CancelButton onClick={() => window.location.reload()}>취소</S.CancelButton>
        </S.ButtonWrapper>
      </S.MyTreeWrapper>
      <S.SubTitle>아이템을 직접 적용 시켜봐요 😎</S.SubTitle>
      <S.MainTitle>아이템 목록 💼</S.MainTitle>
      <div>
        <S.ItemTabBox>
          <S.ItemTabLink selected={getSeleted(pathName) === 'all'} to={""}>전체</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) === 'background'} to={"background"}>배경</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) === 'sticker'} to={"sticker"}>스티커</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) === 'tree'} to={"tree"}>나무</S.ItemTabLink>
        </S.ItemTabBox>
        <ConfirmModal
            handleConfrmModal={showConfirmModal}
            title="변경사항 적용"
            message="성장나무 변경사항을 저장하시겠습니까?"
            onConfirm={handleSave}
            onCancel={() => handleConfirmModal(false)}
            confirmBtnMsg={"저장"}
            cancelBtnMsg={"취소"}
        />
        <ConfirmModal
            handleConfrmModal={showSaveOkModal}
            title="저장 완료"
            message="성장나무 변경사항이 저장되었습니다."
            onCancel={() => handleSaveOkModal(false)}
            cancelBtnMsg={"확인"}
        />
        <Outlet 
          context={{
            memberId,
            memberItems,
            setMemberItems,
            memberAppliedItemsSticker,
            setMemberAppliedItemSticker, 
            memberAppliedItemBackground,
            setMemberAppliedItemBackground, 
            memberAppliedItemTree,
            setMemberAppliedItemTree,
            memberCustomizingList, 
            setMemberCustomizingList
          }}
        />
      </div>
    </div>
  );
};

export default MyTreeContainer;