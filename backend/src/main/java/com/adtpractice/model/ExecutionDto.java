package com.adtpractice.model;

public class ExecutionDto {

    public record ExecuteRequest(String code, Long challengeId) {}

    public record ExecuteResponse(
            boolean success,
            String output,
            String error,
            boolean allTestsPassed,
            long executionTimeMs
    ) {}
}
