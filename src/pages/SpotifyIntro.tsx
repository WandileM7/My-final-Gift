import React, { useState, useEffect } from 'react';
import { Music4, Heart, ArrowRight, Volume2, Sparkles } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";


function SpotifyIntro() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const location = useLocation();
  const valentinesPlaylist = "https://open.spotify.com/embed/playlist/1IjnH9lvlpV8JTGowjr4iG?utm_source=generator";

  // const handleContinue = () => {
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     window.location.href = '/letter';
  //   }, 1000);
  // };

  useEffect(() => {
    document.body.style.backgroundColor = '#FDF2F8';
    const timer = setTimeout(() => setShowTip(false), 5000);
    
    return () => {
      document.body.style.backgroundColor = '';
      clearTimeout(timer);
    };
  }, []);

  // Keep the music player visible in a fixed position across all pages
  const isMusicPage = location.pathname === '/';
  const playerStyle = isMusicPage ? 'relative' : 'fixed bottom-0 right-0 w-96 h-24 m-4 z-50';

  return (
    <div className={`${isMusicPage ? 'min-h-screen bg-gradient-to-br from-pink-500 via-red-400 to-red-500 flex flex-col items-center justify-center p-8' : ''} transition-all duration-1000 ${
      isTransitioning ? 'opacity-0' : 'opacity-100'
    }`}>
      {isMusicPage && (
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white text-sm">Click play to start the music</span>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className={isMusicPage ? 'max-w-4xl w-full' : ''}>
        {isMusicPage && (
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <div className="text-center mb-8">
              <h1 className="text-6xl font-bold text-white mb-4">Our Love Story</h1>
              <p className="text-xl text-white/80 mb-4">A musical journey through our most precious moments...</p>
              <div className="flex items-center justify-center gap-2">
                <Volume2 className="w-5 h-5 text-white/60" />
                <span className="text-white/60">Best experienced with headphones 🎧</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: isMusicPage ? 1.02 : 1 }}
              className={`relative ${isMusicPage ? 'aspect-video mb-8' : 'h-full'} rounded-xl overflow-hidden shadow-xl border border-white/20 ${playerStyle}`}
            >
              <iframe
                src={valentinesPlaylist}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="absolute inset-0"
              />
            </motion.div>

            <div className="flex flex-col items-center gap-6">
              <Link to="/letter">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
  >
    <span className="text-lg">Continue to Your Love Letter</span>
    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
  </motion.button>
</Link>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-white/60"
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">Come back to listen to your dedicated playlist after exploring</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-white/60 text-sm">Created with love, just for you 💝</p>
            </motion.div>
          </motion.div>
        )}

        {!isMusicPage && (
          <motion.div
            whileHover={{ scale: 1 }}
            className={`relative h-full rounded-xl overflow-hidden shadow-xl border border-white/20 ${playerStyle}`}
          >
            <iframe
              src={valentinesPlaylist}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="absolute inset-0"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SpotifyIntro;