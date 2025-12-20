
import React from 'react';
import { PersonalizedRoadmap } from '../types';
import { BookOpen, ExternalLink, Zap, Clock, TrendingUp, Trophy, Youtube, Linkedin, UserCircle, Briefcase, Book } from 'lucide-react';

interface RoadmapViewProps {
  roadmap: PersonalizedRoadmap;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Hero Header */}
      <section className="text-center space-y-4 py-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm font-bold tracking-widest uppercase">
          Your Strategic Path
        </div>
        <h1 className="text-4xl md:text-6xl font-black gradient-text tracking-tight leading-tight">
          {roadmap.suggestedRole}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {roadmap.summary}
        </p>
      </section>

      {/* The Roadmap Timeline */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <TrendingUp className="text-sky-400" /> Your Career Roadmap
        </h2>
        <div className="relative pl-8 border-l-2 border-slate-800 space-y-12 py-4">
          {(roadmap.steps || []).map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-[#0f172a] group-hover:scale-125 transition-transform" />
              
              <div className="glass p-6 rounded-2xl hover:border-sky-500/50 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">Step {idx + 1}</span>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 text-slate-400 text-sm font-medium">
                    <Clock size={16} /> {step.timeEstimate}
                  </div>
                </div>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {step.aiAdvantage && (
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                      <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-2">
                        <Zap size={18} /> THE AI ADVANTAGE
                      </div>
                      <p className="text-sm text-slate-300">
                        {step.aiAdvantage}
                      </p>
                    </div>
                  )}

                  {step.portfolioIdea && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-2">
                        <Briefcase size={18} /> PORTFOLIO BUILDER
                      </div>
                      <p className="text-sm text-slate-300">
                        {step.portfolioIdea}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                    <BookOpen size={16} /> Resources & Institutions
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {(step.resources || []).map((res, ridx) => (
                      <a
                        key={ridx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm transition-all group/link"
                      >
                        {res.name}
                        {res.isFree && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">Free</span>}
                        <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Books Section */}
      {roadmap.recommendedBooks && roadmap.recommendedBooks.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Book className="text-amber-400" /> Deep Knowledge (Books)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.recommendedBooks.map((book, bidx) => (
              <div key={bidx} className="glass p-6 rounded-2xl border-l-4 border-amber-500/50">
                <h3 className="text-lg font-bold text-white mb-1">{book.title}</h3>
                <div className="text-sm text-slate-500 mb-3">by {book.author}</div>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  "{book.why}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Career Projections */}
      <section className="grid md:grid-cols-2 gap-8">
        {[
          { data: roadmap.fiveYearOutlook, label: '5-Year Projection', icon: <TrendingUp className="text-sky-400" /> },
          { data: roadmap.tenYearOutlook, label: '10-Year Projection', icon: <Trophy className="text-indigo-400" /> }
        ].map((item, idx) => (
          <div key={idx} className="glass p-8 rounded-3xl border-t-4 border-t-sky-500/50 space-y-6">
            <div className="flex items-center gap-3">
              {item.icon}
              <h2 className="text-2xl font-bold">{item.label}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Target Role</div>
                <div className="text-2xl font-bold text-sky-100">{item.data?.title}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Estimated Salary (Avg)</div>
                <div className="text-3xl font-black text-emerald-400">{item.data?.projectedSalary}</div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                {item.data?.description}
              </p>

              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Core Mastery</div>
                <div className="flex flex-wrap gap-2">
                  {(item.data?.requiredSkills || []).map((s, si) => (
                    <span key={si} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mentors */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <UserCircle size={18} /> Mentors to Follow
              </h3>
              <div className="space-y-3">
                {(item.data?.keyExperts || []).map((exp, ei) => (
                  <div key={ei} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <div>
                      <div className="font-bold text-sm">{exp.name}</div>
                      <div className="text-xs text-slate-500">{exp.role}</div>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={exp.platform === 'youtube' ? `https://www.youtube.com/results?search_query=${encodeURIComponent(exp.name)}` : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(exp.name)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors ${exp.platform === 'youtube' ? 'text-red-500 hover:bg-red-500/10' : 'text-sky-500 hover:bg-sky-500/10'}`}
                      >
                        {exp.platform === 'youtube' ? <Youtube size={18} /> : <Linkedin size={18} />}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Final Call to Action */}
      <div className="text-center pt-10">
        <button 
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl font-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          Generate New Path
        </button>
      </div>
    </div>
  );
};

export default RoadmapView;
