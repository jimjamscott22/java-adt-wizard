import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Settings } from 'lucide-react';
import { sendChatMessage, DEFAULT_SETTINGS } from '../../utils/chatApi';

const STORAGE_KEY = 'chatPanelSettings';

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    // ignore parse errors
  }
  return { ...DEFAULT_SETTINGS };
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

/** Renders message content, wrapping `backtick` spans in styled <code>. */
function MessageContent({ content }) {
  const parts = content.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code
              key={i}
              className="font-mono bg-surface-800 rounded px-1 text-primary-400 text-[0.85em]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/** Three animated dots for the "thinking" indicator. */
function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 h-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-surface-400 inline-block"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

export default function ChatPanel({ isOpen, onClose, context }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(loadSettings);
  const [settingsDraft, setSettingsDraft] = useState(loadSettings);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when messages change or loading state toggles
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 24;
    const maxHeight = lineHeight * 4 + 16; // 4 rows + padding
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
  }, [input]);

  function buildApiMessages(userContent) {
    const systemContent = context
      ? `You are a helpful Java and Python programming assistant. The user is currently ${context}. Keep answers concise and educational.`
      : 'You are a helpful Java and Python programming assistant. Keep answers concise and educational.';

    const systemMsg = { role: 'system', content: systemContent };
    const history = messages.map(({ role, content }) => ({ role, content }));
    return [systemMsg, ...history, { role: 'user', content: userContent }];
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = buildApiMessages(text);
      const reply = await sendChatMessage(apiMessages, settings);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, timestamp: new Date() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: err.message || 'An unexpected error occurred.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSettingsSave() {
    setSettings({ ...settingsDraft });
    saveSettings(settingsDraft);
    setShowSettings(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface-900 border-l border-surface-700 z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-100">AI Assistant</h3>
                  <span className="text-xs text-surface-400">
                    {context ? context : 'Java & Python helper'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSettingsDraft({ ...settings });
                    setShowSettings((v) => !v);
                  }}
                  className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Inline Settings Form */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className="px-6 py-4 border-b border-surface-700 bg-surface-800 flex-shrink-0 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs font-semibold text-surface-400 uppercase tracking-wide">
                    LLM Settings
                  </p>

                  <div className="space-y-1">
                    <label className="text-xs text-surface-400">Provider</label>
                    <select
                      className="w-full bg-surface-900 border border-surface-600 rounded-lg px-3 py-2 text-sm text-surface-100 focus:border-primary-500 focus:outline-none"
                      value={settingsDraft.provider}
                      onChange={(e) =>
                        setSettingsDraft((d) => ({ ...d, provider: e.target.value }))
                      }
                    >
                      <option value="ollama">Ollama</option>
                      <option value="lmstudio">LM Studio</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-surface-400">Endpoint URL</label>
                    <input
                      type="text"
                      className="w-full bg-surface-900 border border-surface-600 rounded-lg px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:border-primary-500 focus:outline-none"
                      value={settingsDraft.endpoint}
                      onChange={(e) =>
                        setSettingsDraft((d) => ({ ...d, endpoint: e.target.value }))
                      }
                      placeholder="http://localhost:11434"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-surface-400">Model</label>
                    <input
                      type="text"
                      className="w-full bg-surface-900 border border-surface-600 rounded-lg px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:border-primary-500 focus:outline-none"
                      value={settingsDraft.model}
                      onChange={(e) =>
                        setSettingsDraft((d) => ({ ...d, model: e.target.value }))
                      }
                      placeholder="llama3.2"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSettingsSave}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg px-3 py-2 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 bg-surface-700 hover:bg-surface-600 text-surface-200 text-sm font-medium rounded-lg px-3 py-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center opacity-70">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    Ask me anything about Java or Python!
                  </p>
                  {context && (
                    <p className="text-xs text-surface-500 italic">{context}</p>
                  )}
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-sm leading-relaxed'
                        : msg.isError
                        ? 'bg-surface-700 border border-amber-600/40 text-amber-400 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm leading-relaxed'
                        : 'bg-surface-700 text-surface-200 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm leading-relaxed'
                    }
                  >
                    <MessageContent content={msg.content} />
                  </div>
                  {msg.timestamp && (
                    <span className="text-xs text-surface-500 mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {loading && (
                <motion.div
                  className="flex flex-col items-start"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-surface-700 text-surface-400 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <ThinkingDots />
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-surface-700 p-4">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  className="flex-1 bg-surface-900 border border-surface-600 rounded-xl resize-none text-surface-100 placeholder:text-surface-500 focus:border-primary-500 focus:outline-none px-4 py-2.5 text-sm leading-6 transition-colors"
                  placeholder="Ask a question… (Enter to send, Shift+Enter for newline)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl p-2.5 transition-colors flex-shrink-0"
                  aria-label="Send"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
