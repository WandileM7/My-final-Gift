export const spotifyConfig = {
  clientId: 'your_client_id',
  redirectUri: window.location.origin,
  scopes: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state'
  ]
};