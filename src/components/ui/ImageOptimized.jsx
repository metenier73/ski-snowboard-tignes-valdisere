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
    if (!src) {
      setIsError(true);
      return;
    }

    const img = new window.Image();
    
    // Gestion du chargement réussi
    const handleLoad = () => {
      setIsLoading(false);
      setIsError(false);
    };

    // Gestion des erreurs
    const handleError = () => {
      setIsLoading(false);
      setIsError(true);
    };

    img.src = src;
    
    // Vérifier si l'image est déjà en cache
    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
    }

    // Nettoyage des écouteurs d'événements
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

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
