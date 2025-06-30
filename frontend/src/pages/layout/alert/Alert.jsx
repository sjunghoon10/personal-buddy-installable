import React, { useContext, useEffect, useState } from "react";
import S from "./style";
import { HeaderContext } from "../../../context/HeaderContext";
import ChangeDate from "../../../utils/changeDate/ChangeDate";

const Alert = ({ memberId, handleAlertModal, onCancel }) => {
  // 알림 정보
  const [alertInfo, setAlertInfo] = useState([]);
  // 알림 타입 정보
  const [alertType, setAlertType] = useState("");
  // 헤더 스크롤을 막는 상태
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  useEffect(() => {
    if (handleAlertModal) lockScroll();
    return () => unlockScroll();
  }, [handleAlertModal]);

  // 알림을 조회하는 함수
  const getAlerts = async () => {
    let url = "";
    if (alertType === null || alertType === "") {
      url = `${process.env.REACT_APP_BACKEND_URL}/alerts/api/alert/list?memberId=${memberId}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/alerts/api/alert/list?memberId=${memberId}&alertType=${alertType}`;
    }
    const response = await fetch(url);
    const alerts = await response.json();
    setAlertInfo(alerts);
  };

  // 알림을 단일 삭제하는 함수
  const deleteOneAlert = async (id) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/alerts/api/alert/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("알림 삭제 성공!");
          getAlerts();
        } else {
          alert("알림 삭제를 실패하였습니다.");
        }
      })
      .catch(console.error);
  };

  // 알림을 전체 삭제하는 함수
  const deleteAllAlert = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/alerts/api/alert/delete-all/${memberId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          getAlerts();
        } else {
          alert("알림 삭제를 실패하였습니다.");
        }
      })
      .catch(console.error);
  };

  // 알림을 최초 조회하고, 알림 타입이 바뀔 때 마다 재조회
  useEffect(() => {
    if (memberId) {
      // 알림을 조회하는 함수
      const getAlerts = async () => {
        let url = "";
        if (alertType === null || alertType === "") {
          url = `${process.env.REACT_APP_BACKEND_URL}/alerts/api/alert/list?memberId=${memberId}`;
        } else {
          url = `${process.env.REACT_APP_BACKEND_URL}/alerts/api/alert/list?memberId=${memberId}&alertType=${alertType}`;
        }
        const response = await fetch(url);
        const alerts = await response.json();
        setAlertInfo(alerts);
      };
      getAlerts();
    }
  }, [memberId, alertType]);

  return (
    <>
      <S.Backdrop onClick={onCancel}>
        <S.AlartContainer onClick={(e) => e.stopPropagation()}>
          {/* 알림 타이틀 / 닫기 버튼 */}
          <S.TitleContainer>
            <S.Title>알림</S.Title>
            <S.CloseButton
              src="/assets/images/modal/close-button.png"
              alt="x버튼"
              onClick={onCancel}
            />
          </S.TitleContainer>
          {/* 알림 필터 / 전체 삭제 */}
          <S.TopContainer>
            <S.SelectBox onChange={(e) => setAlertType(e.target.value)}>
              <option value="">전체</option>
              <option value="follow">팔로우</option>
              <option value="board">커뮤니티</option>
              <option value="guestbook">방명록</option>
              <option value="point">포인트</option>
            </S.SelectBox>
            <S.DeleteAllButton onClick={() => deleteAllAlert()}>
              알림 전체 삭제
            </S.DeleteAllButton>
          </S.TopContainer>
          {/* 알림 리스트 */}
          <S.ListContainer>
            {alertInfo && alertInfo.length > 0 ? (
              alertInfo.map((info) => (
                <S.ListItem key={info.id}>
                  <S.ProfileImg
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/profile/${info.memberImgName}`}
                    alt="멤버 프로필 이미지"
                    onError={(e) => {
                      e.target.src =
                        "/assets/images/header/default-member-img.png";
                    }}
                  />
                  <S.Content>
                    <S.Nickname>{info.memberNickname}</S.Nickname>
                    <S.Message>{info.alertMessage}</S.Message>
                  </S.Content>
                  <S.Meta>
                    <S.Time>{ChangeDate(info.alertCreateTime)}</S.Time>
                    <S.Delete onClick={() => deleteOneAlert(info.id)}>
                      삭제
                    </S.Delete>
                  </S.Meta>
                </S.ListItem>
              ))
            ) : (
              <></>
            )}
          </S.ListContainer>
        </S.AlartContainer>
      </S.Backdrop>
    </>
  );
};

export default Alert;
