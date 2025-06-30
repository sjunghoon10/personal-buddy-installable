import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarForm from "./CalendarForm";
import { CalendarContext } from "../../../../context/CalendarContext";

const CalendarSave = () => {
  const navigate = useNavigate();
  const { memberId, calendarId } = useParams();
  const { actions } = useContext(CalendarContext);
  const { getCalendarsAll } = actions;

  const [invitedMembers, setInvitedMembers] = useState([]); // 부모 state
  const [allMembers, setAllMembers] = useState([]);

  // 초대 가능한 멤버 조회
  const getMutualFollowings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/${memberId}/followings`
      );
      const data = await response.json();
      setAllMembers(data);
    } catch (error) {
      console.error("초대 가능한 멤버 조회 실패", error);
    }
  };

  useEffect(() => {
    getMutualFollowings();
  }, [memberId]);

  // 저장 처리 함수
  const registerCalendar = async ({ calendarName, invitedMembers }) => {
    try {
      // 1. 캘린더 등록
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calendarTitle: calendarName,
            calendarIndex: 3,
            memberId: Number(memberId),
          }),
        }
      );
      const data = await response.json();
      const newCalendarId = data.calendarId;

      // 2. 초대 멤버 등록
      if (invitedMembers.length > 0) {
        const invites = invitedMembers.map((member) => ({
          calendarInviteInvitedMemberId: member.memberId ?? member.id, // 이제 memberId로 통일
          calendarInviteHostId: Number(memberId),
          calendarInviteIsApproved: 0,
          calendarId: newCalendarId,
        }));

        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invites),
          }
        );
      }

      // 3. 캘린더 전역 상태 최신화
      await getCalendarsAll();

      alert("캘린더가 저장되었습니다.");
      navigate(`/main/${memberId}/${newCalendarId}`);
    } catch (error) {
      console.error("캘린더 저장 실패", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <CalendarForm
      initialName="퍼스널 버디"
      initialInvited={invitedMembers} // 부모 → 자식으로 state 전달
      setInvitedMembers={setInvitedMembers} // 부모 set 함수도 전달!
      allMembers={allMembers}
      onCancel={() => navigate(`/main/${memberId}/${calendarId}`)}
      showInviteSection={true}
      buttons={[
        {
          label: "저장",
          type: "primary",
          onClick: registerCalendar,
        },
        {
          label: "취소",
          type: "default",
          onClick: () => navigate(`/main/${memberId}/${calendarId}`),
        },
      ]}
    />
  );
};

export default CalendarSave;
