import React, { useState } from 'react';
import { contactInfo, faqData } from '../data/mock';
import { MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tattooIdea: '',
    preferredDate: '',
    bodyPlacement: '',
    size: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to backend API
      const response = await axios.post(
        `${BACKEND_URL}/api/bookings`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Booking created:', response.data);
      
      toast.success("Booking Request Received!", {
        description: "I'll get back to you within 24-48 hours to confirm your consultation.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        tattooIdea: '',
        preferredDate: '',
        bodyPlacement: '',
        size: '',
      });
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      
      const errorMessage = error.response?.data?.detail || 'Something went wrong. Please try again.';
      
      toast.error("Booking Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white mb-4">
            Book <span className="text-electric-cyan">Now</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Let's create something amazing together. Fill out the form below to schedule your consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border-2 border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-white mb-2 block">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredDate" className="text-white mb-2 block">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bodyPlacement" className="text-white mb-2 block">Body Placement</Label>
                  <Input
                    id="bodyPlacement"
                    name="bodyPlacement"
                    type="text"
                    value={formData.bodyPlacement}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
                    placeholder="e.g., Upper arm, back"
                  />
                </div>
                <div>
                  <Label htmlFor="size" className="text-white mb-2 block">Approximate Size</Label>
                  <Input
                    id="size"
                    name="size"
                    type="text"
                    value={formData.size}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan"
                    placeholder="e.g., 4x6 inches"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tattooIdea" className="text-white mb-2 block">Tattoo Idea / Description *</Label>
                <Textarea
                  id="tattooIdea"
                  name="tattooIdea"
                  required
                  value={formData.tattooIdea}
                  onChange={handleChange}
                  rows={6}
                  className="bg-black/50 border-gray-700 text-white focus:border-electric-cyan resize-none"
                  placeholder="Describe your tattoo idea in detail. Include style preferences, colors, and any reference images you have..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-electric-purple hover:bg-electric-purple/90 text-white text-base py-6 shadow-lg shadow-electric-purple/30 hover:shadow-electric-purple/50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                You'll receive a confirmation within 24-48 hours. A $100 deposit is required to secure your appointment.
              </p>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border-2 border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-electric-cyan mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-white">{contactInfo.location}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-electric-cyan mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white">{contactInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-electric-cyan mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <div className="text-white">{contactInfo.phone}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a 
                    href={`https://instagram.com/${contactInfo.socialMedia.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-electric-purple/20 hover:bg-electric-purple/30 border border-electric-purple/50 rounded-lg flex items-center justify-center text-electric-purple hover:text-white transition-all"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href={`https://facebook.com/${contactInfo.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-electric-cyan/20 hover:bg-electric-cyan/30 border border-electric-cyan/50 rounded-lg flex items-center justify-center text-electric-cyan hover:text-white transition-all"
                  >
                    <Facebook size={24} />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-4">Studio Hours</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(contactInfo.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{day}</span>
                      <span className="text-white">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border-2 border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">FAQ</h3>
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-gray-800 rounded-lg px-4 data-[state=open]:border-electric-cyan"
                  >
                    <AccordionTrigger className="text-white hover:text-electric-cyan text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
