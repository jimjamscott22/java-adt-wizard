import { Layers, ListOrdered, Hash, Link2, TreePine, ArrowUpDown } from 'lucide-react';

const adtData = [
  {
    type: 'STACK',
    name: 'Stack',
    icon: Layers,
    color: 'from-blue-500 to-blue-700',
    description: 'Last-In, First-Out (LIFO) data structure. Think of a stack of plates.',
    timeComplexity: 'O(1) push/pop',
    bestFor: 'Undo/redo systems, expression evaluation, backtracking algorithms, and function call management.',
    keyOperations: [
      { method: 'push(E item)', description: 'Add element to top', complexity: 'O(1)' },
      { method: 'pop()', description: 'Remove and return top element', complexity: 'O(1)' },
      { method: 'peek()', description: 'View top element without removing', complexity: 'O(1)' },
      { method: 'isEmpty()', description: 'Check if stack is empty', complexity: 'O(1)' },
      { method: 'size()', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    javaExample: `Stack<String> stack = new Stack<>();
stack.push("A");
stack.push("B");
stack.push("C");

System.out.println(stack.peek());  // "C"
System.out.println(stack.pop());   // "C"
System.out.println(stack.size());  // 2`,
  },
  {
    type: 'QUEUE',
    name: 'Queue',
    icon: ListOrdered,
    color: 'from-emerald-500 to-emerald-700',
    description: 'First-In, First-Out (FIFO) data structure. Think of a line at a store.',
    timeComplexity: 'O(1) enqueue/dequeue',
    bestFor: 'Task scheduling, breadth-first search, buffering, and order processing systems.',
    keyOperations: [
      { method: 'add(E item)', description: 'Add element to rear', complexity: 'O(1)' },
      { method: 'poll()', description: 'Remove and return front element', complexity: 'O(1)' },
      { method: 'peek()', description: 'View front element without removing', complexity: 'O(1)' },
      { method: 'isEmpty()', description: 'Check if queue is empty', complexity: 'O(1)' },
      { method: 'size()', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    javaExample: `Queue<String> queue = new LinkedList<>();
queue.add("A");
queue.add("B");
queue.add("C");

System.out.println(queue.peek());  // "A"
System.out.println(queue.poll());  // "A"
System.out.println(queue.size());  // 2`,
  },
  {
    type: 'HASHMAP',
    name: 'HashMap',
    icon: Hash,
    color: 'from-amber-500 to-amber-700',
    description: 'Key-value pairs with constant-time lookup via hashing.',
    timeComplexity: 'O(1) avg get/put',
    bestFor: 'Caching, counting frequencies, indexing data, and implementing lookup tables.',
    keyOperations: [
      { method: 'put(K key, V val)', description: 'Insert or update key-value pair', complexity: 'O(1) avg' },
      { method: 'get(K key)', description: 'Retrieve value by key', complexity: 'O(1) avg' },
      { method: 'remove(K key)', description: 'Remove entry by key', complexity: 'O(1) avg' },
      { method: 'containsKey(K key)', description: 'Check if key exists', complexity: 'O(1) avg' },
      { method: 'size()', description: 'Return number of entries', complexity: 'O(1)' },
    ],
    javaExample: `Map<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);
map.put("Carol", 92);

System.out.println(map.get("Bob"));        // 85
System.out.println(map.containsKey("Eve")); // false
map.remove("Alice");`,
  },
  {
    type: 'LINKEDLIST',
    name: 'LinkedList',
    icon: Link2,
    color: 'from-purple-500 to-purple-700',
    description: 'Sequential nodes linked by references. Efficient insert/delete.',
    timeComplexity: 'O(1) insert, O(n) search',
    bestFor: 'Implementing queues/deques, frequent insertions/deletions, and building other data structures.',
    keyOperations: [
      { method: 'addFirst(E item)', description: 'Insert at beginning', complexity: 'O(1)' },
      { method: 'addLast(E item)', description: 'Insert at end', complexity: 'O(1)' },
      { method: 'removeFirst()', description: 'Remove first element', complexity: 'O(1)' },
      { method: 'get(int index)', description: 'Access element by index', complexity: 'O(n)' },
      { method: 'size()', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    javaExample: `LinkedList<String> list = new LinkedList<>();
list.addLast("A");
list.addLast("B");
list.addFirst("Z");

System.out.println(list.getFirst()); // "Z"
System.out.println(list.get(1));     // "A"
list.removeFirst();`,
  },
  {
    type: 'TREEMAP',
    name: 'TreeMap',
    icon: TreePine,
    color: 'from-rose-500 to-rose-700',
    description: 'Sorted key-value store backed by a Red-Black tree.',
    timeComplexity: 'O(log n) get/put',
    bestFor: 'Maintaining sorted keys, range queries, finding nearest keys, and ordered iteration.',
    keyOperations: [
      { method: 'put(K key, V val)', description: 'Insert or update entry (sorted)', complexity: 'O(log n)' },
      { method: 'get(K key)', description: 'Retrieve value by key', complexity: 'O(log n)' },
      { method: 'firstKey()', description: 'Get smallest key', complexity: 'O(log n)' },
      { method: 'lastKey()', description: 'Get largest key', complexity: 'O(log n)' },
      { method: 'remove(K key)', description: 'Remove entry by key', complexity: 'O(log n)' },
    ],
    javaExample: `TreeMap<String, Integer> tree = new TreeMap<>();
tree.put("Banana", 2);
tree.put("Apple", 5);
tree.put("Cherry", 3);

System.out.println(tree.firstKey()); // "Apple"
System.out.println(tree.lastKey());  // "Cherry"
System.out.println(tree.get("Banana")); // 2`,
  },
  {
    type: 'PRIORITYQUEUE',
    name: 'PriorityQueue',
    icon: ArrowUpDown,
    color: 'from-cyan-500 to-cyan-700',
    description: 'Elements dequeued by priority, backed by a binary heap.',
    timeComplexity: 'O(log n) add/poll',
    bestFor: 'Dijkstra\'s algorithm, event-driven simulation, job scheduling, and finding top-K elements.',
    keyOperations: [
      { method: 'add(E item)', description: 'Insert element by priority', complexity: 'O(log n)' },
      { method: 'poll()', description: 'Remove highest-priority element', complexity: 'O(log n)' },
      { method: 'peek()', description: 'View highest-priority element', complexity: 'O(1)' },
      { method: 'isEmpty()', description: 'Check if queue is empty', complexity: 'O(1)' },
      { method: 'size()', description: 'Return number of elements', complexity: 'O(1)' },
    ],
    javaExample: `PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(30);
pq.add(10);
pq.add(20);

System.out.println(pq.peek()); // 10 (min-heap)
System.out.println(pq.poll()); // 10
System.out.println(pq.peek()); // 20`,
  },
];

export default adtData;
