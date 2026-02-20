
import React, { useState, useEffect, useRef } from 'react';
import { ProjectIdea, Message } from '../types';
import { getAIAdvice } from '../services/geminiService';

interface ChatModalProps {
  idea: ProjectIdea;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { 
        role: 'model', 
        text: `أهلاً بك في الدعم التقني لـ AuraSync! أنا هنا للإجابة على تساؤلاتك حول تقنيات ترجمة الفيديو ومطابقة الشفاه. كيف أساعدك اليوم؟` 
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getAIAdvice(input);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-xl h-[600px] rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-white/5 p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-xl shadow-lg shadow-purple-600/30">👄</div>
            <div>
              <h3 className="font-bold text-white leading-none">مستشار AuraSync</h3>
              <p className="text-[10px] text-purple-400 mt-1 uppercase tracking-widest font-bold">الخبير التقني</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none shadow-lg shadow-purple-600/20' 
                : 'bg-white/5 text-slate-200 border border-white/10 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-end">
              <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10 flex gap-1">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 bg-slate-900 border-t border-white/10">
          <div className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل عن تقنيات الدبلجة..."
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-purple-600/20 active:scale-90"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
