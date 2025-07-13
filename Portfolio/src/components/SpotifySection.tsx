import React from 'react';
import './SpotifySection.css';
import LiquidGlassCard from './LiquidGlassCard';

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
  spotifyUrl: string;
  embedUrl: string;
}

interface SpotifySectionProps {
  playlists: SpotifyPlaylist[];
  currentFavorites: string[];
  favoriteSongs: {
    id: string;
    embedUrl: string;
  }[];
  favoriteArtists?: {
    name: string;
    spotifyUrl: string;
    imageUrl: string;
  }[];
  description: string;
}

const SpotifySection: React.FC<SpotifySectionProps> = ({ playlists, currentFavorites, favoriteSongs, favoriteArtists, description }) => {
  return (
    <div className="spotify-section">
      <div className="spotify-content">
        <h2 className="spotify-title">Music Taste</h2>
        <p className="spotify-description">
          {description}
        </p>

        {/* Music Content Split Layout */}
        <div className="spotify-music-layout">
          {/* Left Side - Favorite Songs */}
          <div className="spotify-left-section">
            <h3 className="spotify-section-title">Favorite Songs</h3>
            <div className="favorite-songs-list">
              {favoriteSongs.map((song) => (
                <div key={song.id} className="favorite-song-item">
                  <div className="spotify-embed-container">
                    <iframe 
                      src={song.embedUrl}
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      title="Favorite Song"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Playlists */}
          <div className="spotify-right-section">
            <h3 className="spotify-section-title">Playlists</h3>
            <div className="playlists-list">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-item">
                  <div className="playlist-embed-container">
                    <iframe 
                      src={playlist.embedUrl}
                      width="100%" 
                      height="352" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      title={playlist.name}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
            {/* Favorite Artists Section */}
        {favoriteArtists && favoriteArtists.length > 0 && (
          <div className="favorite-artists-section">
            <h3 className="spotify-section-title">Favorite Artists</h3>
            <div className="favorite-artists-grid">
              {favoriteArtists.map((artist, index) => (
                <LiquidGlassCard
                  key={index}
                  className="artist-card-wrapper"
                  hoverEffect={true}
                  animated={true}
                >
                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="artist-card"
                    aria-label={`Listen to ${artist.name} on Spotify`}
                  >
                    <h4 className="artist-name">{artist.name}</h4>
                  </a>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifySection;