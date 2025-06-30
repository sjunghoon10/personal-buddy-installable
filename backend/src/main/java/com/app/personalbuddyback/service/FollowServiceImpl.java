package com.app.personalbuddyback.service;

import com.app.personalbuddyback.domain.FollowVO;
import com.app.personalbuddyback.domain.MemberVO;
import com.app.personalbuddyback.domain.ProfileCardDTO;
import com.app.personalbuddyback.repository.FollowDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class FollowServiceImpl implements FollowService {

    private final FollowDAO followDAO;

    @Override
    public void followMember(FollowVO followVO) {
        followDAO.save(followVO);
    }

    @Override
    public List<ProfileCardDTO> getAllMyFollowers(Long myId, String searchNickname, String filterType) {
        Map<String, Object> params = new HashMap<>();
        params.put("myId", myId);
        params.put("searchNickname", searchNickname);
        params.put("filterType", filterType);
        return followDAO.findAllFollowers(params);
    }

    @Override
    public List<ProfileCardDTO> getAllMyFollows(Long myId, String searchNickname, String filterType) {
        Map<String, Object> params = new HashMap<>();
        params.put("myId", myId);
        params.put("searchNickname", searchNickname);
        params.put("filterType", filterType);
        return followDAO.findAllFollows(params);
    }

    @Override
    public List<FollowVO> getAllMyFavorite(Long favoriteMemberId) {
        return followDAO.findFavorite(favoriteMemberId);
    }

    @Override
    public List<MemberVO> getMutualFollows(Long memberId) {
        return followDAO.findMutualFollows(memberId);
    }

    @Override
    public Optional<ProfileCardDTO> getMemberProfileCard(Long memberId, Long profileCardMemberId) {
        Map<String, Object> map = new HashMap<>();
        map.put("memberId", memberId);
        map.put("profileCardMemberId", profileCardMemberId);

        return followDAO.findProfileCard(map);
    }

    @Override
    public void updateToggleFollowing(FollowVO followVO) {
        followDAO.update(followVO);
    }

    @Override
    public void deleteUnfollowMember(Long followerMemberId, Long followingMemberId) {
        FollowVO followVO = new FollowVO();
        followVO.setFollowerMemberId(followerMemberId);
        followVO.setFollowingMemberId(followingMemberId);
        followDAO.delete(followVO);
    }
}
