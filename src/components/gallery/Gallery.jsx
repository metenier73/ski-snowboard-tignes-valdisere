import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImagePlus } from 'lucide-react';
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setSelectedImage(getGalleryImage(index));
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigate = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + totalImages) % totalImages;
    } else {
      newIndex = (currentIndex + 1) % totalImages;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(getGalleryImage(newIndex));
  };

  // Créer un tableau d'images pour la grille
  const gridImages = Array.from({ length: 12 }).map((_, i) => ({
    src: getGalleryImage(i % totalImages),
    alt: galleryAltTexts[i % galleryAltTexts.length],
    index: i % totalImages
  }));

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galerie Photos
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les paysages magnifiques et les moments inoubliables de nos cours de ski et snowboard.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gridImages.map((img, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => openModal(img.index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ImagePlus className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Réserver maintenant
          </a>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Fermer"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={() => navigate('prev')}
            className="absolute left-4 text-white hover:text-gray-300 focus:outline-none p-2 bg-black bg-opacity-50 rounded-full"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <div className="max-w-4xl max-h-[90vh] overflow-hidden">
            <img
              src={selectedImage}
              alt={galleryAltTexts[currentIndex % galleryAltTexts.length]}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="mt-2 text-center text-white">
              {galleryAltTexts[currentIndex % galleryAltTexts.length]}
            </div>
          </div>
          
          <button
            onClick={() => navigate('next')}
            className="absolute right-4 text-white hover:text-gray-300 focus:outline-none p-2 bg-black bg-opacity-50 rounded-full"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {Array.from({ length: Math.min(10, totalImages) }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setSelectedImage(getGalleryImage(i));
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex % totalImages ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Aller à la photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
