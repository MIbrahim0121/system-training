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

        {/* Media (Video Player) Section */}
        <motion.div variants={childVariants} className="mb-4">
          <VideoPlayer
            moduleTitle={module.title}
            videoUrl={module.videoUrl}
            durationString={module.duration}
            accentColor={module.accentColor}
          />
        </motion.div>
      </div>

      {/* Footer Section */}
      <div className="mt-auto border-t border-white/5 pt-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Icons.Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{module.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};
