/// <reference types="vite/client" />

interface Window {
  Spotify: {
    Player: any;
  };
}

interface Spotify {
  Player: any;
  Track: {
    name: string;
    artists: Array<{ name: string }>;
  };
}