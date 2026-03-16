import StackVisualizer from './StackVisualizer';
import QueueVisualizer from './QueueVisualizer';
import HashMapVisualizer from './HashMapVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';
import TreeMapVisualizer from './TreeMapVisualizer';
import PriorityQueueVisualizer from './PriorityQueueVisualizer';
import { Construction } from 'lucide-react';

const visualizerMap = {
  STACK: StackVisualizer,
  QUEUE: QueueVisualizer,
  HASHMAP: HashMapVisualizer,
  LINKEDLIST: LinkedListVisualizer,
  TREEMAP: TreeMapVisualizer,
  PRIORITYQUEUE: PriorityQueueVisualizer,
};

function ComingSoon({ adtType }) {
  return (
    <div className="bg-surface-800 rounded-xl border border-surface-700 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
      <Construction className="w-12 h-12 text-surface-500 mb-4" />
      <h3 className="text-lg font-semibold text-surface-300">
        {adtType} Visualizer
      </h3>
      <p className="text-surface-500 text-sm mt-2">
        Coming soon! This visualizer is under construction.
      </p>
    </div>
  );
}

export default function Visualizer({ adtType }) {
  const Component = visualizerMap[adtType];
  if (Component) {
    return <Component />;
  }
  return <ComingSoon adtType={adtType} />;
}
