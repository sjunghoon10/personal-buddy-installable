import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { setUser, setUserStatus } from "../../modules/member";
import { SurveyContext } from "../../context/SurveyContext"; // SurveyContext 추가

// 나중에 Context나 Redux로 바꾸기
const isLogin = true; // true면 로그인 상태(main으로 이동), false면 로그아웃 상태(member/login으로 이동)

const LoginLayout = () => {
  // 리덕스
  const { currentUser, isLogin } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // SurveyContext에서 actions 가져오기
  const { actions } = useContext(SurveyContext);

  // 쿼리스트링에서 토큰 분리
  const [searchParams] = useSearchParams();
  const jwtToken = searchParams.get("jwtToken");
  const localJwtToken = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

  useEffect(() => {
    // 만약 쿼리스트링에 토큰이 있다면, 로컬스토리지에 저장
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);

      // 쿼리스트링 제거해서 새로고침 시 무한 navigate 방지
      window.history.replaceState({}, document.title, window.location.pathname);

      // 메인으로 이동
      navigate("/main", { replace: true });
    }
  }, [jwtToken]); // 의존성: jwtToken

  useEffect(() => {
    // 토큰이 있다면 그 토큰으로 사용자의 정보를 요청
    if (localJwtToken) {
      const getUserDatas = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/members/api/profile`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localJwtToken}`,
            },
          }
        );

        // // 토큰으로 데이터를 못가져오면
        if (!response.ok) {
          // 리덕스를 초기화
          dispatch(
            setUser({
              id: 0,
              memberEmail: "",
              memberName: "",
              memberNickName: "",
              memberProvider: "",
            })
          );
          dispatch(setUserStatus(false));

          // 로컬스토리지 토큰 삭제
          localStorage.clear();
          return;
        }

        // 정상 응답
        const datas = await response.json();

        // 리덕스에 유저정보 파싱
        dispatch(setUser(datas.currentUser));
        dispatch(setUserStatus(true));

        // SurveyContext에도 유저정보 추가
        actions.setCurrentUser(datas.currentUser);

        // 기존 Context는 제거하고 Redux+Context로 관리
        const surveyCheckRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/surveys/api/check?memberId=${datas.currentUser.id}`
        );
        const isInterestExist = await surveyCheckRes.json();

        if (!isInterestExist) {
          navigate("/survey/intro", { replace: true });
        }
        // 주의: isInterestExist가 true라도 여기서 navigate('/main') 하면 현재 경로 무시하므로 제거
      };
      getUserDatas();
    }
  }, [localJwtToken, dispatch, actions, navigate]);

  if (!localJwtToken) {
    return <Navigate to="/member/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
