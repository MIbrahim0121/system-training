import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  moduleTitle: string;
  videoUrl?: string; // Optional real video URL (supports YouTube & Loom)
  durationString: string;
  accentColor: 'navy' | 'gold';
  objectives: string[];
  onProgressUpdate?: (progress: number) => void; // Syncs playback percentage with checklist
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  moduleTitle,
  videoUrl,
  durationString,
  accentColor,
  objectives,
  onProgressUpdate
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper to parse YouTube Video ID from various link formats
  const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper to parse Loom Video ID and return embed URL
  const getLoomEmbedUrl = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:loom\.com\/(?:share|embed)\/)([a-f0-9]+)/i);
    return match ? `https://www.loom.com/embed/${match[1]}?autoplay=1&mute=${isMuted ? 1 : 0}` : null;
  };

  const youtubeId = getYouTubeId(videoUrl);
  const loomEmbedUrl = getLoomEmbedUrl(videoUrl);

  // Parse duration "Xm Ys" into total seconds
  const parseDuration = (dur: string): number => {
    const parts = dur.split(' ');
    let seconds = 0;
    parts.forEach(part => {
      if (part.includes('m')) {
        seconds += parseInt(part.replace('m', ''), 10) * 60;
      } else if (part.includes('s')) {
        seconds += parseInt(part.replace('s', ''), 10);
      }
    });
    return seconds || 300; // default 5 minutes
  };

  const totalSeconds = parseDuration(durationString);

  // Timer loop for progress bar and active objectives tracking
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalSeconds]);

  useEffect(() => {
    const currentProgress = (currentTime / totalSeconds) * 100;
    setProgress(currentProgress);
    if (onProgressUpdate) {
      onProgressUpdate(currentProgress);
    }
  }, [currentTime, totalSeconds, onProgressUpdate]);

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercentage = Math.min(Math.max((clickX / width), 0), 1);
    setCurrentTime(Math.floor(newPercentage * totalSeconds));
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(true);
  };

  // Determine current active objective based on progress
  const activeObjectiveIndex = Math.min(
    Math.floor((progress / 100) * objectives.length),
    objectives.length - 1
  );

  const hasEmbeddedVideo = youtubeId || loomEmbedUrl;

  return (
    <div className="relative group w-full aspect-video rounded-lg overflow-hidden bg-slate-950 border border-white/5 select-none">
      
      {/* 1. YOUTUBE VIDEO IFRAME */}
      {isPlaying && youtubeId && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&showinfo=0&mute=${isMuted ? 1 : 0}`}
            title={moduleTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}

      {/* 2. LOOM VIDEO IFRAME */}
      {isPlaying && loomEmbedUrl && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="w-full h-full border-0"
            src={loomEmbedUrl}
            title={moduleTitle}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}

      {/* 3. DYNAMIC EQUALIZER BACKGROUND (For mock player OR poster frame before playing embed) */}
      {(!isPlaying || !hasEmbeddedVideo) && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Glow Spheres */}
          <div className={`absolute w-32 h-32 rounded-full blur-[40px] opacity-20 transition-all duration-1000 ${
            isPlaying ? 'scale-150 animate-pulse-slow' : 'scale-100'
          } ${accentColor === 'gold' ? 'bg-brand-gold/60' : 'bg-blue-500/40'}`} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950 opacity-90" />

          {/* Audio Equalizer Bars */}
          <div className="absolute inset-x-0 bottom-8 top-8 flex items-center justify-center gap-[4px] px-8">
            {[...Array(16)].map((_, i) => {
              const delay = i * 0.15;
              return (
                <div
                  key={i}
                  className={`w-[3px] rounded-full transition-all duration-300 ${
                    accentColor === 'gold' 
                      ? 'bg-gradient-to-t from-brand-gold/80 to-amber-300/40' 
                      : 'bg-gradient-to-t from-blue-500/80 to-brand-navy/40'
                  }`}
                  style={{
                    height: isPlaying ? '100%' : '15%',
                    maxHeight: isPlaying ? `${Math.sin(i * 0.5) * 40 + 50}%` : '8px',
                    animation: isPlaying ? `bounce 1.2s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${delay}s`
                  }}
                />
              );
            })}
          </div>
          
          <style>{`
            @keyframes bounce {
              0% { transform: scaleY(0.3); }
              100% { transform: scaleY(1.1); }
            }
          `}</style>
        </div>
      )}

      {/* Subtitles Overlay (Overlay objectives that guide active progress) */}
      {isPlaying && (
        <div className="absolute top-3 left-3 right-3 px-3 py-1.5 rounded bg-black/75 backdrop-blur-sm border border-white/5 text-[11px] text-slate-350 flex items-center gap-1.5 animate-fade-in pointer-events-none z-10">
          <Sparkles className={`w-3.5 h-3.5 flex-shrink-0 ${accentColor === 'gold' ? 'text-brand-gold' : 'text-blue-400'}`} />
          <span className="truncate font-semibold">
            {hasEmbeddedVideo ? `Sync Active Step ${activeObjectiveIndex + 1}: ` : `Step ${activeObjectiveIndex + 1}: `}
            {objectives[activeObjectiveIndex]}
          </span>
        </div>
      )}

      {/* Large Poster Play Button Overlay (Visible before starting playback) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 backdrop-blur-[1px] transition-all group-hover:bg-black/30">
          <button
            onClick={handlePlayToggle}
            className={`p-4 rounded-full border shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 ${
              accentColor === 'gold'
                ? 'bg-brand-gold text-slate-950 border-brand-gold/20 hover:shadow-brand-gold/30 hover:shadow-xl'
                : 'bg-white text-brand-navy border-white/20 hover:shadow-white/20 hover:shadow-xl'
            }`}
            title="Start Training"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </button>
          {hasEmbeddedVideo && (
            <div className="absolute bottom-4 text-[10px] text-slate-400 tracking-wide font-semibold bg-black/50 px-2.5 py-0.5 rounded border border-white/5">
              Plays {youtubeId ? 'YouTube' : 'Loom'} video
            </div>
          )}
        </div>
      )}

      {/* Video Completed Overlay */}
      {progress >= 100 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/85 backdrop-blur-sm text-center p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-450 mb-1">Module Completed</span>
          <h4 className="text-sm font-bold text-white mb-3">You've finished: {moduleTitle}</h4>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all transform active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Watch Again
          </button>
        </div>
      )}

      {/* Sleek Custom Glass controls HUD (Visible on hover; hidden for video API embeds when playing) */}
      {(!hasEmbeddedVideo || !isPlaying) && (
        <div className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-all duration-300 z-10 transform ${
          isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
        }`}>
          
          {/* Scrub Bar */}
          <div 
            onClick={handleScrub}
            className="h-1 w-full bg-white/20 rounded-full cursor-pointer relative group/scrub"
          >
            <div 
              className={`h-full rounded-full relative transition-all duration-100 ${
                accentColor === 'gold' ? 'bg-brand-gold' : 'bg-blue-450'
              }`}
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 w-3 h-3 rounded-full bg-white shadow -translate-y-1/2 opacity-0 group-hover/scrub:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          {/* Controls Details */}
          <div className="flex items-center justify-between text-white/80 text-xs">
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePlayToggle}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <span>
                {formatTime(currentTime)} <span className="opacity-40">/</span> {formatTime(totalSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleMuteToggle}
                className="hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); alert('Fullscreen layout activated for ' + moduleTitle); }}
                className="hover:text-white transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
