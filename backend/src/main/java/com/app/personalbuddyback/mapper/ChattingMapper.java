package com.app.personalbuddyback.mapper;

import com.app.personalbuddyback.domain.ChatRoomVO;
import com.app.personalbuddyback.domain.ChatRoomViewDTO;
import com.app.personalbuddyback.domain.ChatVO;
import com.app.personalbuddyback.domain.ChatViewDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface ChattingMapper {

//    채팅방 존재 여부
    public Optional<Long> selectChatRoomIsTrue(Map<String, Object> map);
//    채팅방 정보 단일조회
    public Optional<ChatRoomViewDTO> selectChatRoom(Map<String, Object> map);
//    채팅방 리스트 불러오기
    public List<ChatRoomViewDTO> selectAllChatRoom(Map<String, Object> map);
//    멤버가 채팅방의 퍼스트멤버인지, 세컨드 멤버인지 찾기
    public Optional<String> selectChatMemberPosition(Map<String, Object> map);
//    채팅 내역 불러오기
    public List<ChatViewDTO> selectChat (Long chatRoomId);
//    읽지않은 채팅 수 조회
    public Optional<Integer> selectAllNotReadChat(Long memberId);
//    채팅방 생성
    public void insertChatRoom (ChatRoomVO chatRoomVO);
//    채팅 작성
    public void insertChat (ChatVO chatVO);
//    채팅방 마지막 채팅내역 업데이트
    public void updateChatRoom (ChatVO ChatVO);
//    채팅방 숨기기
    public void updateHideChatRoom (Map<String, Object> map);
//    채팅방 보이기
    public void updateViewChatRoom (Map<String, Object> map);
//    채팅 읽음 처리
    public void updateChatRead (Map<String, Object> map);
//    특정 채팅을 모든 유저에게 숨기기
    public void updateHideChat (Map<String, Object> map);
//    회원탈퇴용 채팅방 전체 삭제
    public void deleteAllChatRoom(Long memberId);
//    회원탈퇴용 채팅 전체 삭제
    public void deleteAllChat (Long chatRoomId);
}
