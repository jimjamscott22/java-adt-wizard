import { Layers, ListOrdered, Hash, Link2, TreePine, ArrowUpDown } from 'lucide-react';

const pythonAdtData = [
  {
    type: 'STACK',
    name: 'Stack (list)',
    icon: Layers,
    color: 'from-blue-500 to-blue-700',
    description: 'Last-In, First-Out (LIFO) using Python\'s built-in list. append() pushes, pop() removes from the end.',
    timeComplexity: 'O(1) append/pop',
    bestFor: 'Undo/redo systems, expression evaluation, backtracking algorithms, and function call management.',
    keyOperations: [
      { method: 'append(item)', description: 'Add element to top', complexity: 'O(1)' },
      { method: 'pop()', description: 'Remove and return top element', complexity: 'O(1)' },
      { method: 'stack[-1]', description: 'View top element without removing', complexity: 'O(1)' },
      { method: 'len(stack) == 0', description: 'Check if stack is empty', complexity: 'O(1)' },
      { method: 'len(stack)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `stack = []
stack.append("A")
stack.append("B")
stack.append("C")

print(stack[-1])   # "C"
print(stack.pop())  # "C"
print(len(stack))   # 2`,
  },
  {
    type: 'QUEUE',
    name: 'Queue (deque)',
    icon: ListOrdered,
    color: 'from-emerald-500 to-emerald-700',
    description: 'First-In, First-Out (FIFO) using collections.deque. O(1) operations on both ends.',
    timeComplexity: 'O(1) append/popleft',
    bestFor: 'Task scheduling, breadth-first search, buffering, and order processing systems.',
    keyOperations: [
      { method: 'append(item)', description: 'Add element to rear', complexity: 'O(1)' },
      { method: 'popleft()', description: 'Remove and return front element', complexity: 'O(1)' },
      { method: 'queue[0]', description: 'View front element without removing', complexity: 'O(1)' },
      { method: 'len(queue) == 0', description: 'Check if queue is empty', complexity: 'O(1)' },
      { method: 'len(queue)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `from collections import deque

queue = deque()
queue.append("A")
queue.append("B")
queue.append("C")

print(queue[0])       # "A"
print(queue.popleft()) # "A"
print(len(queue))      # 2`,
  },
  {
    type: 'HASHMAP',
    name: 'Dictionary (dict)',
    icon: Hash,
    color: 'from-amber-500 to-amber-700',
    description: 'Key-value pairs with constant-time lookup. Python\'s built-in dict is hash-based.',
    timeComplexity: 'O(1) avg get/set',
    bestFor: 'Caching, counting frequencies, indexing data, and implementing lookup tables.',
    keyOperations: [
      { method: 'dict[key] = val', description: 'Insert or update key-value pair', complexity: 'O(1) avg' },
      { method: 'dict[key]', description: 'Retrieve value by key', complexity: 'O(1) avg' },
      { method: 'del dict[key]', description: 'Remove entry by key', complexity: 'O(1) avg' },
      { method: 'key in dict', description: 'Check if key exists', complexity: 'O(1) avg' },
      { method: 'len(dict)', description: 'Return number of entries', complexity: 'O(1)' },
    ],
    pythonExample: `scores = {}
scores["Alice"] = 90
scores["Bob"] = 85
scores["Carol"] = 92

print(scores["Bob"])        # 85
print("Eve" in scores)      # False
del scores["Alice"]`,
  },
  {
    type: 'LINKEDLIST',
    name: 'LinkedList (deque)',
    icon: Link2,
    color: 'from-purple-500 to-purple-700',
    description: 'Double-ended queue from collections. Efficient insert/delete at both ends.',
    timeComplexity: 'O(1) insert ends, O(n) index',
    bestFor: 'Implementing queues/deques, frequent insertions/deletions at ends, and building other data structures.',
    keyOperations: [
      { method: 'appendleft(item)', description: 'Insert at beginning', complexity: 'O(1)' },
      { method: 'append(item)', description: 'Insert at end', complexity: 'O(1)' },
      { method: 'popleft()', description: 'Remove first element', complexity: 'O(1)' },
      { method: 'deque[index]', description: 'Access element by index', complexity: 'O(n)' },
      { method: 'len(deque)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `from collections import deque

ll = deque()
ll.append("A")
ll.append("B")
ll.appendleft("Z")

print(ll[0])    # "Z"
print(ll[1])    # "A"
ll.popleft()`,
  },
  {
    type: 'TREEMAP',
    name: 'SortedDict',
    icon: TreePine,
    color: 'from-rose-500 to-rose-700',
    description: 'Sorted key-value store from the sortedcontainers library. Keys stay in sorted order.',
    timeComplexity: 'O(log n) get/set',
    bestFor: 'Maintaining sorted keys, range queries, finding nearest keys, and ordered iteration.',
    keyOperations: [
      { method: 'sd[key] = val', description: 'Insert or update entry (sorted)', complexity: 'O(log n)' },
      { method: 'sd[key]', description: 'Retrieve value by key', complexity: 'O(log n)' },
      { method: 'sd.peekitem(0)', description: 'Get smallest key-value pair', complexity: 'O(1)' },
      { method: 'sd.peekitem(-1)', description: 'Get largest key-value pair', complexity: 'O(1)' },
      { method: 'del sd[key]', description: 'Remove entry by key', complexity: 'O(log n)' },
    ],
    pythonExample: `from sortedcontainers import SortedDict

tree = SortedDict()
tree["Banana"] = 2
tree["Apple"] = 5
tree["Cherry"] = 3

print(tree.peekitem(0))   # ("Apple", 5)
print(tree.peekitem(-1))  # ("Cherry", 3)
print(tree["Banana"])      # 2`,
  },
  {
    type: 'PRIORITYQUEUE',
    name: 'PriorityQueue (heapq)',
    icon: ArrowUpDown,
    color: 'from-cyan-500 to-cyan-700',
    description: 'Min-heap via the heapq module. Smallest element is always at the front.',
    timeComplexity: 'O(log n) push/pop',
    bestFor: 'Dijkstra\'s algorithm, event-driven simulation, job scheduling, and finding top-K elements.',
    keyOperations: [
      { method: 'heappush(heap, item)', description: 'Insert element by priority', complexity: 'O(log n)' },
      { method: 'heappop(heap)', description: 'Remove smallest element', complexity: 'O(log n)' },
      { method: 'heap[0]', description: 'View smallest element', complexity: 'O(1)' },
      { method: 'len(heap) == 0', description: 'Check if heap is empty', complexity: 'O(1)' },
      { method: 'len(heap)', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    pythonExample: `import heapq

pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 20)

print(pq[0])             # 10 (min-heap)
print(heapq.heappop(pq)) # 10
print(pq[0])             # 20`,
  },
];

export default pythonAdtData;
