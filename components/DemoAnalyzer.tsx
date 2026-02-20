
import React, { useState } from 'react';
import { analyzeVideoChallenge } from '../services/geminiService';

const DemoAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await analyzeVideoChallenge(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-6 text-center">اختبر ذكاء المحلل التقني</h3>
      <div className="space-y-4">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="صف الفيديو (مثلاً: فيديو تعليمي طبي باللغة الإنجليزية مدته 5 دقائق...)"
          className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-sm focus:border-purple-500 focus:outline-none h-32 transition-all"
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading || !input.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? 'جاري التحليل التخيلي...' : 'تحليل تحديات الترجمة'}
        </button>

        {result && (
          <div className="mt-6 p-6 bg-purple-600/10 border border-purple-500/20 rounded-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">نتائج التحليل</span>
              <span className={`text-[10px] px-2 py-1 rounded bg-slate-800 font-bold ${result.difficulty === 'صعب' ? 'text-red-400' : 'text-green-400'}`}>
                الصعوبة: {result.difficulty}
              </span>
            </div>
            <p className="text-sm text-slate-200 mb-4 leading-relaxed">{result.summary}</p>
            <div className="flex flex-wrap gap-2">
              {result.tech?.map((t: string) => (
                <span key={t} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 text-slate-400">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoAnalyzer;
