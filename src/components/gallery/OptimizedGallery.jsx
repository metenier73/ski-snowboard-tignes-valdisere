import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageOptimized from '@/components/ui/ImageOptimized';
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages';

const OptimizedGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  // Effet pour le débogage
  useEffect(() => {
    console.log('OptimizedGallery - Montage du composant');
    console.log('Nombre total d\'images:', totalImages);
    
    // Vérifier les chemins des images
    console.log('Chemins des images:');
    for (let i = 0; i < totalImages; i++) {
      const imgPath = getGalleryImage(i);
      console.log(`- Image ${i}: ${imgPath}`);
    }
  }, []);

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // Fonction pour revenir à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  // Gestion du glissement tactile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    // Réinitialiser
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Défilement automatique
  useEffect(() => {
    let intervalId;
    
    if (isAutoPlay) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlay, currentSlide]);

  // Pause si le composant n'est pas visible (IntersectionObserver)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        setIsAutoPlay(false);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Navigation clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Home') setCurrentSlide(0);
      if (e.key === 'End') setCurrentSlide(totalImages - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Précharger l'image suivante pour fluidité
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % totalImages;
    const img = new Image();
    img.src = getGalleryImage(nextIndex);
  }, [currentSlide]);

  // Mettre à jour le titre de la page avec le numéro de la diapositive
  useEffect(() => {
    document.title = `Galerie - Photo ${currentSlide + 1}/${totalImages} | Tignes - Val d'Isère`;
    
    // Mettre à jour l'URL avec le hash de la diapositive
    window.history.replaceState({}, '', `#slide-${currentSlide + 1}`);
    
    // Log de débogage
    const currentImage = getGalleryImage(currentSlide);
    const altText = galleryAltTexts[currentSlide % galleryAltTexts.length];
    console.log('Chargement de l\'image:', {
      index: currentSlide,
      src: currentImage,
      alt: altText,
      totalImages: totalImages
    });
  }, [currentSlide]);

  // Générer les points de navigation
  const renderDots = () => {
    return Array.from({ length: totalImages }).map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 mx-1 rounded-full transition-colors ${
          index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
        }`}
        aria-label={`Aller à la photo ${index + 1}`}
      />
    ));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-lg shadow-xl"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      role="region"
      aria-label="Galerie d'images Tignes & Val d'Isère"
    >
      {/* Contrôles de navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Photo précédente"
      >
        <ChevronLeft size={32} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Photo suivante"
      >
        <ChevronRight size={32} />
      </button>

      {/* Bouton lecture/pause */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isAutoPlay ? "Arrêter le défilement automatique" : "Démarrer le défilement automatique"}
      >
        {isAutoPlay ? '⏸️' : '▶️'}
      </button>

      {/* Conteneur de la galerie */}
      <div 
        className="relative w-full aspect-video bg-gray-100 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ImageOptimized
          src={getGalleryImage(currentSlide)}
          alt={galleryAltTexts[currentSlide % galleryAltTexts.length]}
          className="w-full h-full object-cover"
          loading={currentSlide === 0 ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        
        {/* Légende de l'image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white" aria-live="polite">
          <p className="text-sm md:text-base">
            {galleryAltTexts[currentSlide % galleryAltTexts.length]}
            <span className="block text-xs opacity-75 mt-1">
              Photo {currentSlide + 1} / {totalImages}
            </span>
          </p>
        </div>
      </div>

      {/* Bandeau vignettes + points */}
      <div className="p-3 bg-gray-50">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: totalImages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative flex-shrink-0 w-16 h-10 rounded overflow-hidden border ${index === currentSlide ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
              aria-label={`Voir la photo ${index + 1}`}
            >
              <img
                src={getGalleryImage(index)}
                alt={galleryAltTexts[index % galleryAltTexts.length]}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        <div className="flex justify-center items-center mt-2">
          {renderDots()}
        </div>
      </div>
    </div>
  );
};

export default OptimizedGallery;
