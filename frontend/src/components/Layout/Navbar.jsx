import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-surface-900 border-b border-surface-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors">
            <Code2 className="w-6 h-6" />
            <span className="text-lg font-semibold">ADT Practice</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-surface-300 hover:text-surface-100 transition-colors text-sm font-medium"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
