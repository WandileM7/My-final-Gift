import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Music2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

function Gallery() {
  const { player, isPlaying, currentTrack } = useAudio();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  
  const photos = [
    "/images/20241230_181530.jpg",
    "/images/20250114_184050.jpg",
    "/images/20250201_133047.jpg",
    "/images/20250201_174056.jpg",
    "/images/20241230_181509.jpg",
    "/images/20250114_184045.jpg",
    "/images/20250114_184317.jpg",
    "/images/20250201_125236.jpg",
    "/images/20250201_170917.jpg",

  ];

  const totalImages = photos.length;

  // Preload images before rendering
  useEffect(() => {
    let loaded = 0;
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalImages) {
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalImages) {
          setIsPreloaded(true);
        }
      };
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-50 p-8">
      {!isPreloaded && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center">
            <Heart className="w-12 h-12 text-pink-500 animate-pulse mb-4" />
            <p className="text-gray-600">Loading memories... {imagesLoaded}/{totalImages}</p>
          </div>
        </div>
      )}

      {/* Player */}
      {isPreloaded && currentTrack && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white p-2 rounded-full shadow-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
              <Music2 className="w-4 h-4 text-gray-600" />
            </div>

            <div className="max-w-[150px] hidden sm:block">
              <p className="text-gray-800 text-sm font-medium truncate">{currentTrack.name}</p>
              <p className="text-gray-500 text-xs truncate">
                {currentTrack.artists.map(a => a.name).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevious}
                className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SkipBack size={16} />
              </button>

              <button
                onClick={handlePlayPause}
                className="text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                onClick={handleNext}
                className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {isPreloaded && (
        <>
          <Link 
            to="/letter" 
            className="fixed top-4 left-4 z-50 bg-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-pink-50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
            <span className="text-gray-600">Back to Letter</span>
          </Link>

          <header className="text-center mb-12 pt-20">
            <Heart className="inline-block w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 font-serif">Our Beautiful Memories</h1>
            <p className="mt-2 text-xl text-gray-600">Every moment with you is a treasure</p>
          </header>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="relative aspect-square overflow-hidden rounded-lg shadow-lg group"
                  role="button"
                  tabIndex={0}
                >
                  <img 
                    src={photo} 
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Gallery;
