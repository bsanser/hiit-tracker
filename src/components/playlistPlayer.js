import React from "react"

const PlayListPlayer = ({ playlistUrl }) => {
  return (
    <iframe
      src={playlistUrl}
      title="spotifyPlaylist"
      width="100%"
      height="200"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  )
}

export default PlayListPlayer
