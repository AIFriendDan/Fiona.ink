import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock Instagram posts - will be replaced with real API data later
  const mockPosts = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1596896734952-c4c1cd2efe0f",
      caption: "Fresh blackwork floral piece 🖤 DM for bookings",
      likes: 342,
      comments: 28,
      permalink: "https://instagram.com/p/mock1"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1775135436883-56af5c10a476",
      caption: "Realism eye detail - 6 hours of precision work ✨",
      likes: 489,
      comments: 45,
      permalink: "https://instagram.com/p/mock2"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1562379825-415aea84ebcf",
      caption: "Botanical sleeve in progress 🌿",
      likes: 267,
      comments: 19,
      permalink: "https://instagram.com/p/mock3"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1482328177731-274399da39f0",
      caption: "Classic lettering never goes out of style 🔥",
      likes: 521,
      comments: 33,
      permalink: "https://instagram.com/p/mock4"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1597852075234-fd721ac361d3",
      caption: "Arm piece healed beautifully! Thanks for trusting the process 🙏",
      likes: 398,
      comments: 42,
      permalink: "https://instagram.com/p/mock5"
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1762913920993-23589070d01b",
      caption: "Intricate mandala work - one of my favorites this month 🌀",
      likes: 612,
      comments: 58,
      permalink: "https://instagram.com/p/mock6"
    },
    {
      id: 7,
      imageUrl: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd",
      caption: "Behind the scenes of today's session 💉",
      likes: 289,
      comments: 22,
      permalink: "https://instagram.com/p/mock7"
    },
    {
      id: 8,
      imageUrl: "https://images.unsplash.com/photo-1764640848891-9b23d3632ccf",
      caption: "Hand tattoos hitting different 🖐️✨",
      likes: 445,
      comments: 37,
      permalink: "https://instagram.com/p/mock8"
    },
    {
      id: 9,
      imageUrl: "https://images.unsplash.com/photo-1552627019-947c3789ffb5",
      caption: "Client's first tattoo - welcome to the family! 🎉",
      likes: 356,
      comments: 41,
      permalink: "https://instagram.com/p/mock9"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading Instagram feed...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="text-electric-purple" size={40} />
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white">
              Insta<span className="text-electric-purple">gram</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Follow my journey and see my latest tattoo work on Instagram
          </p>
          <a
            href="https://instagram.com/fiona.ink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-electric-purple via-electric-pink to-electric-purple bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-full font-semibold transition-all duration-500 shadow-lg shadow-electric-purple/30"
          >
            <Instagram size={20} />
            Follow @fiona.ink
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-6 text-white mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">❤️</span>
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💬</span>
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>

              {/* Instagram icon indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-electric-purple/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="text-white" size={20} />
              </div>
            </a>
          ))}
        </div>

        {/* CTA to view more */}
        <div className="text-center">
          <a
            href="https://instagram.com/fiona.ink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-electric-cyan hover:text-neon-green transition-colors text-lg font-semibold"
          >
            View More on Instagram
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Note for admin */}
        <div className="mt-12 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
          <p className="text-sm text-gray-400">
            💡 <strong className="text-white">Note:</strong> This is currently showing mock data. 
            Connect your Instagram Business account to display real posts automatically.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
