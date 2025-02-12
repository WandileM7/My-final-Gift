import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  player: Spotify.Player | null;
  setPlayer: (player: Spotify.Player | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTrack: Spotify.Track | null;
  setCurrentTrack: (track: Spotify.Track | null) => void;
  token: string | null;
  setToken: (token: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (player) {
      player.setVolume(isMuted ? 0.5 : 0);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('spotify_token', token);
    }
  }, [token]);

  const value = {
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
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}