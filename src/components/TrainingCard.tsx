import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { TrainingModule } from '../data/modules';
import { VideoPlayer } from './VideoPlayer';

interface TrainingCardProps {
  module: TrainingModule;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ module }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  
  // Track completed objectives locally for rich user interactivity
  const [completedObjectives, setCompletedObjectives] = useState<Record<number, boolean>>({});

  const handleObjectiveToggle = (index: number) => {
    setCompletedObjectives(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Automatically check objectives sequentially as video progresses
  const handleProgressUpdate = (progressPercent: number) => {
    const totalCount = module.objectives.length;
    if (totalCount === 0) return;
    
    const stepRatio = 100 / totalCount;
    setCompletedObjectives(prev => {
      let updated = false;
      const next = { ...prev };
      
      for (let i = 0; i < totalCount; i++) {
        const threshold = (i + 1) * stepRatio;
        
        // Auto-check if video passes this threshold
        if (progressPercent >= threshold && !next[i]) {
          next[i] = true;
          updated = true;
        }
        
        // Uncheck if video is restarted
        if (progressPercent === 0 && next[i]) {
          next[i] = false;
          updated = true;
        }
      }
      return updated ? next : prev;
    });
  };

  const totalObjectivesCount = module.objectives.length;
  const completedObjectivesCount = Object.values(completedObjectives).filter(Boolean).length;
  const checklistProgressPercentage = Math.round((completedObjectivesCount / totalObjectivesCount) * 100);

  // Dynamically resolve icon from Lucide React
  const IconComponent = (Icons as any)[module.iconName] || Icons.HelpCircle;

  // Stagger variants for card internal elements
  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 15 } }
      }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 glass-card p-5 group select-none transition-all duration-500 ${
        module.accentColor === 'gold' 
          ? 'border-t-4 border-t-brand-gold hover:border-brand-gold/40' 
          : 'border-t-4 border-t-brand-navy hover:border-brand-navy/60'
      } ${
        isHovered 
          ? (module.accentColor === 'gold' ? 'glow-card-gold bg-slate-900/65' : 'glow-card-navy bg-slate-900/65') 
          : 'bg-slate-900/40'
      }`}
    >
      {/* Visual background gloss sheen reflection overlay */}
      <div 
        className={`sheen-overlay ${isHovered ? 'animate-sheen-run' : ''}`} 
      />

      {/* Card Content Layout */}
      <div>
        {/* Top Header Badge Row */}
        <motion.div variants={childVariants} className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
            module.category === 'Leads' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
            module.category === 'Bookings' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
            module.category === 'Quotes' ? 'bg-amber-500/10 text-brand-gold border-brand-gold/20' :
            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            {module.category}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
            <Icons.Layers className="w-3 h-3 text-slate-500" />
            {module.difficulty}
          </span>
        </motion.div>

        {/* Heading & Icon */}
        <motion.div variants={childVariants} className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-brand-gold transition-colors duration-300">
            {module.title}
          </h3>
          <div className={`p-2.5 rounded-lg border flex-shrink-0 transition-colors duration-300 ${
            module.accentColor === 'gold'
              ? 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold/20'
              : 'bg-brand-navy/30 border-brand-navy/40 text-blue-300 group-hover:bg-brand-navy/50'
          }`}>
            <IconComponent className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Media (Video Mock Player) Section */}
        <motion.div variants={childVariants} className="mb-4">
          <VideoPlayer
            moduleTitle={module.title}
            videoUrl={module.videoUrl}
            durationString={module.duration}
            accentColor={module.accentColor}
            objectives={module.objectives}
            onProgressUpdate={handleProgressUpdate}
          />
        </motion.div>

        {/* Description Text */}
        <motion.p variants={childVariants} className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[48px]">
          {module.description}
        </motion.p>
      </div>

      {/* Footer / Expandable Action Section */}
      <div className="mt-auto border-t border-white/5 pt-3">
        {/* Progress and Duration row */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Icons.Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{module.duration}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-300">{checklistProgressPercentage}%</span>
            <span className="text-[10px] text-slate-500">done</span>
          </div>
        </div>

        {/* Interactive Progress bar */}
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              checklistProgressPercentage === 100 
                ? 'bg-emerald-400' 
                : (module.accentColor === 'gold' ? 'bg-brand-gold' : 'bg-blue-400')
            }`}
            style={{ width: `${checklistProgressPercentage}%` }}
          />
        </div>

        {/* Accordion Objectives Checklist Trigger */}
        <button
          onClick={() => setShowObjectives(!showObjectives)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 hover:text-white transition-all border border-white/5"
        >
          <span className="flex items-center gap-1.5">
            <Icons.ListTodo className={`w-3.5 h-3.5 ${module.accentColor === 'gold' ? 'text-brand-gold' : 'text-blue-400'}`} />
            Training Checklist ({completedObjectivesCount}/{totalObjectivesCount})
          </span>
          {showObjectives ? (
            <Icons.ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <Icons.ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Interactive checklist expansion */}
        {showObjectives && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-2 bg-slate-950/40 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2"
          >
            {module.objectives.map((objective, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2.5 text-[11px] text-slate-300 cursor-pointer select-none hover:text-white transition-colors py-0.5"
              >
                <input
                  type="checkbox"
                  checked={!!completedObjectives[idx]}
                  onChange={() => handleObjectiveToggle(idx)}
                  className="sr-only"
                />
                <div className={`mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                  completedObjectives[idx]
                    ? (module.accentColor === 'gold'
                        ? 'bg-brand-gold border-brand-gold text-slate-950'
                        : 'bg-blue-500 border-blue-500 text-white')
                    : 'border-slate-600 hover:border-slate-400 bg-black/20'
                }`}>
                  {completedObjectives[idx] && <Icons.Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className={completedObjectives[idx] ? 'line-through text-slate-500 font-normal' : 'font-medium'}>
                  {objective}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
