package com.adtpractice.controller;

import com.adtpractice.model.ExecutionDto.ExecuteRequest;
import com.adtpractice.model.ExecutionDto.ExecuteResponse;
import com.adtpractice.service.JShellExecutionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ExecutionController {

    private final JShellExecutionService executionService;

    public ExecutionController(JShellExecutionService executionService) {
        this.executionService = executionService;
    }

    @PostMapping("/execute")
    public ExecuteResponse execute(@RequestBody ExecuteRequest request) {
        return executionService.execute(request);
    }
}
