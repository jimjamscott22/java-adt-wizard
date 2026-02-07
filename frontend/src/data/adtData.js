import { Layers, ListOrdered, Hash, Link2, TreePine, ArrowUpDown } from 'lucide-react';

const adtData = [
  {
    type: 'STACK',
    name: 'Stack',
    icon: Layers,
    color: 'from-blue-500 to-blue-700',
    description: 'Last-In, First-Out (LIFO) data structure. Think of a stack of plates.',
    timeComplexity: 'O(1) push/pop',
  },
  {
    type: 'QUEUE',
    name: 'Queue',
    icon: ListOrdered,
    color: 'from-emerald-500 to-emerald-700',
    description: 'First-In, First-Out (FIFO) data structure. Think of a line at a store.',
    timeComplexity: 'O(1) enqueue/dequeue',
  },
  {
    type: 'HASHMAP',
    name: 'HashMap',
    icon: Hash,
    color: 'from-amber-500 to-amber-700',
    description: 'Key-value pairs with constant-time lookup via hashing.',
    timeComplexity: 'O(1) avg get/put',
  },
  {
    type: 'LINKEDLIST',
    name: 'LinkedList',
    icon: Link2,
    color: 'from-purple-500 to-purple-700',
    description: 'Sequential nodes linked by references. Efficient insert/delete.',
    timeComplexity: 'O(1) insert, O(n) search',
  },
  {
    type: 'TREEMAP',
    name: 'TreeMap',
    icon: TreePine,
    color: 'from-rose-500 to-rose-700',
    description: 'Sorted key-value store backed by a Red-Black tree.',
    timeComplexity: 'O(log n) get/put',
  },
  {
    type: 'PRIORITYQUEUE',
    name: 'PriorityQueue',
    icon: ArrowUpDown,
    color: 'from-cyan-500 to-cyan-700',
    description: 'Elements dequeued by priority, backed by a binary heap.',
    timeComplexity: 'O(log n) add/poll',
  },
];

export default adtData;
