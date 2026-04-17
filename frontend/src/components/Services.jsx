import React from 'react';
import { services } from '../data/mock';
import { Sparkles, Pen, Eye, RefreshCw, Zap, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  Sparkles: Sparkles,
  Pen: Pen,
  Eye: Eye,
  RefreshCw: RefreshCw,
  Zap: Zap,
  MessageCircle: MessageCircle,
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white mb-4">
            Serv<span className="text-neon-green">ices</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Professional tattoo services tailored to bring your vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card 
                key={service.id} 
                className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 hover:border-electric-purple transition-all duration-300 hover:shadow-lg hover:shadow-electric-purple/20 group"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-electric-purple/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric-purple/30 transition-colors">
                    {Icon && <Icon className="text-electric-purple" size={28} />}
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-electric-cyan transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <div>
                      <div className="text-electric-cyan font-semibold text-lg">{service.price}</div>
                      <div className="text-gray-500 text-sm">{service.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-12 bg-gradient-to-r from-electric-purple/20 via-electric-cyan/20 to-neon-green/20 rounded-lg border border-electric-purple/30">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Inked?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss your ideas and get a custom quote
          </p>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="cta-button bg-electric-purple hover:bg-electric-purple/90 text-white border-electric-purple shadow-lg shadow-electric-purple/30 hover:shadow-electric-purple/50 text-base"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
