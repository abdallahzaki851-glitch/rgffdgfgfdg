
import React, { useState, useRef, useEffect } from 'react';

const VideoWorkspace: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [inputMode, setInputMode] = useState<'upload' | 'youtube'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'ar' | 'en'>('en');
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setYoutubeId(null);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      startProcessing();
    }
  };

  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYoutubeId(youtubeUrl);
    if (!id) {
      alert('يرجى إدخال رابط يوتيوب صحيح');
      return;
    }
    
    setYoutubeId(id);
    // For the demo, we use the YouTube ID to show the video
    // and a sample MP4 for the "Download" functionality
    setPreviewUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'); 
    startProcessing();
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    setIsFinished(false);
    
    const steps = [
      { p: 10, s: 'جاري تحليل الفيديو...' },
      { p: 40, s: 'ترجمة النص الصوتي...' },
      { p: 70, s: 'توليد الصوت ومطابقة الشفاه...' },
      { p: 100, s: 'تمت المعالجة!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatus(steps[currentStep].s);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setIsFinished(true);
        }, 500);
      }
    }, 600);
  };

  const handleDownload = async () => {
    if (!previewUrl) return;
    
    try {
      // If it's a local blob URL (from upload), fetch will work perfectly
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translated-video-${selectedLang}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      // Fallback for cross-origin URLs (like the YouTube sample)
      const a = document.createElement('a');
      a.href = previewUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      // This might just open in a new tab if CORS is not set on the server
      a.setAttribute('download', `translated-video-${selectedLang}.mp4`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const reset = () => {
    setYoutubeUrl('');
    setYoutubeId(null);
    setPreviewUrl(null);
    setIsFinished(false);
    setProgress(0);
  };

  const toggleLanguage = (lang: 'ar' | 'en') => {
    setIsSwitching(true);
    setSelectedLang(lang);
    setTimeout(() => setIsSwitching(false), 1000);
  };

  return (
    <div id="upload-section" className="max-w-4xl mx-auto px-6 py-12">
      {!previewUrl && !isProcessing && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex justify-center gap-4 mb-10">
            <button 
              onClick={() => setInputMode('upload')}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all ${inputMode === 'upload' ? 'bg-purple-600' : 'bg-white/5 text-slate-400'}`}
            >
              رفع فيديو
            </button>
            <button 
              onClick={() => setInputMode('youtube')}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all ${inputMode === 'youtube' ? 'bg-purple-600' : 'bg-white/5 text-slate-400'}`}
            >
              رابط يوتيوب
            </button>
          </div>

          {inputMode === 'upload' ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-2xl p-16 text-center cursor-pointer hover:border-purple-500/50 transition-all"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
              <div className="text-purple-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-lg font-bold">اضغط لرفع الفيديو</p>
            </div>
          ) : (
            <form onSubmit={handleYoutubeSubmit} className="space-y-6">
              <input 
                type="url" 
                placeholder="ضع رابط يوتيوب هنا..." 
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none"
                required
              />
              <button type="submit" className="w-full bg-purple-600 py-4 rounded-2xl font-bold hover:bg-purple-500 transition-all">
                ابدأ المعالجة
              </button>
            </form>
          )}
        </div>
      )}

      {isProcessing && (
        <div className="text-center py-20">
          <div className="w-24 h-24 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <h3 className="text-2xl font-bold mb-2">{status}</h3>
          <p className="text-slate-400">{progress}%</p>
        </div>
      )}

      {isFinished && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-2xl font-bold">الفيديو جاهز</h3>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => toggleLanguage('en')}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${selectedLang === 'en' ? 'bg-purple-600' : 'text-slate-400'}`}
              >
                English
              </button>
              <button 
                onClick={() => toggleLanguage('ar')}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${selectedLang === 'ar' ? 'bg-purple-600' : 'text-slate-400'}`}
              >
                العربية
              </button>
            </div>
          </div>

          <div className="aspect-video bg-black rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
            {isSwitching && (
              <div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="font-bold">جاري تبديل المسار الصوتي...</p>
                </div>
              </div>
            )}
            
            {youtubeId ? (
              <iframe 
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <video key={selectedLang} src={previewUrl || ''} controls className="w-full h-full object-cover" />
            )}
            
            <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {selectedLang === 'en' ? 'English Dubbed' : 'مدبلج بالعربية'}
            </div>

            <div className="absolute bottom-10 left-0 right-0 text-center px-6 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 inline-block max-w-md">
                <p className="text-sm md:text-base font-bold">
                  {selectedLang === 'en' ? 
                    "This is a simulated translation of your video using AuraSync AI." : 
                    "هذه محاكاة لترجمة الفيديو الخاص بك باستخدام تقنية AuraSync."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleDownload}
              className="flex-1 bg-purple-600 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-purple-500 transition-all active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تحميل الفيديو المترجم
            </button>
            <button 
              onClick={reset}
              className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              تجربة فيديو آخر
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoWorkspace;
