import { Zap, Search, TrendingUp, BarChart3, Flame, Infinity } from 'lucide-react';

export const complexityClasses = [
  {
    id: 'constant',
    notation: 'O(1)',
    name: 'Constant',
    icon: Zap,
    color: 'from-emerald-500 to-emerald-700',
    description:
      'The operation takes the same amount of time regardless of input size. Accessing an array element by index or pushing onto a stack are constant-time operations.',
    examples: [
      'Array access by index: arr[5]',
      'Stack push / pop',
      'HashMap get / put (average)',
      'Checking if a number is even/odd',
    ],
    javaExample: `// O(1) — always one step regardless of array size
int first = arr[0];

// O(1) — HashMap lookup (average case)
String value = map.get("key");

// O(1) — Stack push
stack.push(42);`,
    growthDescription: 'Does not grow with input size. 10 elements or 10 million — same time.',
  },
  {
    id: 'logarithmic',
    notation: 'O(log n)',
    name: 'Logarithmic',
    icon: Search,
    color: 'from-blue-500 to-blue-700',
    description:
      'The operation halves the problem size each step. Binary search is the classic example. Doubling the input adds only one more step.',
    examples: [
      'Binary search on sorted array',
      'TreeMap get / put',
      'Balanced BST operations',
      'Finding an element in a sorted set',
    ],
    javaExample: `// O(log n) — binary search halves the search space
int idx = Collections.binarySearch(sortedList, target);

// O(log n) — TreeMap operations
TreeMap<String, Integer> tree = new TreeMap<>();
tree.put("key", value);   // O(log n)
tree.get("key");           // O(log n)`,
    growthDescription: 'Very slow growth. n=1,000 → ~10 steps. n=1,000,000 → ~20 steps.',
  },
  {
    id: 'linear',
    notation: 'O(n)',
    name: 'Linear',
    icon: TrendingUp,
    color: 'from-amber-500 to-amber-700',
    description:
      'The time grows proportionally with input size. Scanning every element in a list once is linear. Double the input, double the time.',
    examples: [
      'Linear search through unsorted array',
      'Iterating through a list',
      'Finding max/min in unsorted data',
      'Copying an array',
    ],
    javaExample: `// O(n) — must check every element
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}

// O(n) — linear search
boolean found = list.contains(target);`,
    growthDescription: 'Proportional growth. 2x input = 2x time. 10x input = 10x time.',
  },
  {
    id: 'linearithmic',
    notation: 'O(n log n)',
    name: 'Linearithmic',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-700',
    description:
      'Slightly worse than linear, this is the best possible complexity for comparison-based sorting. Merge sort and efficient quick sort achieve this bound.',
    examples: [
      'Merge sort',
      'Quick sort (average case)',
      'Java\'s Arrays.sort() / Collections.sort()',
      'Building a balanced BST from sorted data',
    ],
    javaExample: `// O(n log n) — Java's built-in sort
Arrays.sort(arr);
Collections.sort(list);

// O(n log n) — merge sort
// splits into log n levels, each level processes n elements
mergeSort(arr, 0, arr.length - 1);`,
    growthDescription: 'Grows slightly faster than linear. n=1,000 → ~10,000 ops. n=1,000,000 → ~20,000,000 ops.',
  },
  {
    id: 'quadratic',
    notation: 'O(n²)',
    name: 'Quadratic',
    icon: Flame,
    color: 'from-rose-500 to-rose-700',
    description:
      'Time grows with the square of input size, typically from nested loops over the same data. Bubble sort and selection sort are classic quadratic algorithms.',
    examples: [
      'Bubble sort / selection sort / insertion sort',
      'Checking all pairs in an array',
      'Nested loop comparisons',
      'Simple matrix operations',
    ],
    javaExample: `// O(n²) — nested loops over same data
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (arr[i] + arr[j] == target) {
            // found a pair
        }
    }
}

// O(n²) — bubble sort
// outer loop × inner loop = n × n`,
    growthDescription: 'Grows rapidly. n=100 → 10,000 ops. n=10,000 → 100,000,000 ops. Impractical for large n.',
  },
  {
    id: 'exponential',
    notation: 'O(2ⁿ)',
    name: 'Exponential',
    icon: Infinity,
    color: 'from-red-500 to-red-700',
    description:
      'Time doubles with each additional input element. Brute-force solutions to problems like generating all subsets or the naive recursive Fibonacci are exponential.',
    examples: [
      'Generating all subsets of a set',
      'Naive recursive Fibonacci',
      'Brute-force traveling salesman',
      'Tower of Hanoi',
    ],
    javaExample: `// O(2ⁿ) — naive Fibonacci (don't do this!)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
    // each call branches into 2 more calls
}

// O(2ⁿ) — generating all subsets
void subsets(int[] arr, int i, List<Integer> current) {
    if (i == arr.length) {
        System.out.println(current);
        return;
    }
    subsets(arr, i + 1, current);         // exclude
    current.add(arr[i]);
    subsets(arr, i + 1, current);         // include
    current.remove(current.size() - 1);
}`,
    growthDescription: 'Explosive growth. n=20 → ~1,000,000 ops. n=40 → ~1,000,000,000,000 ops. Only feasible for very small n.',
  },
];

export const caseAnalysis = {
  title: 'Best, Worst, and Expected Case',
  description:
    'Big O describes an upper bound on growth rate, but performance varies by input. We analyze three cases to understand the full picture.',
  cases: [
    {
      name: 'Best Case',
      symbol: 'Ω (Omega)',
      description: 'The minimum time an algorithm takes for any input of size n. Often an optimistic scenario (e.g., data is already sorted).',
      example: 'Insertion sort on a sorted array → O(n), just one pass with no shifts.',
    },
    {
      name: 'Worst Case',
      symbol: 'O (Big O)',
      description: 'The maximum time an algorithm takes for any input of size n. This is the guarantee — it will never be worse than this.',
      example: 'Quick sort with a bad pivot (already sorted data, picking first element) → O(n²).',
    },
    {
      name: 'Expected (Average) Case',
      symbol: 'Θ (Theta)',
      description: 'The expected time averaged over all possible inputs of size n. Often the most practical measure for typical usage.',
      example: 'Quick sort with random pivot → O(n log n) on average across random inputs.',
    },
  ],
};

export const operationsCheatSheet = [
  { structure: 'Array (unsorted)', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)' },
  { structure: 'Array (sorted)', access: 'O(1)', search: 'O(log n)', insert: 'O(n)', delete: 'O(n)' },
  { structure: 'LinkedList', access: 'O(n)', search: 'O(n)', insert: 'O(1)*', delete: 'O(1)*' },
  { structure: 'Stack', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
  { structure: 'Queue', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
  { structure: 'HashMap', access: 'N/A', search: 'O(1) avg', insert: 'O(1) avg', delete: 'O(1) avg' },
  { structure: 'TreeMap', access: 'N/A', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)' },
  { structure: 'HashSet', access: 'N/A', search: 'O(1) avg', insert: 'O(1) avg', delete: 'O(1) avg' },
  { structure: 'TreeSet', access: 'N/A', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)' },
  { structure: 'PriorityQueue', access: 'O(n)', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)' },
];
