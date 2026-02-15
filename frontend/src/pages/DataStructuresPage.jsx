import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import adtData from '../data/adtData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const implementations = {
  STACK: {
    backed: 'Array (Deque)',
    javaClass: 'ArrayDeque<E> (preferred) or Stack<E>',
    howItWorks:
      'Uses a resizable array internally. The top of the stack is the last element. Push appends to the end, pop removes from the end — both O(1) amortized.',
    arrayImpl: 'ArrayDeque — resizable array, push/pop at one end.',
    linkedImpl: 'LinkedList — each push/pop manipulates head pointer. O(1) always, but more memory per element due to node pointers.',
  },
  QUEUE: {
    backed: 'Linked List / Array',
    javaClass: 'LinkedList<E> or ArrayDeque<E>',
    howItWorks:
      'LinkedList-backed: add at tail, remove from head — both O(1) via pointers. ArrayDeque-backed: circular array avoids shifting elements.',
    arrayImpl: 'ArrayDeque — circular array, head and tail indices wrap around.',
    linkedImpl: 'LinkedList — doubly-linked nodes, O(1) add at tail and remove from head.',
  },
  HASHMAP: {
    backed: 'Array of Buckets',
    javaClass: 'HashMap<K,V>',
    howItWorks:
      'An array of "buckets." The key\'s hashCode() determines the bucket index. Collisions are handled with linked lists (or trees for 8+ collisions in Java 8+).',
    arrayImpl: 'Array of buckets — hash function maps keys to indices. Resizes when load factor exceeds 0.75.',
    linkedImpl: 'Buckets are linked lists (or red-black trees for long chains). Each bucket handles hash collisions.',
  },
  LINKEDLIST: {
    backed: 'Doubly-Linked Nodes',
    javaClass: 'LinkedList<E>',
    howItWorks:
      'Each element is a Node with data, prev, and next pointers. Insertions/deletions at known positions are O(1) since you just re-link pointers.',
    arrayImpl: 'ArrayList — resizable array. O(1) access, but O(n) insert/delete in the middle (must shift elements).',
    linkedImpl: 'LinkedList — doubly-linked nodes. O(1) insert/delete at ends, O(n) access by index (must traverse).',
  },
  TREEMAP: {
    backed: 'Red-Black Tree',
    javaClass: 'TreeMap<K,V>',
    howItWorks:
      'A self-balancing binary search tree (red-black tree). Keys are stored in sorted order. Rotations after insert/delete maintain O(log n) height.',
    arrayImpl: 'N/A — tree structure required for sorted operations.',
    linkedImpl: 'Red-black tree nodes with left, right, parent pointers and a color bit. Self-balancing guarantees O(log n) height.',
  },
  PRIORITYQUEUE: {
    backed: 'Binary Heap (Array)',
    javaClass: 'PriorityQueue<E>',
    howItWorks:
      'A min-heap stored as an array. Parent at index i, children at 2i+1 and 2i+2. Add sifts up, poll sifts down — both O(log n).',
    arrayImpl: 'Array-based binary heap — compact representation, no pointers needed. Parent-child relationships computed by index.',
    linkedImpl: 'Linked tree heap is possible but rarely used — array representation is more cache-friendly and space-efficient.',
  },
};

export default function DataStructuresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-3">
          Data Structures & <span className="text-primary-400">Implementations</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-2xl leading-relaxed">
          How each abstract data type is implemented under the hood — array-based,
          linked, and tree-based approaches with their trade-offs.
        </p>
      </div>

      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {adtData.map((adt) => {
          const Icon = adt.icon;
          const impl = implementations[adt.type];
          return (
            <motion.div
              key={adt.type}
              variants={item}
              className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${adt.color} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-surface-100">
                    {adt.name}
                  </h3>
                  <p className="text-surface-400 text-sm">{adt.description}</p>
                </div>
                <Link
                  to={`/practice/${adt.type}`}
                  className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors shrink-0"
                >
                  Practice
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Implementation details */}
              <div className="px-6 pb-5 border-t border-surface-700 pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
                    Java Class
                  </span>
                  <code className="text-sm font-mono text-primary-400">
                    {impl.javaClass}
                  </code>
                </div>

                <p className="text-sm text-surface-300 leading-relaxed">
                  {impl.howItWorks}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="bg-surface-900 border border-surface-700 rounded-lg px-4 py-3">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Array-based
                    </span>
                    <p className="text-sm text-surface-400 mt-1">
                      {impl.arrayImpl}
                    </p>
                  </div>
                  <div className="bg-surface-900 border border-surface-700 rounded-lg px-4 py-3">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Linked / Tree
                    </span>
                    <p className="text-sm text-surface-400 mt-1">
                      {impl.linkedImpl}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
