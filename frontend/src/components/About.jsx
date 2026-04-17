import React from 'react';
import { aboutInfo } from '../data/mock';
import { Award, Check } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-electric-purple/20">
              <img
                src={aboutInfo.image}
                alt={aboutInfo.name}
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Experience badge */}
              <div className="absolute bottom-8 left-8 bg-electric-purple/90 backdrop-blur-sm px-6 py-4 rounded-lg border border-electric-purple">
                <div className="text-4xl font-bold text-white">{aboutInfo.yearsExperience}+</div>
                <div className="text-sm text-white/90 uppercase tracking-wider">Years Experience</div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border-t-4 border-r-4 border-electric-cyan rounded-tr-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-4 border-l-4 border-neon-green rounded-bl-3xl"></div>
          </div>

          {/* Content Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white mb-4">
                About <span className="text-electric-cyan">Fiona</span>
              </h2>
              <p className="text-xl text-electric-purple font-semibold">{aboutInfo.title}</p>
            </div>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed mb-8">
              {aboutInfo.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Award className="mr-2 text-neon-green" size={28} />
                Specialties
              </h3>
              <div className="flex flex-wrap gap-3">
                {aboutInfo.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/50 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Certifications</h3>
              <ul className="space-y-3">
                {aboutInfo.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <Check className="mr-3 text-neon-green flex-shrink-0 mt-1" size={20} />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
