import React, { useEffect, useState } from 'react';
import { Heart, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const PLAYLIST_URI = "spotify:playlist:1IjnH9lvlpV8JTGowjr4iG";

export const SpotifyPlayer: React.FC = () => {
  const { 
    isMuted, 
    toggleMute, 
    player, 
    setPlayer,
    isPlaying,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    token,
    setToken
  } = useAudio();
  const [deviceId, setDeviceId] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Check URL for token on mount
    const params = new URLSearchParams(window.location.hash.substring(1));
    const newToken = params.get('access_token');
    if (newToken) {
      setToken(newToken);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Valentine\'s Day Player',
        getOAuthToken: cb => cb(token),
        volume: isMuted ? 0 : 0.5
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      player.addListener('player_state_changed', state => {
        if (!state) return;
        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
      });

      player.connect();
      setPlayer(player);
    };

    return () => {
      player?.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (deviceId && token) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ context_uri: PLAYLIST_URI }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).catch(console.error);
    }
  }, [deviceId, token]);

  const togglePlay = async () => {
    if (!player) return;
    await player.togglePlay();
  };

  const skipNext = async () => {
    if (!player) return;
    await player.nextTrack();
  };

  const skipPrevious = async () => {
    if (!player) return;
    await player.previousTrack();
  };

  if (!token) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent">
      <div className="max-w-md mx-auto px-4 py-4">
        <motion.div
          layout
          className="bg-white/10 backdrop-blur-md rounded-full p-4 shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-4">
            {!isMinimized && currentTrack && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{currentTrack.name}</p>
                  <p className="text-white/60 text-sm truncate">
                    {currentTrack.artists.map(a => a.name).join(', ')}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={skipPrevious}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={skipNext}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <SkipForward size={20} />
              </button>

              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-pink-300 transition-colors p-2"
              >
                <Heart size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;