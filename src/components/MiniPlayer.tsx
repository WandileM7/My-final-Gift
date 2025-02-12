import React from 'react';
import { Music2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { motion } from 'framer-motion';

function MiniPlayer() {
  const { 
    player,
    isPlaying,
    currentTrack,
  } = useAudio();

  const handlePlayPause = async () => {
    if (!player) return;
    await player.togglePlay();
  };

  const handleNext = async () => {
    if (!player) return;
    await player.nextTrack();
  };

  const handlePrevious = async () => {
    if (!player) return;
    await player.previousTrack();
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/20 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
          <Music2 className="w-4 h-4 text-white" />
        </div>
        
        <div className="max-w-[150px] hidden sm:block">
          <p className="text-white text-sm font-medium truncate">{currentTrack.name}</p>
          <p className="text-white/60 text-xs truncate">
            {currentTrack.artists.map(a => a.name).join(', ')}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevious}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={handlePlayPause}
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            onClick={handleNext}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default MiniPlayer;