import React from 'react';
import { Instagram, Facebook, Mail, Heart } from 'lucide-react';
import { contactInfo } from '../data/mock';

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.54V6.77a4.85 4.85 0 0 1-1.02-.08z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-electric-cyan mb-4">
              FIONA<span className="text-electric-purple">.</span>INK
            </h3>
            <p className="text-gray-400 mb-4">
              Creating custom tattoo art that tells your unique story. Based in {contactInfo.location}.
            </p>
            <div className="flex gap-4">
              <a 
                href={`https://instagram.com/${contactInfo.socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-electric-purple/20 hover:bg-electric-purple/30 border border-electric-purple/50 rounded-lg flex items-center justify-center text-electric-purple hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://facebook.com/${contactInfo.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-electric-cyan/20 hover:bg-electric-cyan/30 border border-electric-cyan/50 rounded-lg flex items-center justify-center text-electric-cyan hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://tiktok.com/@fiona.joilet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-electric-pink/20 hover:bg-electric-pink/30 border border-electric-pink/50 rounded-lg flex items-center justify-center text-electric-pink hover:text-white transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon size={20} />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-10 h-10 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/50 rounded-lg flex items-center justify-center text-neon-green hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-electric-cyan transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-electric-cyan transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-electric-cyan transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-electric-cyan transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Get In Touch</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.location}</li>
            </ul>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 cta-button bg-electric-purple hover:bg-electric-purple/90 text-white border-electric-purple text-sm"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Fiona.Ink. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="mx-1 text-electric-purple" size={16} fill="currentColor" /> for the art of ink
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
