import React, { useState, useEffect } from 'react';
import { Heart, Camera, Stars, Sparkles, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from "../context/AudioContext";

function Letter() {
  const [showSparkle, setShowSparkle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkle(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-50 p-8 relative overflow-hidden">
      {/* Navigation Links */}
      <div className="fixed top-4 left-4 z-50 flex gap-4">
        <Link 
          to="/" 
          className="bg-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-pink-50 transition-colors group"
        >
          <Music className="w-6 h-6 text-gray-600 group-hover:scale-110 transition-transform" />
          <span className="text-gray-600">Back to Music</span>
        </Link>
        
        <Link 
          to="/gallery" 
          className="bg-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-pink-50 transition-colors group"
        >
          <Camera className="w-6 h-6 text-gray-600 group-hover:scale-110 transition-transform" />
          <span className="text-gray-600">View Our Memories</span>
        </Link>
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1
            }}
          >
            <Heart
              className="text-red-300"
              size={Math.random() * 20 + 10}
            />
          </div>
        ))}
      </div>

      {/* Mouse Follow Effect */}
      <div
        className="fixed pointer-events-none transition-transform duration-300 z-50"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Sparkles
          className={`w-5 h-5 text-pink-400 transition-opacity duration-300 ${
            showSparkle ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        {/* Header with Animated Stars */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
            <Stars className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <Heart className="inline-block w-16 h-16 text-red-500 animate-pulse hover:scale-110 transition-transform cursor-pointer" />
          <h1 className="mt-4 text-4xl font-bold text-gray-800 hover:text-red-600 transition-colors">
            Happy Valentine's Day
          </h1>
          <p className="mt-2 text-xl text-gray-600 hover:text-pink-600 transition-colors">
            My Dearest Lumière
          </p>
        </div>

        {/* Letter Content with Hover Effects */}
        <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl relative">
          <div className="absolute -top-3 -right-3">
            <Heart className="w-8 h-8 text-red-500 animate-bounce" />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed hover:text-red-600 transition-colors">
              My Beloved,
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-6 hover:text-red-600 transition-colors">
              As I write this letter, my heart overflows with love for you. Every moment we've shared has been a precious gift, painting my world with colors I never knew existed before you came into my life.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-6 hover:text-red-600 transition-colors">
              Your smile brightens my darkest days, your laugh is my favorite melody, and your love is the greatest blessing I could ever ask for. You make ordinary moments extraordinary just by being you.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-6 hover:text-red-600 transition-colors">
              I cherish every little thing about you - the way your eyes light up when you're excited, how you scrunch your nose when you laugh, and the gentle way you care for those around you.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-6 hover:text-red-600 transition-colors">
              Thank you for being my partner, my best friend, and my greatest adventure. I fall more in love with you each day.
            </p>
            
            <p className="text-gray-700 mt-8 italic text-right hover:text-red-600 transition-colors">
              Forever Yours,<br />
              Wandile
            </p>
          </div>
        </div>

        {/* Interactive Decorative Hearts */}
        <div className="mt-12 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              className="w-8 h-8 text-red-500 animate-bounce hover:text-pink-600 hover:scale-125 transition-all cursor-pointer"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Letter;