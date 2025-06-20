'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Grid3X3, Heart, Share2, X } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  hotelName: string;
}

const ImageCarousel = ({ images, hotelName }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Main Image */}
        <div className="relative w-full h-full">
          <img 
            src={images[currentIndex]} 
            alt={`${hotelName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="sm"
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          
          {/* Gallery Button */}
          <Button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 shadow-lg"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            View All Photos ({images.length})
          </Button>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        
        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-2 justify-center overflow-x-auto">
            {images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-white shadow-lg' 
                    : 'border-white/50 hover:border-white/80'
                }`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {images.length > 6 && (
              <button
                onClick={() => setShowGallery(true)}
                className="flex-shrink-0 w-16 h-12 rounded-lg bg-black/50 border-2 border-white/50 hover:border-white/80 flex items-center justify-center text-white text-xs font-medium"
              >
                +{images.length - 6}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Full Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl mx-auto p-4">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg z-10"
            >
              <X className="w-5 h-5" />
            </Button>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full overflow-y-auto pt-16">
              {images.map((image, index) => (
                <Card key={index} className="group cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${hotelName} - Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onClick={() => {
                          setCurrentIndex(index);
                          setShowGallery(false);
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;