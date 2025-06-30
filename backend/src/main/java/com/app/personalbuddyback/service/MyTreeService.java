package com.app.personalbuddyback.service;

import com.app.personalbuddyback.domain.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MyTreeService {
    // 멤버 - 성장나무 연결 테이블 추가 (회원 가입 시 최초 추가)
    public void registerMemberTree(TreeVO treeVO);

    // 멤버의 성장나무 전체 아이템 리스트 조회 (item id 별로 분류)
    public List<TreeItemListDTO> getAllMemberItem(Map<String, Object> params);

    // 멤버의 성장나무 커스터마이징 (customizing id 별로 분류)
    public List<TreeViewDTO> getAllTreeCustomizing(Long memberId);

    // 멤버의 전시된 나무 아이템 목록 조회
    public List<TreeViewDTO> getAppliedTreeCustomizing(Long memberId);

    // 성장나무 수정을 위한 itemId 로 추가할 아이템의 customizingId 한 개 받기
    public Optional<TreeViewDTO> getNotAppliedItemId(Map<String, Object> params);

    // 성장나무 수정을 위한 itemId 로 제거할 아이템의 customizingId 한 개 받기
    public Optional<TreeViewDTO> getAppliedItemId(Map<String, Object> params);

    // 멤버 성장나무 아이템 수정
    public void updateTreeCustomizing(TreeViewDTO TreeViewDTO);

    // 멤버 성장나무 목록들 삭제
    public void deleteTreeCustomizing(Long treeId);

    // 멤버 성장나무 삭제
    public void deleteTree(Long memberId);
}
