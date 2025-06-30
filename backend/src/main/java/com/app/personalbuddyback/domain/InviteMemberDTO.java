package com.app.personalbuddyback.domain;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class InviteMemberDTO {
    private Long memberId;
    private String memberName;
    private String memberImgPath;
    private String memberImgName;
    private String inviteStatus;
    private String calendarTitle;

    private Long calendarMemberIsHost;
    private Long calendarInviteInvitedMemberId;
    private Long calendarInviteHostId;
    private Integer calendarInviteIsApproved;
    private Long calendarId;
}
