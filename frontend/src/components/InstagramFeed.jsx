import React, { useState, useEffect, useRef } from 'react';
import { Instagram, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const IG_HANDLE = '_foofitat2_';
const IG_URL = `https://instagram.com/${IG_HANDLE}`;

// Top 3 featured posts — replace imageUrl + permalink with real post links once connected
const featuredPosts = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1596896734952-c4c1cd2efe0f',
    caption: 'Fresh blackwork floral piece 🖤 DM for bookings',
    likes: 342,
    permalink: IG_URL,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1775135436883-56af5c10a476',
    caption: 'Realism eye detail — 6 hours of precision work ✨',
    likes: 489,
    permalink: IG_URL,
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1562379825-415aea84ebcf',
    caption: 'Botanical sleeve in progress 🌿',
    likes: 267,
    permalink: IG_URL,
  },
];

const InstagramFeed = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const prev = () => setCurrent((c) => (c === 0 ? featuredPosts.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === featuredPosts.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused, current]);

  const post = featuredPosts[current];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="text-electric-purple" size={40} />
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white">
              Insta<span className="text-electric-purple">gram</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Follow the latest work on Instagram
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric-purple via-electric-pink to-electric-purple text-white rounded-full font-semibold shadow-lg shadow-electric-purple/30 hover:opacity-90 transition-opacity"
          >
            <Instagram size={20} />
            Follow @{IG_HANDLE}
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-square rounded-2xl overflow-hidden bg-gray-900 shadow-2xl shadow-black/60"
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Caption overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <p className="text-white text-lg font-medium mb-2">{post.caption}</p>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span>❤️</span>
                <span>{post.likes.toLocaleString()} likes</span>
                <ExternalLink size={14} className="ml-auto text-electric-purple" />
              </div>
            </div>
          </a>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition"
            aria-label="Previous post"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition"
            aria-label="Next post"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {featuredPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? 'bg-electric-purple scale-125' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to post ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View more CTA */}
        <div className="text-center mt-10">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-electric-cyan hover:text-neon-green transition-colors text-lg font-semibold"
          >
            View More on Instagram
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
