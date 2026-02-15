export const decisionGuide = [
  {
    need: 'Fast lookup by key',
    bestChoice: 'HashMap',
    why: 'O(1) average get/put. Use when you don\'t need ordering.',
    avoid: 'LinkedList (O(n) search)',
  },
  {
    need: 'Sorted keys with fast lookup',
    bestChoice: 'TreeMap',
    why: 'O(log n) get/put with keys always in sorted order. Supports range queries.',
    avoid: 'HashMap (no ordering guarantee)',
  },
  {
    need: 'LIFO — undo/redo, backtracking',
    bestChoice: 'Stack',
    why: 'O(1) push/pop. Natural fit for any last-in-first-out scenario.',
    avoid: 'Queue (wrong order), ArrayList (unnecessary overhead)',
  },
  {
    need: 'FIFO — task scheduling, BFS',
    bestChoice: 'Queue (LinkedList)',
    why: 'O(1) add/poll. Processes items in arrival order.',
    avoid: 'Stack (wrong order), ArrayList (O(n) remove from front)',
  },
  {
    need: 'Process by priority',
    bestChoice: 'PriorityQueue',
    why: 'O(log n) add/poll. Always dequeues the highest-priority element.',
    avoid: 'Sorting the full list every time (O(n log n) per operation)',
  },
  {
    need: 'Frequent insert/remove at both ends',
    bestChoice: 'LinkedList (as Deque)',
    why: 'O(1) addFirst/addLast/removeFirst/removeLast.',
    avoid: 'ArrayList (O(n) insert/remove at front)',
  },
  {
    need: 'Fast random access by index',
    bestChoice: 'ArrayList',
    why: 'O(1) access by index, backed by resizable array.',
    avoid: 'LinkedList (O(n) access by index)',
  },
  {
    need: 'Unique elements, fast membership test',
    bestChoice: 'HashSet',
    why: 'O(1) average contains/add/remove. No duplicates.',
    avoid: 'ArrayList with manual duplicate checks (O(n) per check)',
  },
  {
    need: 'Unique elements in sorted order',
    bestChoice: 'TreeSet',
    why: 'O(log n) operations with elements always sorted. Supports range operations.',
    avoid: 'HashSet (no ordering), sorting a list repeatedly',
  },
];

export const tradeOffs = [
  {
    title: 'Array vs Linked List',
    dimension: 'Time vs Space & Flexibility',
    arrayPros: [
      'O(1) random access by index',
      'Better cache locality (contiguous memory)',
      'Less memory overhead per element',
    ],
    linkedPros: [
      'O(1) insert/delete at known positions',
      'No need to resize — grows dynamically',
      'Efficient for frequent insertions/removals',
    ],
    verdict: 'Use arrays when you need fast access by index and know approximate size. Use linked lists when you frequently insert/remove and rarely access by index.',
  },
  {
    title: 'HashMap vs TreeMap',
    dimension: 'Speed vs Ordering',
    arrayPros: [
      'O(1) average operations — faster',
      'Lower constant factor overhead',
      'Better for pure lookup tables',
    ],
    linkedPros: [
      'Keys always sorted — supports range queries',
      'O(log n) guaranteed (no hash collisions)',
      'firstKey(), lastKey(), subMap() operations',
    ],
    verdict: 'Use HashMap when you only need key-value lookup. Use TreeMap when you need sorted keys or range operations.',
  },
  {
    title: 'HashSet vs TreeSet',
    dimension: 'Speed vs Ordering',
    arrayPros: [
      'O(1) average operations',
      'Lower overhead for simple membership tests',
      'Best for "does this element exist?" checks',
    ],
    linkedPros: [
      'Elements always sorted',
      'Supports first(), last(), headSet(), tailSet()',
      'O(log n) guaranteed worst case',
    ],
    verdict: 'Use HashSet for fast membership testing. Use TreeSet when you need elements in sorted order.',
  },
  {
    title: 'Merge Sort vs Quick Sort',
    dimension: 'Guaranteed Performance vs Average Speed',
    arrayPros: [
      'O(n log n) guaranteed — no worst case',
      'Stable sort — preserves relative order',
      'Predictable performance',
    ],
    linkedPros: [
      'In-place — O(log n) space vs O(n)',
      'Faster in practice (smaller constants)',
      'Better cache performance on arrays',
    ],
    verdict: 'Use merge sort when stability and guaranteed O(n log n) matter. Use quick sort when average-case speed and low memory are priorities.',
  },
];

export const empiricalMeasurement = {
  title: 'Empirical Performance Measurement',
  description:
    'Theory tells us Big O bounds, but empirical measurement reveals actual performance on real hardware with real data. This is essential for validating algorithm choices.',
  techniques: [
    {
      name: 'System.nanoTime()',
      description: 'Measure wall-clock time before and after an operation to get elapsed time in nanoseconds.',
      javaExample: `long start = System.nanoTime();
// operation to measure
Arrays.sort(largeArray);
long elapsed = System.nanoTime() - start;
System.out.println("Time: " + elapsed / 1_000_000 + " ms");`,
    },
    {
      name: 'Doubling Experiment',
      description: 'Run the algorithm on inputs of size n, 2n, 4n, 8n... and observe how time scales. If time doubles → O(n). If time quadruples → O(n²).',
      javaExample: `for (int n = 1000; n <= 128000; n *= 2) {
    int[] arr = generateRandom(n);
    long start = System.nanoTime();
    bubbleSort(arr);
    long ms = (System.nanoTime() - start) / 1_000_000;
    System.out.printf("n=%6d  time=%5d ms  ratio=%.1f%n",
        n, ms, (double) ms / prevMs);
    prevMs = ms;
}
// If ratio ≈ 4 → O(n²). If ratio ≈ 2 → O(n).`,
    },
    {
      name: 'Comparing Implementations',
      description: 'Run different data structures/algorithms on the same dataset and compare. This validates theoretical analysis with practical results.',
      javaExample: `int n = 100_000;
List<Integer> arrayList = new ArrayList<>();
List<Integer> linkedList = new LinkedList<>();

// Measure ArrayList add-at-front
long start = System.nanoTime();
for (int i = 0; i < n; i++) arrayList.add(0, i);
long alTime = System.nanoTime() - start;

// Measure LinkedList add-at-front
start = System.nanoTime();
for (int i = 0; i < n; i++) linkedList.add(0, i);
long llTime = System.nanoTime() - start;

// LinkedList should be much faster here`,
    },
  ],
};
