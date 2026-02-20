
import React, { useState } from 'react';
import ChatModal from './components/ChatModal';
import VideoWorkspace from './components/VideoWorkspace';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 font-sans">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight">AURASYNC</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={scrollToUpload} className="bg-white text-slate-950 px-6 py-2 rounded-full text-sm font-bold hover:bg-purple-400 transition-all active:scale-95">ابدأ الآن</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            حوّل محتواك إلى <br />
            لغة <span className="text-purple-500">العالم</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            ارفع فيديوهاتك أو ضع رابط يوتيوب، ودع الذكاء الاصطناعي يقوم بالدبلجة ومطابقة حركة الشفاه بدقة مذهلة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToUpload} className="w-full sm:w-auto px-10 py-4 bg-purple-600 rounded-full font-bold text-lg hover:bg-purple-500 shadow-xl shadow-purple-600/20 transition-all active:scale-95">ابدأ التجربة</button>
            <button onClick={() => setIsChatOpen(true)} className="w-full sm:w-auto px-10 py-4 border border-white/10 rounded-full font-bold text-lg hover:bg-white/5 transition-all">تحدث مع خبير</button>
          </div>
        </div>
      </section>

      {/* Upload & Workspace Section */}
      <VideoWorkspace />

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 text-center bg-slate-900/20 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-600 text-[10px] font-medium tracking-wider">© 2024 AuraSync Technologies. Powered by Gemini Pro.</p>
        </div>
      </footer>

      {isChatOpen && (
        <ChatModal 
          idea={{ id: 'aura', title: 'AuraSync Translator', icon: '👄', description: '' } as any} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
