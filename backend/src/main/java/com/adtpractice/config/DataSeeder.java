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
        // --- STACK challenges ---
        seedIfMissing(new Challenge(
                "STACK",
                "Warmup: Stack Single Peek",
                "Very beginner warmup: create a stack, push \"Java\", then print the top element.",
                """
                // TODO: Create a Stack<String>
                // TODO: Push "Java"
                // TODO: Print stack.peek()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Java",
                "EASY",
                -1
        ));
        seedIfMissing(new Challenge(
                "STACK",
                "Warmup: Stack Push/Pop Basics",
                "Beginner warmup: create a stack, push \"A\", \"B\", \"C\", then print the top element, pop once and print the popped value, then print the stack size.",
                """
                // TODO: Create a Stack<String>
                // TODO: Push "A", "B", "C"
                // TODO: Print stack.peek()
                // TODO: Print stack.pop()
                // TODO: Print stack.size()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "C\nC\n2",
                "EASY",
                0
        ));
        seedIfMissing(new Challenge(
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

        seedIfMissing(new Challenge(
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

        seedIfMissing(new Challenge(
                "STACK",
                "Bracket Validator",
                "From the Java exercises: validate whether the string \"({[]})\" has properly matched brackets using a stack. Print true when valid, false otherwise.",
                """
                String s = "({[]})";
                // TODO: Use a stack (Deque<Character> or Stack<Character>)
                // TODO: Push opening brackets: (, [, {
                // TODO: On closing brackets, pop and validate pair
                // TODO: Print true only if all pairs match and the stack is empty
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "true",
                "MEDIUM",
                3
        ));

        // --- QUEUE challenges ---
        seedIfMissing(new Challenge(
                "QUEUE",
                "Warmup: Queue Front Check",
                "Very beginner warmup: create a queue, add 10 then 20, and print the front element.",
                """
                // TODO: Create a Queue<Integer> using LinkedList
                // TODO: Add 10 and 20
                // TODO: Print queue.peek()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "10",
                "EASY",
                -1
        ));
        seedIfMissing(new Challenge(
                "QUEUE",
                "Warmup: Queue Enqueue/Dequeue",
                "Beginner warmup: create a queue, add \"Report\", \"Essay\", \"Invoice\", then print the front item, dequeue once and print it, then print remaining size.",
                """
                // TODO: Create a Queue<String> using LinkedList
                // TODO: Add "Report", "Essay", "Invoice"
                // TODO: Print queue.peek()
                // TODO: Print queue.poll()
                // TODO: Print queue.size()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Report\nReport\n2",
                "EASY",
                0
        ));
        seedIfMissing(new Challenge(
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

        seedIfMissing(new Challenge(
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
        seedIfMissing(new Challenge(
                "HASHMAP",
                "Warmup: HashMap Put/Get",
                "Very beginner warmup: create a HashMap<String, Integer>, put x=7, then print map.get(\"x\").",
                """
                // TODO: Create a HashMap<String, Integer>
                // TODO: Put key "x" with value 7
                // TODO: Print map.get("x")
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "7",
                "EASY",
                -1
        ));
        seedIfMissing(new Challenge(
                "HASHMAP",
                "Warmup: Student Age Lookup",
                "Beginner warmup: create a HashMap<String, Integer> with Alice=20, Bob=22, Carol=21 and print Bob's age.",
                """
                // TODO: Create a HashMap<String, Integer>
                // TODO: Add Alice=20, Bob=22, Carol=21
                // TODO: Print Bob's age
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "22",
                "EASY",
                0
        ));
        seedIfMissing(new Challenge(
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

        seedIfMissing(new Challenge(
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

        seedIfMissing(new Challenge(
                "HASHMAP",
                "Sentence Word Frequency",
                "From the Java exercises: count word frequencies in \"the cat sat on the mat the cat\" (case-insensitive) using a HashMap, then print only the count for the word \"the\".",
                """
                String sentence = "the cat sat on the mat the cat";
                // TODO: Split by whitespace and build frequency counts in a HashMap<String, Integer>
                // TODO: Make counting case-insensitive
                // TODO: Print the count for "the"
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "3",
                "EASY",
                3
        ));

        // --- LINKEDLIST challenges ---
        seedIfMissing(new Challenge(
                "LINKEDLIST",
                "Warmup: LinkedList Add and First",
                "Very beginner warmup: create a LinkedList<Integer>, add 5, add 10, then print the first element.",
                """
                // TODO: Create a LinkedList<Integer>
                // TODO: Add 5 then 10
                // TODO: Print list.getFirst()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "5",
                "EASY",
                -1
        ));
        seedIfMissing(new Challenge(
                "LINKEDLIST",
                "Warmup: LinkedList First and Size",
                "Beginner warmup: create a LinkedList<String>, addFirst(\"B\"), addFirst(\"A\"), addLast(\"C\"). Print the first element, then print the size.",
                """
                // TODO: Create a LinkedList<String>
                // TODO: Add B at front, then A at front, then C at end
                // TODO: Print list.getFirst()
                // TODO: Print list.size()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "A\n3",
                "EASY",
                0
        ));
        seedIfMissing(new Challenge(
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

        seedIfMissing(new Challenge(
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

        // --- TREEMAP challenges ---
        seedIfMissing(new Challenge(
                "TREEMAP",
                "Warmup: TreeMap Sorted Keys",
                "Very beginner warmup: create a TreeMap<String, Integer>, put b=2 and a=1, then print firstKey().",
                """
                // TODO: Create a TreeMap<String, Integer>
                // TODO: Put b=2 and a=1
                // TODO: Print tree.firstKey()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "a",
                "EASY",
                -1
        ));
        seedIfMissing(new Challenge(
                "TREEMAP",
                "Warmup: TreeMap First/Last Key",
                "Beginner warmup: create a TreeMap<String, Integer>, put Banana=2, Apple=5, Cherry=3. Print firstKey() and lastKey().",
                """
                // TODO: Create a TreeMap<String, Integer>
                // TODO: Put Banana=2, Apple=5, Cherry=3
                // TODO: Print tree.firstKey()
                // TODO: Print tree.lastKey()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Apple\nCherry",
                "EASY",
                0
        ));
        seedIfMissing(new Challenge(
                "TREEMAP",
                "Sorted Grade Book",
                "From the Java exercises: store average scores in a TreeMap and print the top student's name. Use this data: Alice=[90,85,92], Bob=[88,91,87], Carol=[95,80,84]. If tied, pick alphabetically first.",
                """
                TreeMap<String, Double> gradeBook = new TreeMap<>();
                // TODO: Compute each student's average and store in gradeBook
                // TODO: Find and print the name of the student with the highest average
                // Hint: TreeMap iteration is alphabetical for tie-breaking
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Alice",
                "MEDIUM",
                1
        ));

        // --- PRIORITYQUEUE challenges ---
        seedIfMissing(new Challenge(
                "PRIORITYQUEUE",
                "Warmup: PriorityQueue First Poll",
                "Very beginner warmup: create a PriorityQueue<Integer>, add 4, 1, 3, then print the first polled value.",
                """
                // TODO: Create a PriorityQueue<Integer>
                // TODO: Add 4, 1, 3
                // TODO: Print pq.poll()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "1",
                "EASY",
                -1
        ));
        seedIfMissing(new Challenge(
                "PRIORITYQUEUE",
                "Warmup: PriorityQueue Min-Heap Basics",
                "Beginner warmup: create a PriorityQueue<Integer>, add 30, 10, 20. Print peek(), then poll(), then peek() again.",
                """
                // TODO: Create a PriorityQueue<Integer>
                // TODO: Add 30, 10, 20
                // TODO: Print pq.peek()
                // TODO: Print pq.poll()
                // TODO: Print pq.peek()
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "10\n10\n20",
                "EASY",
                0
        ));
        seedIfMissing(new Challenge(
                "PRIORITYQUEUE",
                "Task Scheduler",
                "From the Java exercises: process tasks by priority (lower number = higher priority), then by name if priority ties. Tasks: (Compile,2), (Deploy,3), (Test,2), (Plan,1), (Review,3). Print each task name on its own line in processing order.",
                """
                record Task(String name, int priority) {}
                List<Task> tasks = List.of(
                    new Task("Compile", 2),
                    new Task("Deploy", 3),
                    new Task("Test", 2),
                    new Task("Plan", 1),
                    new Task("Review", 3)
                );
                // TODO: Build a PriorityQueue<Task> with the correct comparator
                // TODO: Poll and print each task name on its own line
                """,
                """
                // Test is built into the challenge — your printed output is checked.
                """,
                "Plan\nCompile\nTest\nDeploy\nReview",
                "MEDIUM",
                1
        ));
    }

    private void seedIfMissing(Challenge challenge) {
        if (!challengeService.existsByAdtTypeAndTitle(challenge.getAdtType(), challenge.getTitle())) {
            challengeService.save(challenge);
        }
    }
}
