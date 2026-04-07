
import React, { useState } from 'react';
import { UserProfile, PersonalizedRoadmap } from './types';
import { generateCareerRoadmap } from './services/geminiService';
import Questionnaire from './components/Questionnaire';
import RoadmapView from './components/RoadmapView';
import { Compass, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'form' | 'loading' | 'results' | 'error'>('welcome');
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setView('loading');
    try {
      const data = await generateCareerRoadmap(profile);
      setRoadmap(data);
      setView('results');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate your projection. Please try again.");
      setView('error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0f172a]" />
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-900/20 blur-[150px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full -z-10" />

      {/* Nav */}
      <nav className="p-6 md:px-12 flex justify-between items-center sticky top-0 z-50 glass mb-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('welcome')}>
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Compass className="text-white" size={24} />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter">PROJECTION</span>
            <span className="text-[10px] font-bold text-sky-400 tracking-widest uppercase">By Dedidox Softcraft</span>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-400">
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Resources</a>
          <a href="#" className="hover:text-white transition-colors">Mentors</a>
        </div>
      </nav>

      <main className="container mx-auto px-6 max-w-7xl">
        {view === 'welcome' && (
          <div className="flex flex-col items-center text-center justify-center min-h-[70vh] space-y-8 py-20">
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">
                <Sparkles size={14} /> Future-Proof Your Career
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                Leverage Your <span className="gradient-text italic">Legacy</span>,<br />
                Master Your <span className="text-white">Future</span>.
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Transition into Tech and Cybersecurity using what you already know. 
                Personalized roadmaps, AI-enhanced portfolio projects, and 10-year growth strategies.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <button
                onClick={() => setView('form')}
                className="px-10 py-5 bg-sky-600 hover:bg-sky-500 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-sky-900/40 hover:scale-105 active:scale-95 transition-all"
              >
                Start My Projection
              </button>
              <button className="px-10 py-5 bg-slate-800/50 hover:bg-slate-700 text-white text-lg font-bold rounded-2xl border border-slate-700 transition-all">
                See Examples
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-in fade-in duration-1000 delay-500">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">2025+</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Job Market Data</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">Free</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Certifications</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">AI-First</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Portfolio Strategy</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">10Y+</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Growth Vision</div>
              </div>
            </div>
          </div>
        )}

        {view === 'form' && (
          <div className="py-10">
            <h2 className="text-center text-3xl font-black mb-10 tracking-tight uppercase">Let's build your plan</h2>
            <Questionnaire onSubmit={handleFormSubmit} />
          </div>
        )}

        {view === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-sky-500/20 animate-pulse" />
              <Loader2 className="text-sky-500 absolute top-0 left-0 animate-spin w-20 h-20" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">Mapping Your Potential...</h3>
              <p className="text-slate-400 animate-pulse">Scanning 2025 industry trends and finding the perfect role for your skills.</p>
            </div>
            <div className="max-w-md p-6 bg-slate-900 rounded-2xl border border-slate-800 text-sm text-slate-500 italic text-center">
              "In 2025, careers are built at the intersection of unique human backgrounds and AI automation."
            </div>
          </div>
        )}

        {view === 'results' && roadmap && (
          <div className="py-10">
            <RoadmapView roadmap={roadmap} />
          </div>
        )}

        {view === 'error' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
            <div className="p-4 bg-red-500/10 rounded-full text-red-500">
              <AlertCircle size={48} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">Projection Failed</h3>
              <p className="text-red-400/80">{error}</p>
            </div>
            <button
              onClick={() => setView('form')}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-800/50 py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Compass className="text-slate-500" size={20} />
              <span className="text-slate-500 font-bold tracking-tighter uppercase">Projection &copy; 2025</span>
            </div>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">A product of Dedidox Softcraft</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
};

export default App;
