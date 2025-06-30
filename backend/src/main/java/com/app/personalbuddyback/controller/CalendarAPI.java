package com.app.personalbuddyback.controller;

import com.app.personalbuddyback.domain.*;
import com.app.personalbuddyback.service.CalendarService;
import com.app.personalbuddyback.service.TodoListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendars/api/*")
@Slf4j
public class CalendarAPI {

    private final CalendarService calendarService;

    //    캘린더 일정 데이터 전체 조회
    @PostMapping("members/calendars")
    public ResponseEntity<Map<String, Object>> getCalendarsAll(
            @RequestBody Long memberId
    ) {
        Map<String, Object> response = new HashMap<>();
        response.put("calendars", calendarService.getCalendarsAll(memberId));
        return ResponseEntity.ok(response);
    }

    // ---------------------------- [캘린더] ----------------------------

    @PostMapping("register")
    public ResponseEntity<Map<String, Object>> registerCalendar(@RequestBody CalendarVO calendarVO) {
        log.info("calendarVO = {}", calendarVO);
        Long calendarId = calendarService.registerCalendar(calendarVO); // 등록 후 ID 리턴
        Map<String, Object> response = new HashMap<>();
        response.put("calendarId", calendarId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "캘린더 전체 조회", description = "캘린더 전체를 조회할 수 있는 API")
    @Parameter(
            name = "memberId",
            description = "멤버 ID",
            schema = @Schema(type = "number"),
            in = ParameterIn.PATH,
            required = true
    )
    @GetMapping("members/{memberId}/calendars")
    public List<CalendarVO> getCalendars(@PathVariable Long memberId) {
        return calendarService.getCalendars(memberId);
    }

    @Operation(summary = "캘린더 단일 조회", description = "캘린더 하나를 조회할 수 있는 API")
    @Parameter(
            name = "calendarId",
            description = "캘린더 ID",
            schema = @Schema(type = "number"),
            in = ParameterIn.PATH,
            required = true
    )
    @GetMapping("{calendarId}")
    public Optional<CalendarVO> getCalendar(@PathVariable Long calendarId) {
        return calendarService.getCalendar(calendarId);
    }

    @Operation(summary = "캘린더 수정", description = "기존 캘린더 정보를 수정하는 API")
    @PutMapping("update")
    public void modifyCalendar(@RequestBody CalendarVO calendarVO) {
        calendarService.modifyCalendar(calendarVO);
    }

    @Operation(summary = "캘린더 삭제", description = "캘린더와 연관된 모든 데이터를 포함하여 삭제하는 API")
    @DeleteMapping("delete/{calendarId}")
    public void deleteCalendar(@PathVariable Long calendarId) {
        calendarService.deleteCalendar(calendarId);
    }

    // ---------------------------- [캘린더 멤버] ----------------------------

    @Operation(summary = "캘린더 초대", description = "공유 캘린더에 초대할 수 있는 API")
    @PostMapping("invites")
    public void inviteCalendar(@RequestBody List<CalendarInviteVO> calendarInviteList) {
        calendarService.inviteCalendar(calendarInviteList); // 리스트 전달
    }

    @Operation(summary = "캘린더 초대", description = "공유 캘린더에 초대할 수 있는 API")
    @PostMapping("members/invites/")
    public void inviteCalendar(@RequestBody CalendarInviteVO calendarInviteMember) {
        calendarService.inviteCalendarMember(calendarInviteMember); // 리스트 전달
    }


    @Operation(summary = "캘린더 멤버 등록", description = "공유 캘린더 멤버에 등록할 수 있는 API")
    @PostMapping("members")
    public void addCalendarMember(@RequestBody CalendarMemberVO calendarMemberVO) {
        calendarService.addCalendarMember(calendarMemberVO);
    }

    @Operation(summary = "캘린더 멤버 전체 조회", description = "캘린더 멤버 전체를 조회할 수 있는 API")
    @Parameter(
            name = "calendarId",
            description = "캘린더 ID",
            schema = @Schema(type = "number"),
            in = ParameterIn.PATH,
            required = true
    )
    @GetMapping("members/{calendarId}")
    public List<MemberVO> getCalendarMembers(@PathVariable Long calendarId) {
        return calendarService.getCalendarMembers(calendarId);
    }

    @Operation(summary = "캘린더 멤버 전체 조회", description = "캘린더 멤버 전체를 조회할 수 있는 API")
    @Parameter(
            name = "calendarId",
            description = "캘린더 ID",
            schema = @Schema(type = "number"),
            in = ParameterIn.PATH,
            required = true
    )
    @GetMapping("members/calendars/{calendarId}")
    public List<InviteMemberDTO> getMembers(@PathVariable Long calendarId) {
        return calendarService.getMembers(calendarId);
    }

    @Operation(summary = "캘린더 추가 가능 멤버 전체 조회", description = "캘린더 추가 가능 멤버 전체를 조회할 수 있는 API")
    @Parameter(
            name = "memberId",
            description = "캘린더 ID",
            schema = @Schema(type = "number"),
            in = ParameterIn.PATH,
            required = true
    )
    @GetMapping("members/{memberId}/followings")
    public List<MemberVO> getMutualFollowings(@PathVariable Long memberId) {
        return calendarService.getMutualFollowings(memberId);
    }

    @Operation(summary = "내 초대 이력 전체 조회", description = "나에게 온 초대을 조회할 수 있는 API")
    @GetMapping("invites/{memberId}")
    public List<InviteMemberDTO> getMyInvites(@PathVariable Long memberId) {
        return calendarService.getMyInvites(memberId);
    }

    @Operation(summary = "단일 초대 조회", description = "초대 정보를 조회할 수 있는 API")
    @GetMapping("invites/{calendarId}/{hostId}")
    public Optional<InviteMemberDTO> getInviteInfo(@PathVariable Long calendarId, @PathVariable Long hostId) {
        return calendarService.getInviteInfo(calendarId, hostId);
    }


    @Operation(summary = "캘린더 초대 가능한 멤버 목록 조회", description = "상호 팔로우이며 캘린더에 아직 가입되지 않은 멤버들을 조회합니다.")
    @GetMapping("members/{memberId}/followings/{calendarId}")
    public List<InviteMemberDTO> getInvitableMembers(
            @PathVariable Long memberId,
            @PathVariable Long calendarId
    ) {
        return calendarService.getInvitableCalendarMembers(memberId, calendarId);
    }

    @Operation(summary = "캘린더 초대 승인", description = "캘린더 초대를 승인하는 API")
    @PutMapping("invites/{calendarId}/members/{memberId}/approve")
    public void approveCalendarInvite(@PathVariable Long calendarId, @PathVariable Long memberId) {
        calendarService.approveCalendarInvite(calendarId, memberId);
    }

    @Operation(summary = "캘린더 초대 취소", description = "보낸 초대를 취소하는 API")
    @DeleteMapping("invites/members/{memberId}/calendars/{calendarId}/cancel")
    public void cancelCalendarInvite(@PathVariable Long memberId, @PathVariable Long calendarId) {
        calendarService.cancelCalendarInvite(memberId,calendarId);
    }

    @Operation(summary = "캘린더 멤버 추방", description = "캘린더에서 특정 멤버를 추방하는 API")
    @DeleteMapping("remove/members/{memberId}/calendars/{calendarId}")
    public void expelCalendarMember(@PathVariable Long memberId, @PathVariable Long calendarId) {
        calendarService.expelCalendarMember(memberId, calendarId);
    }

}
