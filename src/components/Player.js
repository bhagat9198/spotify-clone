import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';


export default function Player({accessToken, trackUri}) {
  console.log(trackUri);
  if(accessToken) return null;
  return (
    <SpotifyPlayer 
      token={accessToken}
      showSaveIcon
      autoPlay
      uris={trackUri ? [trackUri] : []}
    />
  )
}
