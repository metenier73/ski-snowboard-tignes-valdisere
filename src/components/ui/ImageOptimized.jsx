import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant d'image optimisée avec lazy loading et support WebP
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.src - Chemin de l'image source
 * @param {string} props.alt - Texte alternatif de l'image (obligatoire pour l'accessibilité)
 * @param {string} [props.className] - Classes CSS supplémentaires
 * @param {Object} [props.style] - Styles en ligne supplémentaires
 * @param {string} [props.loading] - Comportement de chargement (lazy, eager)
 * @param {string} [props.sizes] - Tailles d'affichage pour les images responsives
 * @param {string} [props.srcSet] - Ensemble de sources pour les images responsives
 * @returns {JSX.Element} Composant d'image optimisée
 */
const ImageOptimized = ({
  src,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  srcSet,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageSrcSet, setImageSrcSet] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.group('ImageOptimized - Chargement de l\'image');
    console.log('Source de l\'image:', src);
    console.log('Emplacement actuel:', window.location.href);
    
    if (!src) {
      console.error('❌ Aucune source d\'image fournie');
      setIsError(true);
      setIsLoading(false);
      console.groupEnd();
      return;
    }
    
    // Réinitialiser l'état à chaque changement de source
    setIsLoading(true);
    setIsError(false);
    console.log('Chargement de l\'image en cours...');

    // Vérifier si l'URL est valide
    try {
      // Créer une URL absolue si c'est un chemin relatif
      let absoluteSrc;
      
      if (src.startsWith('http') || src.startsWith('data:')) {
        absoluteSrc = src;
      } else if (src.startsWith('/')) {
        // Pour les chemins absolus, utiliser directement avec l'origine
        absoluteSrc = window.location.origin + src;
      } else {
        // Pour les chemins relatifs, construire le chemin complet
        absoluteSrc = new URL(src, window.location.origin).toString();
      }
      
      console.log('URL absolue de l\'image:', absoluteSrc);
      
      const img = new window.Image();
      
      // Gestion du chargement réussi
      const handleLoad = () => {
        console.log('✅ Image chargée avec succès:', {
          src: absoluteSrc,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete
        });
        setIsLoading(false);
        setIsError(false);
        setImageSrc(absoluteSrc);
        if (srcSet) setImageSrcSet(srcSet);
        console.groupEnd();
      };

      // Gestion des erreurs
      const handleError = (error) => {
        console.error('❌ Erreur lors du chargement de l\'image:', {
          src: absoluteSrc,
          error: error.message || 'Erreur inconnue',
          errorType: error.type || 'Non spécifié'
        });
        
        setIsLoading(false);
        setIsError(true);
        
        // Essayer de charger une image de secours si disponible
        if (src !== '/images/fallback.jpg') {
          console.log('🔄 Tentative de chargement de l\'image de secours...');
          setImageSrc('/images/fallback.jpg');
        }
        
        console.groupEnd();
      };

      // Configuration des écouteurs d'événements
      console.log('🔗 Configuration des écouteurs d\'événements');
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);

      // Définir la source de l'image
      console.log('🚀 Démarrage du chargement de l\'image');
      img.src = absoluteSrc;
      if (srcSet) {
        console.log('Utilisation de srcSet:', srcSet);
        img.srcset = srcSet;
      }

      // Nettoyage
      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
    } catch (error) {
      console.error('Erreur lors du traitement de l\'URL de l\'image:', error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [src, srcSet]);

  // Si l'image est en cours de chargement, afficher un placeholder
  if (isLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse ${className}`} 
        style={style}
        aria-hidden="true"
      />
    );
  }

  // En cas d'erreur, afficher un message d'erreur
  if (isError) {
    return (
      <div 
        className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ${className}`} 
        role="alert"
        style={style}
      >
        <p>Impossible de charger l'image</p>
      </div>
    );
  }

  // Rendu de l'image optimisée
  return (
    <picture>
      {/* Version WebP si supportée */}
      <source 
        srcSet={srcSet ? srcSet.replace(/\.(jpg|jpeg|png)/g, '.webp') : src.replace(/\.(jpg|jpeg|png)/g, '.webp')} 
        type="image/webp"
      />
      {/* Version originale comme fallback */}
      <source 
        srcSet={srcSet || src} 
        type={`image/${src.split('.').pop().toLowerCase()}`} 
      />
      {/* Balise img pour la compatibilité */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        sizes={sizes}
        srcSet={srcSet}
        {...props}
      />
    </picture>
  );
};

ImageOptimized.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
};

export default ImageOptimized;
