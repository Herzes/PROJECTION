
import React, { useState } from 'react';
import { UserProfile, GoalTimeline, TECH_INTERESTS } from '../types';
import { ChevronRight, ChevronLeft, User, GraduationCap, Target, Briefcase, Rocket, Tag, X, Plus } from 'lucide-react';

interface QuestionnaireProps {
  onSubmit: (profile: UserProfile) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState('');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    education: '',
    currentBackground: '',
    techKnowledge: '',
    interests: [],
    skills: [],
    projects: '',
    reasonForTech: '',
    timelineGoal: GoalTimeline.FIVE_YEARS,
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const isStepValid = () => {
    if (step === 1) return profile.name && profile.education;
    if (step === 2) return profile.currentBackground && profile.techKnowledge;
    if (step === 3) return profile.interests.length > 0;
    if (step === 4) return profile.skills.length > 0;
    if (step === 5) return profile.reasonForTech;
    return true;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const totalSteps = 6;

  return (
    <div className="max-w-2xl mx-auto glass p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full mx-1 transition-all duration-300 ${
              i + 1 <= step ? 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold">First, who are you?</h2>
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">Your Name</label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              placeholder="e.g. Alex Johnson"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">Highest Education</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              value={profile.education}
              onChange={e => setProfile({ ...profile, education: e.target.value })}
            >
              <option value="">Select Level</option>
              <option value="GCSE">GCSE / High School</option>
              <option value="A-Level">A-Level / College</option>
              <option value="Undergraduate">Undergraduate Degree</option>
              <option value="Postgraduate">Postgraduate Degree</option>
              <option value="Self-Taught">Self-Taught / Other</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold">Your Background</h2>
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">What is your current or past work experience?</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              placeholder="Tell us about what you've done before tech..."
              value={profile.currentBackground}
              onChange={e => setProfile({ ...profile, currentBackground: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">What do you already know about technology?</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              placeholder="e.g. basic Excel, I like gaming, I know what a firewall is..."
              value={profile.techKnowledge}
              onChange={e => setProfile({ ...profile, techKnowledge: e.target.value })}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold">Tech Interests</h2>
          </div>
          <p className="text-slate-400">Select everything that sounds interesting to you.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TECH_INTERESTS.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-3 text-sm rounded-xl border text-left transition-all ${
                  profile.interests.includes(interest)
                    ? 'bg-sky-500/20 border-sky-500 text-sky-100'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold">Your Core Skills</h2>
          </div>
          <p className="text-slate-400">Add tags for skills you have (e.g. "Problem Solving", "Customer Service", "Writing").</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              placeholder="Add a skill..."
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={addSkill}
              className="p-4 bg-sky-600 rounded-xl hover:bg-sky-500 transition-all text-white"
            >
              <Plus size={24} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
            {profile.skills.length === 0 ? (
              <span className="text-slate-600 italic text-sm self-center mx-auto">No skills added yet...</span>
            ) : (
              profile.skills.map(skill => (
                <div key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/30 text-sky-300 rounded-lg text-sm group animate-in zoom-in duration-200">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold">Motivations & Goals</h2>
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">Why do you want to break into tech?</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              placeholder="Income, lifestyle, interest in security..."
              value={profile.reasonForTech}
              onChange={e => setProfile({ ...profile, reasonForTech: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">Where do you want to be in 5 or 10 years?</label>
            <div className="flex gap-4">
              {[GoalTimeline.FIVE_YEARS, GoalTimeline.TEN_YEARS].map((g) => (
                <button
                  key={g}
                  onClick={() => setProfile({ ...profile, timelineGoal: g })}
                  className={`flex-1 p-4 rounded-xl border font-bold transition-all ${
                    profile.timelineGoal === g
                      ? 'bg-sky-500 border-sky-500 text-white shadow-lg'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold">Past Projects</h2>
          </div>
          <div>
            <label className="block text-slate-400 mb-2 text-sm uppercase tracking-wider font-semibold">Any previous projects or side-hustles?</label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              placeholder="Even if it's not tech-related! (e.g. built a shed, organized a local event, ran an Etsy shop)"
              value={profile.projects}
              onChange={e => setProfile({ ...profile, projects: e.target.value })}
            />
          </div>
          <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-200 text-sm">
            💡 <strong>Tip:</strong> Tech is about problem-solving. Listing non-tech projects helps our AI find your "transferable skills".
          </div>
        </div>
      )}

      <div className="flex justify-between mt-12 pt-6 border-t border-slate-700">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-slate-700'
          }`}
        >
          <ChevronLeft size={20} /> Back
        </button>
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-8 py-3 bg-sky-600 rounded-xl font-bold shadow-lg shadow-sky-900/40 hover:bg-sky-500 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Next <ChevronRight size={20} />
          </button>
        ) : (
          <button
            onClick={() => onSubmit(profile)}
            className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-xl font-bold shadow-xl shadow-sky-900/40 hover:from-sky-500 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all"
          >
            Generate My Roadmap <Rocket size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
