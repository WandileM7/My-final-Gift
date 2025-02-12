import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Letter from './pages/Letter';
import Gallery from './pages/Gallery';
import SpotifyIntro from './pages/SpotifyIntro';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpotifyIntro />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;