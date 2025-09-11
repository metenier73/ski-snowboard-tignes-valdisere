import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = ({ t, currentSlide, nextSlide, prevSlide, getCarouselImage, galleryAltTexts, totalImages }) => {
  return (
    <section id="home" className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              {t.hero.description.split('\n\n').map((paragraph, i) => (
                <span key={i} className="block mb-4">{paragraph}</span>
              ))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <a href="#booking">
                  {t.hero.cta}
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <a href="#contact">
                  Contactez-moi
                </a>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={getCarouselImage(currentSlide)} 
                alt={galleryAltTexts[currentSlide % galleryAltTexts.length]}
                className="w-full h-auto rounded-2xl transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">
                  {galleryAltTexts[currentSlide % galleryAltTexts.length]}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex space-x-2">
                    {Array.from({ length: totalImages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {}}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                        aria-label={`Aller à la photo ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                      aria-label="Photo précédente"
                    >
                      <ChevronDown className="h-5 w-5 transform rotate-90" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                      aria-label="Photo suivante"
                    >
                      <ChevronDown className="h-5 w-5 transform -rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
