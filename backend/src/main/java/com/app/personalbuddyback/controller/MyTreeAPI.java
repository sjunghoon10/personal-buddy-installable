package com.app.personalbuddyback.controller;

import com.app.personalbuddyback.domain.TreeItemListDTO;
import com.app.personalbuddyback.domain.TreeVO;
import com.app.personalbuddyback.domain.TreeViewDTO;
import com.app.personalbuddyback.service.MyTreeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.HTTP;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-tree/api")
@Slf4j
public class MyTreeAPI {
    private final MyTreeService myTreeService;

    @Operation(summary = "성장나무 - 회원 간 연결 추가", description = "회원 가입 시 최초로 한 번만 추가")
    @PostMapping("/tree/create")
    public void createTree(@RequestBody TreeVO treeVO) {
        myTreeService.registerMemberTree(treeVO);
    }

    @Operation(summary = "회원의 성장나무 아이템 전체 목록(아이템 아이디별) 조회", description = "아이템 목록으로 뿌려줄 데이터")
    @PostMapping("/tree/list")
    public ResponseEntity<Map<String, Object>> getAllTrees(@RequestBody Map<String, Object> params) {
        Map<String, Object> response = new HashMap<>();
        try{
            List<TreeItemListDTO> memberTreeItemList = myTreeService.getAllMemberItem(params);
            response.put("result", true);
            response.put("memberTreeItemList", memberTreeItemList);
            response.put("message", "회원 성장나무 아이템 조회 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "회원 성장나무 아이템 조회 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "회원의 성장나무 아이템 목록 (아이템 개별 데이터 목록)", description = "아이템 커스터마이징 적용시킬 데이터")
    @PostMapping("/tree/customizing-list/{memberId}")
    public ResponseEntity<Map<String, Object>> getAllTreeCustomizing(@PathVariable Long memberId) {
        Map<String, Object> response = new HashMap<>();
        try{
            List<TreeViewDTO> memberCustomizingList = myTreeService.getAllTreeCustomizing(memberId);
            response.put("result", true);
            response.put("memberCustomizingList", memberCustomizingList);
            response.put("message", "회원 성장나무 꾸미기 목록 조회 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "회원 성장나무 꾸미기 목록 조회 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "회원의 꾸며놓은 (전시된) 성장나무 목록", description = "회원이 꾸며놓은 성장나무 아이템 목록(전시된 데이터)을 보기 위한 데이터 조회")
    @PostMapping("/tree/list/applied/{memberId}")
    public ResponseEntity<Map<String, Object>> getAllAppliedTrees(@PathVariable Long memberId) {
        Map<String, Object> response = new HashMap<>();
        try{
            List<TreeViewDTO> memberAppliedTrees = myTreeService.getAppliedTreeCustomizing(memberId);
            response.put("result", true);
            response.put("memberAppliedTrees", memberAppliedTrees);
            response.put("message", "회원의 커스텀 성장나무 조회 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "회원의 커스텀 성장나무 조회 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "성장나무 꾸미기 기능 (위치 수정 및 적용 여부 변경)", description = "회원이 꾸민 성장나무 변경사항을 적용")
    @PostMapping("/tree/get/item-unapplied")
    public ResponseEntity<Map<String, Object>> findUnAppliedItem(@RequestBody Map<String, Object> params) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("result", true);
            response.put("addItem", myTreeService.getNotAppliedItemId(params));
            response.put("message", "성장나무 변경사항 저장 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "성장나무 변경사항 저장 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "성장나무 꾸미기 기능 (위치 수정 및 적용 여부 변경)", description = "회원이 꾸민 성장나무 변경사항을 적용")
    @PostMapping("/tree/get/item-applied")
    public ResponseEntity<Map<String, Object>> findAppliedItem(@RequestBody Map<String, Object> params) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("result", true);
            response.put("removeItem", myTreeService.getAppliedItemId(params));
            response.put("message", "성장나무 변경사항 저장 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "성장나무 변경사항 저장 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "성장나무 꾸미기 기능 (위치 수정 및 적용 여부 변경)", description = "회원이 꾸민 성장나무 변경사항을 적용")
    @PutMapping("/tree/edit")
    public ResponseEntity<Map<String, Object>> editTreeCustomizing(@RequestBody List<TreeViewDTO> memberCustomiziingList) {
        Map<String, Object> response = new HashMap<>();
        try {
            for(TreeViewDTO memberCustomizingItem : memberCustomiziingList){
                myTreeService.updateTreeCustomizing(memberCustomizingItem);
            }
            response.put("result", true);
            response.put("message", "성장나무 변경사항 저장 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "성장나무 변경사항 저장 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
