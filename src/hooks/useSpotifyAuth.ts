import { useEffect, useState } from 'react';
import { spotifyConfig } from '../config';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Check if returning from Spotify auth
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');

    if (accessToken) {
      setToken(accessToken);
      // Remove the access token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const login = () => {
    const params = new URLSearchParams({
      client_id: spotifyConfig.clientId,
      redirect_uri: spotifyConfig.redirectUri,
      scope: spotifyConfig.scopes.join(' '),
      response_type: 'token',
      show_dialog: 'true'
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return { token, login };
}