import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-electric-purple/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold tracking-tight text-electric-cyan hover:text-neon-green transition-colors"
          >
            FIONA<span className="text-electric-purple">.</span>INK
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="nav-link text-white hover:text-electric-cyan transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link text-white hover:text-electric-cyan transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link text-white hover:text-electric-cyan transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="cta-button bg-electric-purple hover:bg-electric-purple/90 text-white border-electric-purple"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-electric-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-sm border-t border-electric-purple/20">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left text-white hover:text-electric-cyan transition-colors py-2"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-white hover:text-electric-cyan transition-colors py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-white hover:text-electric-cyan transition-colors py-2"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full cta-button bg-electric-purple hover:bg-electric-purple/90 text-white border-electric-purple mt-4"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
