package com.adtpractice.config;

import com.adtpractice.model.Challenge;
import com.adtpractice.service.ChallengeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ChallengeService challengeService;

    public DataSeeder(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @Override
    public void run(String... args) {
        if (!challengeService.findAll().isEmpty()) {
            return;
        }

        // --- STACK challenges ---
        challengeService.save(new Challenge(
                "STACK",
                "Reverse a String",
                "Use a Stack<Character> to reverse the string \"hello\". Push each character onto the stack, then pop them all off and build the reversed string. Print the result.",
                """
                // TODO: Create a Stack<Character>
                // TODO: Push each character of "hello" onto the stack
                // TODO: Pop all characters and build the reversed string
                // TODO: Print the reversed string
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "olleh",
                "EASY",
                1
        ));

        challengeService.save(new Challenge(
                "STACK",
                "Balanced Parentheses",
                "Write code that checks if the string \"(()[{}])\" has balanced brackets. Use a Stack to track opening brackets. Print \"true\" if balanced, \"false\" otherwise.",
                """
                String input = "(()[{}])";
                // TODO: Create a Stack<Character>
                // TODO: Iterate through each character
                // TODO: Push opening brackets, pop and match closing brackets
                // TODO: Print true if the stack is empty at the end, false otherwise
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "true",
                "MEDIUM",
                2
        ));

        // --- QUEUE challenges ---
        challengeService.save(new Challenge(
                "QUEUE",
                "Print Queue Simulation",
                "Simulate a print queue using a LinkedList as a Queue. Add three documents: \"Report\", \"Essay\", \"Invoice\". Process (poll) them one by one and print each document name as it is processed.",
                """
                // TODO: Create a Queue<String> using LinkedList
                // TODO: Add "Report", "Essay", "Invoice"
                // TODO: Poll and print each document
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Report\nEssay\nInvoice",
                "EASY",
                1
        ));

        challengeService.save(new Challenge(
                "QUEUE",
                "Hot Potato Game",
                "Simulate the Hot Potato game. Start with players: \"Alice\", \"Bob\", \"Charlie\", \"Diana\". Pass the potato 3 times (remove from front, add to back), then eliminate the person holding it. Repeat until one player remains. Print the winner's name.",
                """
                // TODO: Create a Queue<String> with Alice, Bob, Charlie, Diana
                // TODO: While more than one player remains:
                //   - Pass the potato 3 times (poll and offer)
                //   - Eliminate the current holder (poll)
                // TODO: Print the winner
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Diana",
                "MEDIUM",
                2
        ));

        // --- HASHMAP challenges ---
        challengeService.save(new Challenge(
                "HASHMAP",
                "Word Frequency Counter",
                "Count the frequency of each word in the array [\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\"]. Store counts in a HashMap. Print the count for \"apple\".",
                """
                String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
                // TODO: Create a HashMap<String, Integer>
                // TODO: Count occurrences of each word
                // TODO: Print the count for "apple"
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "3",
                "EASY",
                1
        ));

        challengeService.save(new Challenge(
                "HASHMAP",
                "Two Sum",
                "Given the array [2, 7, 11, 15] and target 9, use a HashMap to find two indices whose values sum to the target. Print the indices separated by a comma (e.g. \"0,1\").",
                """
                int[] nums = {2, 7, 11, 15};
                int target = 9;
                // TODO: Create a HashMap<Integer, Integer> to map value -> index
                // TODO: For each number, check if (target - number) exists in the map
                // TODO: Print the two indices separated by a comma
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "0,1",
                "MEDIUM",
                2
        ));

        // --- LINKEDLIST challenges ---
        challengeService.save(new Challenge(
                "LINKEDLIST",
                "Build and Traverse",
                "Create a LinkedList<Integer>, add the values 10, 20, 30, 40, 50. Print each value on its own line using a for-each loop.",
                """
                // TODO: Create a LinkedList<Integer>
                // TODO: Add 10, 20, 30, 40, 50
                // TODO: Print each value on its own line
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "10\n20\n30\n40\n50",
                "EASY",
                1
        ));

        challengeService.save(new Challenge(
                "LINKEDLIST",
                "Remove Duplicates",
                "Given a LinkedList with values [1, 2, 3, 2, 4, 1, 5], remove all duplicates while preserving order. Use a HashSet to track seen values. Print the resulting list elements, each on its own line.",
                """
                LinkedList<Integer> list = new LinkedList<>(List.of(1, 2, 3, 2, 4, 1, 5));
                // TODO: Use a HashSet to track seen values
                // TODO: Iterate and remove duplicates (preserve first occurrence)
                // TODO: Print each remaining value on its own line
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "1\n2\n3\n4\n5",
                "MEDIUM",
                2
        ));
    }
}
