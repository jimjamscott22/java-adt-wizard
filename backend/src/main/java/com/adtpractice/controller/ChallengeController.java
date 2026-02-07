package com.adtpractice.controller;

import com.adtpractice.model.Challenge;
import com.adtpractice.service.ChallengeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping
    public List<Challenge> getChallenges(@RequestParam(required = false) String adt) {
        if (adt != null && !adt.isBlank()) {
            return challengeService.findByAdtType(adt);
        }
        return challengeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Challenge> getChallenge(@PathVariable Long id) {
        Challenge challenge = challengeService.findById(id);
        if (challenge == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(challenge);
    }

    @GetMapping("/types")
    public List<String> getAdtTypes() {
        return challengeService.getAvailableAdtTypes();
    }
}
