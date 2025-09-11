import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { siteConfig, pageMetadata, structuredData } from '@/config/seo';

/**
 * Composant SEO pour gérer les métadonnées des pages
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.page - La page courante (ex: 'home', 'gallery')
 * @param {string} [props.title] - Titre personnalisé (optionnel)
 * @param {string} [props.description] - Description personnalisée (optionnel)
 * @param {string} [props.image] - Image personnalisée (optionnel)
 * @param {string} [props.url] - URL personnalisée (optionnel)
 * @param {boolean} [props.noIndex] - Si vrai, demande aux moteurs de recherche de ne pas indexer la page
 * @returns {JSX.Element} Éléments de métadonnées pour le SEO
 */
const SEO = ({ 
  page, 
  title: customTitle, 
  description: customDescription, 
  image: customImage, 
  url: customUrl,
  noIndex = false,
  children 
}) => {
  // Récupère les métadonnées de la page ou utilise les valeurs par défaut
  const metadata = pageMetadata[page] || {};
  
  // Fusionne avec les valeurs personnalisées si fournies
  const title = customTitle || metadata.title || siteConfig.title;
  const description = customDescription || metadata.description || siteConfig.description;
  const image = customImage || metadata.image || siteConfig.defaultImage;
  const url = customUrl || `${siteConfig.siteUrl}${metadata.url || ''}`;
  
  // Construit le titre complet avec le template si nécessaire
  const fullTitle = title.includes(siteConfig.title) 
    ? title 
    : `${title} | ${siteConfig.title}`;

  return (
    <Helmet>
      {/* Balises de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteConfig.keywords.join(', ')} />
      
      {/* Balises Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={new URL(image, siteConfig.siteUrl).toString()} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Balises Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={new URL(image, siteConfig.siteUrl).toString()} />
      <meta name="twitter:site" content={siteConfig.twitter.handle} />
      
      {/* Balisage schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          ...structuredData,
          name: fullTitle,
          description,
          image: new URL(image, siteConfig.siteUrl).toString(),
          url,
        })}
      </script>
      
      {/* Balises de contrôle des robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Balise canonique */}
      <link rel="canonical" href={url} />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Autres balises personnalisées */}
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  page: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  noIndex: PropTypes.bool,
  children: PropTypes.node,
};

export default SEO;
