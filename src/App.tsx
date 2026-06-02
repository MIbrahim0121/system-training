import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Award, 
  HelpCircle,
  
} from 'lucide-react';
import { trainingModules } from './data/modules';
import { TrainingCard } from './components/TrainingCard';
import zgLogo from './assets/zg-logo.png';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Leads' | 'Bookings' | 'Quotes' | 'Jobs'>('All');

  // Filter modules based on search query and selected category
  const filteredModules = useMemo(() => {
    return trainingModules.filter(module => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Framer Motion container variants for staggered entry animations
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Metrics dashboard data calculations
  const categoriesList = ['All', 'Leads', 'Bookings', 'Quotes', 'Jobs'] as const;
  const totalDuration = "17 mins 59 secs";

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden font-sans bg-[#05070c]">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-navy/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[25%] w-[50%] h-[50%] rounded-full bg-brand-navy/10 blur-[150px] pointer-events-none" />

      {/* Top Navbar with Logo */}
      <nav className="border-b border-white/5 py-4 relative z-10 bg-slate-950/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <img src={zgLogo} alt="ZG HighLevel Devs" className="h-24 w-auto object-contain" />
        </div>
      </nav>

      {/* Main Structural Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        
        {/* Course Header & Title Section */}
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-gold mb-3 select-none">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SOP & Operational Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-gold">Training</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl font-medium">
              Master our CRM operations, lead pipelines, quote conversions, and delivery milestones. Click play on any card to launch the interactive simulation video.
            </p>
          </div>

          {/* Quick Metrics Panel - Premium glass widget */}
          <div className="glass-card border border-white/10 rounded-xl p-4 flex gap-4 md:gap-6 text-left self-center md:self-end shadow-xl min-w-[320px] md:min-w-[420px]">
            <div className="flex-1 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-brand-gold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">Modules</span>
                <span className="text-sm font-extrabold text-white">9 Stages</span>
              </div>
            </div>
            
            <div className="w-[1px] bg-white/10 self-stretch" />

            <div className="flex-1 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">Duration</span>
                <span className="text-sm font-extrabold text-white">{totalDuration}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Filter & Navigation Controls */}
        <section className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 border flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? (cat === 'Quotes' || cat === 'All'
                        ? 'bg-brand-gold text-slate-900 border-brand-gold/30 shadow-lg shadow-brand-gold/15'
                        : 'bg-white text-slate-950 border-white/20 shadow-lg shadow-white/10')
                    : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search stages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 focus:bg-slate-950/60 border border-white/10 focus:border-brand-gold/40 text-xs text-white placeholder-slate-500 focus:outline-none transition-all focus:ring-1 focus:ring-brand-gold/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white text-[10px] font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* Empty Search Result State */}
        {filteredModules.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-white/10 rounded-xl p-12 text-center max-w-md mx-auto mt-12"
          >
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-base font-bold text-white mb-2">No Modules Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              We couldn't find any stages matching "{searchQuery}" under the category "{selectedCategory}". Try adjusting your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white transition-all"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Staggered Cards Grid Container */}
        <AnimatePresence mode="popLayout">
          {filteredModules.length > 0 && (
            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredModules.map(module => (
                <TrainingCard key={module.id} module={module} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modern Sleek Glass Footer */}
      <footer className="mt-20 border-t border-white/5 pt-12 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
            {/* Contact Section */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-white text-sm">Contact Us</h3>
              <div className="flex flex-col gap-1 text-xs text-slate-400">
                <a href="mailto:support@zghighlevels.com" className="hover:text-brand-gold transition-colors">zghighleveldevs@gmail.com</a>
                <a href="tel:+923104168315" className="hover:text-brand-gold transition-colors">(92) 310-416-8315</a>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Award className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>© 2026 ZGHighLevelDevs. All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
