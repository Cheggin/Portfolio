import React, { useState } from 'react';
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
    embedUrl: string;
    seenInConcert?: boolean;
  }[];
  description: string;
}

type TabType = 'artists' | 'songs' | 'playlists';

const SpotifySection: React.FC<SpotifySectionProps> = ({ playlists, currentFavorites, favoriteSongs, favoriteArtists, description }) => {
  const [activeTab, setActiveTab] = useState<TabType>('artists');

  const renderArtistsTab = () => (
    <div className="tab-content">
      <div className="concert-legend">
        <div className="legend-item">
          <div className="concert-indicator legend-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="legend-text">Seen in concert</span>
        </div>
      </div>
      <div className="favorite-artists-embeds">
        {favoriteArtists?.map((artist, index) => (
          <div key={index} className="artist-embed-item">
            <div className="artist-embed-container">
              {artist.seenInConcert && (
                <div className="concert-badge" title="Seen in concert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              )}
              <iframe 
                src={artist.embedUrl}
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title={`${artist.name} on Spotify`}
                style={{ borderRadius: '12px' }}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSongsTab = () => (
    <div className="tab-content">
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
  );

  const renderPlaylistsTab = () => (
    <div className="tab-content">
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
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'artists':
        return renderArtistsTab();
      case 'songs':
        return renderSongsTab();
      case 'playlists':
        return renderPlaylistsTab();
      default:
        return renderArtistsTab();
    }
  };

  return (
    <div className="spotify-section">
      <div className="spotify-content">
        <h2 className="spotify-title">Music Taste</h2>
        <p className="spotify-description">
          {description}
        </p>

        {/* Tabbed Interface */}
        <div className="spotify-tabs-container">
          <div className="spotify-tabs">
            <button
              className={`spotify-tab ${activeTab === 'artists' ? 'active' : ''}`}
              onClick={() => setActiveTab('artists')}
            >
              Favorite Artists
            </button>
            <button
              className={`spotify-tab ${activeTab === 'songs' ? 'active' : ''}`}
              onClick={() => setActiveTab('songs')}
            >
              Favorite Songs
            </button>
            <button
              className={`spotify-tab ${activeTab === 'playlists' ? 'active' : ''}`}
              onClick={() => setActiveTab('playlists')}
            >
              My Playlists
            </button>
          </div>
          
          <div className="tab-content-wrapper">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifySection;