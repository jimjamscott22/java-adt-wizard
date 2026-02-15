import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, ChevronDown, Menu, X } from 'lucide-react';

const learnLinks = [
  { to: '/learn/oop', label: 'OOP Concepts' },
  { to: '/learn/algorithms', label: 'Algorithms' },
  { to: '/learn/data-structures', label: 'Data Structures' },
  { to: '/learn/complexity', label: 'Complexity Analysis' },
  { to: '/learn/strategies', label: 'Strategies & Trade-offs' },
];

function Dropdown({ label, links, currentPath }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const isActive = links.some((l) => currentPath.startsWith(l.to));

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          isActive
            ? 'text-primary-400'
            : 'text-surface-300 hover:text-surface-100'
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-surface-800 border border-surface-700 rounded-lg shadow-xl py-1 z-50">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm transition-colors ${
                currentPath === link.to
                  ? 'text-primary-400 bg-surface-700/50'
                  : 'text-surface-300 hover:text-surface-100 hover:bg-surface-700/30'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-surface-900 border-b border-surface-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors"
          >
            <Code2 className="w-6 h-6" />
            <span className="text-lg font-semibold">ADT Practice</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                currentPath === '/'
                  ? 'text-primary-400'
                  : 'text-surface-300 hover:text-surface-100'
              }`}
            >
              Practice
            </Link>
            <Dropdown
              label="Learn"
              links={learnLinks}
              currentPath={currentPath}
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 text-surface-300 hover:text-surface-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-surface-700 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                currentPath === '/'
                  ? 'text-primary-400 bg-surface-800'
                  : 'text-surface-300 hover:bg-surface-800'
              }`}
            >
              Practice
            </Link>
            <div className="px-3 py-2 text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Learn
            </div>
            {learnLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  currentPath === link.to
                    ? 'text-primary-400 bg-surface-800'
                    : 'text-surface-300 hover:bg-surface-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
