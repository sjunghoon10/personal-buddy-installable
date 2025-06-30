package com.app.personalbuddyback.controller;

import com.app.personalbuddyback.domain.RandomTargetLotteryVO;
import com.app.personalbuddyback.domain.TargetStandardVO;
import com.app.personalbuddyback.domain.TargetVO;
import com.app.personalbuddyback.service.TargetService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/targets/api")
@Slf4j
public class TargetAPI {
    private final TargetService targetService;

    @Operation(summary = "회원의 목표 완료 추가", description = "같은 회원이, 같은 날, 같은 내용의 목표가 완료되었다면 추가하지 않음")
    @PostMapping("/target/complete")
    public void completeTarget(@RequestBody TargetVO targetVO) {
        int targetCount = targetService.getTargetCount(targetVO);

        if(targetCount == 0) {
            targetService.completeTarget(targetVO);
        }
    }

    @Operation(summary = "목표의 기준치 추가 (관리자용)", description = "목표 완료 여부를 판단할 기준 테이블 정보 추가")
    @PostMapping("/target/standard/add")
    public void addTargetStandard(@RequestBody TargetStandardVO targetStandardVO) {
        targetService.addTargetStandard(targetStandardVO);
    }

    @Operation(summary = "매일,매주,매월 시작일에 선정할 목표 생성 및 조회", description = "매일 / 매주 첫 째날 / 매월 1일 기준 데이터 생성 및 없다면 추가 후 조회")
    @PostMapping("/target/random-target/list/{memberId}")
    public ResponseEntity<Map<String, Object>> randomTargetLottery(@PathVariable Long memberId) {
        Map<String, Object> response = new HashMap<>();
        String[] categoryList = {"운동", "공부", "업무", "모임", "여가", "식사", "여행", "건강"};
        try{
            List<RandomTargetLotteryVO> dailyRandomTargets = targetService.getDailyRandomTargets(memberId);
            List<RandomTargetLotteryVO> weeklyRandomTargets = targetService.getWeeklyRandomTargets(memberId);
            List<RandomTargetLotteryVO> monthlyRandomTargets = targetService.getMonthlyRandomTargets(memberId);

            if(dailyRandomTargets.isEmpty()) {

                List<Integer> randomCategoryNums = new ArrayList<>();
                for(int i = 0; i < categoryList.length; i++) {
                    randomCategoryNums.add(i);
                }
                Collections.shuffle(randomCategoryNums);

                for(int i = 0; i < 4; i++) {
                    RandomTargetLotteryVO randomTargetLotteryVO = new RandomTargetLotteryVO();

                    randomTargetLotteryVO.setMemberId(memberId);
                    randomTargetLotteryVO.setRandomTargetLotteryPeriodType("일간");

                    randomTargetLotteryVO.setRandomTargetLotteryCategory(categoryList[randomCategoryNums.get(i)]);
                    targetService.createRandomTargetLotto(randomTargetLotteryVO);
                    dailyRandomTargets.add(randomTargetLotteryVO);
                }

            }
            response.put("dailyRandomTargets", dailyRandomTargets);

            if(weeklyRandomTargets.isEmpty()) {

                List<Integer> randomCategoryNums = new ArrayList<>();
                for(int i = 0; i < categoryList.length; i++) {
                    randomCategoryNums.add(i);
                }
                Collections.shuffle(randomCategoryNums);

                for(int i = 0; i < 4; i++) {
                    RandomTargetLotteryVO randomTargetLotteryVO = new RandomTargetLotteryVO();

                    randomTargetLotteryVO.setMemberId(memberId);
                    randomTargetLotteryVO.setRandomTargetLotteryPeriodType("주간");

                    randomTargetLotteryVO.setRandomTargetLotteryCategory(categoryList[randomCategoryNums.get(i)]);
                    targetService.createRandomTargetLotto(randomTargetLotteryVO);
                    weeklyRandomTargets.add(randomTargetLotteryVO);
                }
            }
            response.put("weeklyRandomTargets", weeklyRandomTargets);

            if(monthlyRandomTargets.isEmpty()) {

                List<Integer> randomCategoryNums = new ArrayList<>();
                for(int i = 0; i < categoryList.length; i++) {
                    randomCategoryNums.add(i);
                }
                Collections.shuffle(randomCategoryNums);

                for(int i = 0; i < 4; i++) {
                    RandomTargetLotteryVO randomTargetLotteryVO = new RandomTargetLotteryVO();

                    randomTargetLotteryVO.setMemberId(memberId);
                    randomTargetLotteryVO.setRandomTargetLotteryPeriodType("월간");

                    randomTargetLotteryVO.setRandomTargetLotteryCategory(categoryList[randomCategoryNums.get(i)]);
                    targetService.createRandomTargetLotto(randomTargetLotteryVO);
                    monthlyRandomTargets.add(randomTargetLotteryVO);
                }
            }

            response.put("monthlyRandomTargets", monthlyRandomTargets);
            response.put("result", true);
            response.put("message", "랜덤 목표 목록 생성 및 조회 완료");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("result", false);
            response.put("message", "랜덤 목표 목록 생성 및 조회 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    @Operation(summary = "목표 목록 조회", description = "회원 번호를 통해 목표의 목록을 조회")
    @PostMapping("/target/list/{memberId}")
    public ResponseEntity<Map<String, Object>> getTargetList(@PathVariable Long memberId) {
        Map<String, Object> response = new HashMap<>();
        response.put("result", true);
        response.put("dailyTargets", targetService.getDailyTargets(memberId));
        response.put("weeklyTargets", targetService.getWeeklyTargets(memberId));
        response.put("monthlyTargets", targetService.getMonthlyTargets(memberId));

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "목표 기준 수정", description = "관리자용 목표 기준 수정")
    @PutMapping("/target/standard/edit")
    public void editTargetStandard(@RequestBody TargetStandardVO targetStandardVO) {
        targetService.editTargetStandard(targetStandardVO);
    }
}
