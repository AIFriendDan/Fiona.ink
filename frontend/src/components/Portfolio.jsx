import React, { useState } from 'react';
import { portfolioImages } from '../data/mock';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Blackwork', 'Realism', 'Traditional', 'Ornamental', 'Lettering'];

  const filteredImages = selectedCategory === 'All' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white mb-4">
            Port<span className="text-electric-purple">folio</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Explore a collection of custom tattoo designs, from intricate blackwork to stunning realism
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`service-button transition-all ${
                selectedCategory === category
                  ? 'bg-electric-purple text-white border-electric-purple shadow-lg shadow-electric-purple/30'
                  : 'bg-transparent text-gray-400 border-gray-600 hover:border-electric-cyan hover:text-electric-cyan'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-900"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/50 rounded-full mb-3">
                    {image.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-5xl w-full bg-black border-2 border-electric-purple/30 p-0">
          {selectedImage && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-50 p-2 bg-black/80 text-white hover:text-electric-cyan rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black/80 text-white hover:text-electric-cyan rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black/80 text-white hover:text-electric-cyan rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>

              {/* Image */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Image Info */}
              <div className="p-6 bg-gradient-to-t from-black to-transparent">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/50 rounded-full mb-3">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
