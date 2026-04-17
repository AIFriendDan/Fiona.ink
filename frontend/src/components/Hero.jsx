import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1760877611905-0f885a3ce551"
          alt="Tattoo studio atmosphere"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        
        {/* Neon glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase mb-6 tracking-tight">
            <span className="block text-white">Ink Your</span>
            <span className="block text-electric-cyan drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
              Story
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 font-light tracking-wide">
            Custom tattoo art that speaks to your soul
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="cta-button bg-electric-purple hover:bg-electric-purple/90 text-white border-electric-purple shadow-lg shadow-electric-purple/30 hover:shadow-electric-purple/50"
            >
              View Portfolio
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="cta-button bg-transparent hover:bg-white/10 text-white border-2 border-white hover:border-electric-cyan"
            >
              Book Consultation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-electric-purple/30">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-electric-cyan mb-1">8+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Years</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-1">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-electric-purple mb-1">100%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToPortfolio}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-electric-cyan hover:text-neon-green transition-colors animate-bounce"
        aria-label="Scroll to portfolio"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
