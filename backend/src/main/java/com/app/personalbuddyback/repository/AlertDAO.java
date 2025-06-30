package com.app.personalbuddyback.repository;

import com.app.personalbuddyback.domain.AlertVO;
import com.app.personalbuddyback.domain.AlertViewDTO;
import com.app.personalbuddyback.mapper.AlertMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class AlertDAO {

    private final AlertMapper alertMapper;

//    알림 발생
    public void save(AlertVO alertVO) {
        alertMapper.insert(alertVO);
    }
//    알림 리스트
    public List<AlertViewDTO> findAll(Map<String, Object> map) {
        return alertMapper.selectAll(map);
    }
//    읽지않은 알림 조회
    public Integer getCount(Long receiverMemberId) {
        return alertMapper.selectCount(receiverMemberId);
    };
//    알림 읽음 여부
    public void update(Long memberId){
        alertMapper.update(memberId);
    }
//    알림 개별 삭제
    public void delete(Long id) {
        alertMapper.delete(id);
    }
//    알림 전체 삭제
    public void deleteAll(Long receiverMemberId) {
        alertMapper.deleteAll(receiverMemberId);
    }
//    회원탈퇴용 알림 전체 삭제
    public void deleteAllByWithdraw(Long memberId) { alertMapper.deleteAllByWithdraw(memberId); }
}
