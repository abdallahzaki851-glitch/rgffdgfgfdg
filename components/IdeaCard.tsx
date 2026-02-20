
import React from 'react';
import { ProjectIdea } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface IdeaCardProps {
  idea: ProjectIdea;
  onConsult: (idea: ProjectIdea) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onConsult }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{idea.icon}</div>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            مطلوب بقوة
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-800">{idea.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {idea.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">لماذا هذا المشروع؟</h4>
          <p className="text-xs text-slate-500 italic">{idea.demandReason}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {idea.technologies.map((tech) => (
            <span key={tech} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-medium">
              {tech}
            </span>
          ))}
        </div>

        <div className="h-24 w-full mb-6">
          <p className="text-[10px] text-slate-400 mb-1 text-center">ترند الطلب (2022-2024)</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={idea.marketTrend}>
              <defs>
                <linearGradient id={`colorValue-${idea.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill={`url(#colorValue-${idea.id})`} 
              />
              <Tooltip 
                contentStyle={{ fontSize: '10px', borderRadius: '8px' }} 
                labelStyle={{ display: 'none' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <button 
          onClick={() => onConsult(idea)}
          className="w-full py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>استشر الذكاء الاصطناعي</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;
