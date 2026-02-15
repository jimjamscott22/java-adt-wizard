import {
  Search,
  SplitSquareHorizontal,
  ArrowDownUp,
  ArrowUpDown,
  Repeat,
  Binary,
  GitMerge,
  Shuffle,
  BarChart3,
} from 'lucide-react';

export const searchAlgorithms = [
  {
    id: 'linear-search',
    title: 'Linear Search',
    icon: Search,
    color: 'from-blue-500 to-blue-700',
    category: 'Search',
    description:
      'Scans each element sequentially from start to end until the target is found or the collection is exhausted. Works on any collection — sorted or unsorted.',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    keyPoints: [
      'No requirement for sorted data',
      'Best case: target is the first element',
      'Works on arrays, linked lists, or any iterable',
      'Simple but inefficient for large datasets',
    ],
    pseudocode: `for i = 0 to array.length - 1:
    if array[i] == target:
        return i
return -1  // not found`,
    javaExample: `public static <T> int linearSearch(T[] arr, T target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i].equals(target)) {
            return i;  // found at index i
        }
    }
    return -1;  // not found
}

// Usage
String[] names = {"Alice", "Bob", "Carol"};
int idx = linearSearch(names, "Bob");  // returns 1`,
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    icon: Binary,
    color: 'from-emerald-500 to-emerald-700',
    category: 'Search',
    description:
      'Divide-and-conquer search that repeatedly halves the search space. Requires a sorted collection. Compares the target to the middle element and eliminates half of the remaining elements each step.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1) iterative / O(log n) recursive' },
    keyPoints: [
      'Requires sorted data — will not work on unsorted collections',
      'Eliminates half the search space each iteration',
      'Much faster than linear search for large datasets',
      'Can be implemented iteratively or recursively',
    ],
    pseudocode: `low = 0, high = array.length - 1
while low <= high:
    mid = (low + high) / 2
    if array[mid] == target:
        return mid
    else if array[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
return -1  // not found`,
    javaExample: `// Iterative binary search
public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;  // avoid overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

// Recursive binary search
public static int binarySearchRec(int[] arr, int target,
                                   int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearchRec(arr, target, mid + 1, high);
    return binarySearchRec(arr, target, low, mid - 1);
}`,
  },
];

export const traversalConcepts = [
  {
    id: 'iterative-traversal',
    title: 'Iterative Traversal',
    icon: Repeat,
    color: 'from-amber-500 to-amber-700',
    category: 'Traversal',
    description:
      'Uses loops (for, while) to visit elements one by one. Iterative solutions use explicit loop control and are generally more memory-efficient since they don\'t add stack frames.',
    keyPoints: [
      'Uses for/while loops with explicit index or pointer',
      'Constant extra space (no recursive call stack)',
      'Often more intuitive for linear data structures',
      'Can be harder to write for tree/graph traversals',
    ],
    javaExample: `// Iterative linked list traversal
Node current = head;
while (current != null) {
    System.out.println(current.data);
    current = current.next;
}

// Iterative array traversal
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// Iterative binary tree traversal (in-order using stack)
Stack<TreeNode> stack = new Stack<>();
TreeNode curr = root;
while (curr != null || !stack.isEmpty()) {
    while (curr != null) {
        stack.push(curr);
        curr = curr.left;
    }
    curr = stack.pop();
    System.out.println(curr.val);
    curr = curr.right;
}`,
  },
  {
    id: 'recursive-traversal',
    title: 'Recursive Traversal',
    icon: GitMerge,
    color: 'from-purple-500 to-purple-700',
    category: 'Traversal',
    description:
      'A method calls itself with a smaller subproblem until reaching a base case. Recursive solutions are often more elegant for tree and graph structures but use O(n) stack space.',
    keyPoints: [
      'Every recursive method needs a base case to stop',
      'Each call adds a frame to the call stack — O(n) space',
      'Natural fit for trees, graphs, and divide-and-conquer',
      'Risk of StackOverflowError for very deep recursion',
    ],
    javaExample: `// Recursive linked list traversal
void printList(Node node) {
    if (node == null) return;    // base case
    System.out.println(node.data);
    printList(node.next);        // recursive step
}

// Recursive binary tree traversals
void inOrder(TreeNode node) {
    if (node == null) return;
    inOrder(node.left);
    System.out.println(node.val);  // in-order: L, root, R
    inOrder(node.right);
}

void preOrder(TreeNode node) {
    if (node == null) return;
    System.out.println(node.val);  // pre-order: root, L, R
    preOrder(node.left);
    preOrder(node.right);
}

// Recursive factorial (classic example)
int factorial(int n) {
    if (n <= 1) return 1;         // base case
    return n * factorial(n - 1);  // recursive step
}`,
  },
  {
    id: 'divide-and-conquer',
    title: 'Divide and Conquer',
    icon: SplitSquareHorizontal,
    color: 'from-rose-500 to-rose-700',
    category: 'Strategy',
    description:
      'A strategy that breaks a problem into smaller subproblems of the same type, solves them recursively, then combines results. Binary search, merge sort, and quick sort all use this approach.',
    keyPoints: [
      'Three steps: Divide → Conquer (solve recursively) → Combine',
      'Subproblems must be the same type as the original',
      'Often leads to O(n log n) or O(log n) solutions',
      'Examples: binary search, merge sort, quick sort',
    ],
    javaExample: `// Classic divide-and-conquer: find max in array
int findMax(int[] arr, int low, int high) {
    // Base case: single element
    if (low == high) return arr[low];

    // Divide
    int mid = (low + high) / 2;

    // Conquer: solve both halves
    int leftMax = findMax(arr, low, mid);
    int rightMax = findMax(arr, mid + 1, high);

    // Combine: return the larger
    return Math.max(leftMax, rightMax);
}

// The pattern is always:
// 1. Base case (smallest subproblem)
// 2. Split the problem in half (or parts)
// 3. Recursively solve each part
// 4. Merge/combine the results`,
  },
];

export const sortingAlgorithms = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    icon: ArrowUpDown,
    color: 'from-red-500 to-red-700',
    category: 'Sorting — Quadratic',
    description:
      'Repeatedly steps through the list, compares adjacent elements, and swaps them if they\'re in the wrong order. The largest unsorted element "bubbles up" to its correct position each pass.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    keyPoints: [
      'Simple to understand and implement',
      'Best case O(n) when array is already sorted (with optimization)',
      'Stable sort — equal elements maintain relative order',
      'Very inefficient for large datasets',
    ],
    pseudocode: `for i = 0 to n-1:
    swapped = false
    for j = 0 to n-i-2:
        if array[j] > array[j+1]:
            swap(array[j], array[j+1])
            swapped = true
    if not swapped: break  // optimization`,
    javaExample: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // already sorted
    }
}`,
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    icon: BarChart3,
    color: 'from-orange-500 to-orange-700',
    category: 'Sorting — Quadratic',
    description:
      'Finds the minimum element in the unsorted portion and places it at the beginning. Divides the array into sorted (left) and unsorted (right) sections, growing the sorted section one element at a time.',
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    keyPoints: [
      'Always O(n²) — no best-case optimization',
      'Minimizes the number of swaps (exactly n-1)',
      'Not stable in its basic form',
      'Simple but outperformed by insertion sort in practice',
    ],
    pseudocode: `for i = 0 to n-1:
    minIndex = i
    for j = i+1 to n-1:
        if array[j] < array[minIndex]:
            minIndex = j
    swap(array[i], array[minIndex])`,
    javaExample: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap minimum with current position
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    icon: ArrowDownUp,
    color: 'from-yellow-500 to-yellow-700',
    category: 'Sorting — Quadratic',
    description:
      'Builds the sorted array one element at a time by inserting each new element into its correct position among the already-sorted elements. Like sorting playing cards in your hand.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    keyPoints: [
      'Best case O(n) for nearly sorted data',
      'Stable and in-place sort',
      'Efficient for small datasets (used in practice for n < ~20)',
      'Adaptive — takes advantage of existing order',
    ],
    pseudocode: `for i = 1 to n-1:
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key:
        array[j+1] = array[j]
        j = j - 1
    array[j+1] = key`,
    javaExample: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    icon: GitMerge,
    color: 'from-emerald-500 to-emerald-700',
    category: 'Sorting — Logarithmic',
    description:
      'A divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges the sorted halves. Guarantees O(n log n) performance regardless of input.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    keyPoints: [
      'Guaranteed O(n log n) — no worst-case degradation',
      'Stable sort — preserves relative order of equal elements',
      'Requires O(n) extra space for merging',
      'Divide-and-conquer: split → sort → merge',
    ],
    pseudocode: `mergeSort(array, low, high):
    if low < high:
        mid = (low + high) / 2
        mergeSort(array, low, mid)
        mergeSort(array, mid+1, high)
        merge(array, low, mid, high)`,
    javaExample: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int mid = (l + r) / 2;
        mergeSort(arr, l, mid);       // sort left half
        mergeSort(arr, mid + 1, r);   // sort right half
        merge(arr, l, mid, r);        // merge halves
    }
}

private static void merge(int[] arr, int l, int mid, int r) {
    int[] left = Arrays.copyOfRange(arr, l, mid + 1);
    int[] right = Arrays.copyOfRange(arr, mid + 1, r + 1);

    int i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j])
            arr[k++] = left[i++];
        else
            arr[k++] = right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}`,
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    icon: Shuffle,
    color: 'from-cyan-500 to-cyan-700',
    category: 'Sorting — Logarithmic',
    description:
      'A divide-and-conquer algorithm that picks a pivot element, partitions the array so elements less than the pivot go left and greater go right, then recursively sorts each partition.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    keyPoints: [
      'Average case O(n log n), worst case O(n²) with bad pivots',
      'In-place — O(log n) space for recursion stack only',
      'Generally fastest in practice for random data',
      'Pivot selection matters: median-of-three avoids worst case',
    ],
    pseudocode: `quickSort(array, low, high):
    if low < high:
        pivotIndex = partition(array, low, high)
        quickSort(array, low, pivotIndex - 1)
        quickSort(array, pivotIndex + 1, high)`,
    javaExample: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];  // choose last element
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // Place pivot in correct position
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
  },
];

export const sortingComparison = [
  { name: 'Bubble Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true },
  { name: 'Selection Sort', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false },
  { name: 'Insertion Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true },
  { name: 'Merge Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true },
  { name: 'Quick Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false },
];
