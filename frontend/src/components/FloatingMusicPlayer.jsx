import React, { useState } from 'react';
import { Music, X, Volume2 } from 'lucide-react';

// Set REACT_APP_SPOTIFY_TRACK_ID in your .env to the Spotify track ID for
// "Symphony of Destruction" by Megadeth.
// How to find it: open Spotify → find the song → right-click → Share → Copy Song Link
// The ID is the last segment of the URL, e.g. spotify.com/track/XXXXXXXXXXXXXXX
const TRACK_ID = process.env.REACT_APP_SPOTIFY_TRACK_ID || '';

const FloatingMusicPlayer = () => {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Spotify embed */}
      {open && TRACK_ID && (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-electric-purple/30">
          <iframe
            title="Fiona.ink Music"
            src={`https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0`}
            width="300"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      {/* No track configured — dev hint */}
      {open && !TRACK_ID && (
        <div className="bg-gray-900 border border-electric-purple/40 rounded-2xl px-5 py-4 text-sm text-gray-300 max-w-xs shadow-xl">
          <p className="font-semibold text-white mb-1">Music not configured yet</p>
          <p>
            Set <code className="text-electric-purple">REACT_APP_SPOTIFY_TRACK_ID</code> in{' '}
            <code className="text-electric-cyan">.env</code> to the Spotify track ID for{' '}
            <em>Symphony of Destruction</em>.
          </p>
        </div>
      )}

      {/* Floating toggle button */}
      <div className="flex items-center gap-2">
        {!open && (
          <button
            onClick={() => setDismissed(true)}
            className="w-8 h-8 rounded-full bg-gray-800/80 backdrop-blur-sm text-gray-400 hover:text-white flex items-center justify-center transition"
            aria-label="Dismiss music player"
          >
            <X size={14} />
          </button>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm shadow-lg transition-all ${
            open
              ? 'bg-electric-purple text-white shadow-electric-purple/40'
              : 'bg-gray-900/90 backdrop-blur-sm text-white border border-electric-purple/40 hover:border-electric-purple hover:bg-gray-800/90'
          }`}
          aria-label={open ? 'Close music player' : 'Open music player'}
        >
          {open ? <X size={16} /> : <Music size={16} />}
          {open ? 'Close' : (
            <span className="flex items-center gap-1.5">
              <Volume2 size={14} className="text-electric-purple" />
              Play Music
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;
