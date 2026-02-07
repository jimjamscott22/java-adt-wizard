package com.adtpractice.service;

import com.adtpractice.model.Challenge;
import com.adtpractice.model.ExecutionDto.ExecuteRequest;
import com.adtpractice.model.ExecutionDto.ExecuteResponse;
import jdk.jshell.JShell;
import jdk.jshell.SnippetEvent;
import jdk.jshell.Snippet;
import jdk.jshell.DiagnosticListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.List;
import java.util.concurrent.*;

@Service
public class JShellExecutionService {

    @Value("${app.jshell.timeout-seconds:5}")
    private int timeoutSeconds;

    @Value("${app.jshell.max-output-length:10000}")
    private int maxOutputLength;

    private final ChallengeService challengeService;

    public JShellExecutionService(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    public ExecuteResponse execute(ExecuteRequest request) {
        long startTime = System.currentTimeMillis();
        ExecutorService executor = Executors.newSingleThreadExecutor();

        try {
            Future<ExecuteResponse> future = executor.submit(() -> runInJShell(request, startTime));
            return future.get(timeoutSeconds, TimeUnit.SECONDS);
        } catch (TimeoutException e) {
            long elapsed = System.currentTimeMillis() - startTime;
            return new ExecuteResponse(false, "", "Execution timed out after " + timeoutSeconds + " seconds.", false, elapsed);
        } catch (Exception e) {
            long elapsed = System.currentTimeMillis() - startTime;
            return new ExecuteResponse(false, "", "Execution error: " + e.getMessage(), false, elapsed);
        } finally {
            executor.shutdownNow();
        }
    }

    private ExecuteResponse runInJShell(ExecuteRequest request, long startTime) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintStream printStream = new PrintStream(baos);
        StringBuilder errors = new StringBuilder();

        try (JShell jshell = JShell.builder()
                .out(printStream)
                .err(printStream)
                .build()) {

            // Pre-import common packages
            jshell.eval("import java.util.*;");
            jshell.eval("import java.util.stream.*;");

            // Build the code to execute
            String code = request.code();
            boolean isChallengeMode = request.challengeId() != null;
            Challenge challenge = null;

            if (isChallengeMode) {
                challenge = challengeService.findById(request.challengeId());
                if (challenge != null && challenge.getTestCode() != null
                        && !challenge.getTestCode().isBlank()
                        && !challenge.getTestCode().trim().startsWith("// Test is built into")) {
                    code = code + "\n" + challenge.getTestCode();
                }
            }

            // Execute the code
            List<SnippetEvent> events = jshell.eval(code);

            for (SnippetEvent event : events) {
                if (event.status() == Snippet.Status.REJECTED) {
                    // Collect diagnostics
                    jshell.diagnostics(event.snippet()).forEach(diag ->
                            errors.append(diag.getMessage(null)).append("\n")
                    );
                }
                if (event.exception() != null) {
                    errors.append(event.exception().getMessage()).append("\n");
                }
            }

            printStream.flush();
            String output = baos.toString().trim();

            // Truncate output if too long
            if (output.length() > maxOutputLength) {
                output = output.substring(0, maxOutputLength) + "\n... (output truncated)";
            }

            long elapsed = System.currentTimeMillis() - startTime;
            boolean hasErrors = !errors.isEmpty();
            String errorStr = hasErrors ? errors.toString().trim() : null;

            // Challenge test validation
            boolean testsPassed = false;
            if (isChallengeMode && challenge != null && !hasErrors) {
                String expected = challenge.getExpectedOutput().trim();
                testsPassed = output.equals(expected);
            }

            return new ExecuteResponse(!hasErrors, output, errorStr, testsPassed, elapsed);

        } catch (Exception e) {
            long elapsed = System.currentTimeMillis() - startTime;
            return new ExecuteResponse(false, "", "JShell error: " + e.getMessage(), false, elapsed);
        }
    }
}
