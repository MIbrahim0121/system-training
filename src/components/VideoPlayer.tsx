import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  moduleTitle: string;
  videoUrl?: string; // Optional real video URL (supports YouTube & Loom)
  durationString: string;
  accentColor: 'navy' | 'gold';
  onProgressUpdate?: (progress: number) => void; // Syncs playback percentage with checklist
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  moduleTitle,
  videoUrl,
  durationString,
  accentColor,
  onProgressUpdate
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Helper to check if it's a local video file
  const isLocalVideoFile = (url?: string): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(url);
  };

  // Helper to parse YouTube Video ID from various link formats
  const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper to parse Loom Video ID and return embed URL
  const getLoomEmbedUrl = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:loom\.com\/(?:share|embed)\/)([a-f0-9]+)/i);
    return match ? `https://www.loom.com/embed/${match[1]}?autoplay=1` : null;
  };

  const youtubeId = getYouTubeId(videoUrl);
  const loomEmbedUrl = getLoomEmbedUrl(videoUrl);
  const isLocalVideo = isLocalVideoFile(videoUrl);

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


  // Timer loop for progress bar and active objectives tracking (for mock player)
  useEffect(() => {
    if (isPlaying && !isLocalVideo) {
      intervalRef.current = setInterval(() => {
        // Mock player simulation - just update progress
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          return prev + (100 / parseDuration(durationString));
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
  }, [isPlaying, isLocalVideo, durationString]);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocalVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress(0);
    if (isLocalVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const hasEmbeddedVideo = youtubeId || loomEmbedUrl || isLocalVideo;

  return (
    <div className="relative group w-full aspect-video rounded-lg overflow-hidden bg-slate-950 border border-white/5 select-none">
      
      {/* 1. YOUTUBE VIDEO IFRAME */}
      {isPlaying && youtubeId && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&showinfo=0`}
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

      {/* 3. LOCAL VIDEO PLAYER */}
      {isPlaying && isLocalVideo && (
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-slate-950"
          src={videoUrl}
          autoPlay
          controls
          onTimeUpdate={() => {
            if (videoRef.current) {
              const newProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
              setProgress(Math.min(newProgress, 100));
              if (onProgressUpdate) {
                onProgressUpdate(Math.min(newProgress, 100));
              }
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(100);
          }}
        />
      )}

      {/* 4. DYNAMIC EQUALIZER BACKGROUND (For mock player OR poster frame before playing embed) */}
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
              Plays {isLocalVideo ? 'Local' : (youtubeId ? 'YouTube' : 'Loom')} video
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
    </div>
  );
};
