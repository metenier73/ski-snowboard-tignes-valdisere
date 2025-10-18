/**
 * Point d'entrée principal pour le système RAG
 * Exporte tous les services et utilitaires
 */

// Services principaux
export { ragService, ragUtils } from './ragService.js';
export { searchEngine, searchUtils } from './searchEngine.js';
export { knowledgeBase, searchKnowledgeBase, getDocumentsByCategory, getDocumentById } from './knowledgeBase.js';

// Optimisation
export { ragOptimizer, useRAGOptimization, optimizationUtils } from './ragOptimizer.js';

// Composants (pour usage externe si nécessaire)
export { default as RAGChat } from '../../components/rag/RAGChat.jsx';
export { default as RAGSearch } from '../../components/rag/RAGSearch.jsx';
export { default as RAGAssistant } from '../../components/rag/RAGAssistant.jsx';

/**
 * Configuration par défaut du système RAG
 */
export const RAGConfig = {
  // Paramètres de recherche
  search: {
    maxResults: 5,
    minScore: 0.2,
    timeout: 5000,
    enableCache: true,
    cacheTimeout: 300000 // 5 minutes
  },
  
  // Paramètres de génération
  generation: {
    maxDocuments: 3,
    includeSources: true,
    language: 'fr',
    enableSuggestions: true
  },
  
  // Paramètres d'optimisation
  optimization: {
    enableQueryOptimization: true,
    enableCaching: true,
    enableFeedback: true,
    maxCacheSize: 100
  },
  
  // Paramètres d'interface
  ui: {
    enableAnimations: true,
    showConfidence: true,
    showSources: true,
    enableSuggestions: true
  }
};

/**
 * Fonction d'initialisation du système RAG
 */
export const initializeRAG = (config = {}) => {
  const finalConfig = { ...RAGConfig, ...config };
  
  // Configuration des services
  if (finalConfig.optimization.enableCaching) {
    console.log('Système RAG initialisé avec mise en cache activée');
  }
  
  if (finalConfig.optimization.enableQueryOptimization) {
    console.log('Optimisation des requêtes activée');
  }
  
  return {
    config: finalConfig,
    services: {
      rag: ragService,
      search: searchEngine,
      optimizer: ragOptimizer
    }
  };
};

/**
 * Fonction de diagnostic du système RAG
 */
export const diagnoseRAG = () => {
  const metrics = ragOptimizer.exportMetrics();
  const knowledgeBaseStats = {
    totalDocuments: knowledgeBase.length,
    categories: [...new Set(knowledgeBase.map(doc => doc.category))].length,
    avgKeywords: knowledgeBase.reduce((sum, doc) => sum + doc.keywords.length, 0) / knowledgeBase.length
  };
  
  return {
    status: 'healthy',
    metrics,
    knowledgeBase: knowledgeBaseStats,
    recommendations: metrics.suggestions
  };
};

/**
 * Fonction de mise à jour de la base de connaissances
 */
export const updateKnowledgeBase = (newDocuments) => {
  if (!Array.isArray(newDocuments)) {
    throw new Error('Les nouveaux documents doivent être un tableau');
  }
  
  // Validation des documents
  const validatedDocuments = newDocuments.filter(doc => {
    return doc.id && doc.title && doc.content && doc.category && doc.keywords;
  });
  
  if (validatedDocuments.length !== newDocuments.length) {
    console.warn('Certains documents ont été rejetés lors de la validation');
  }
  
  // Ajout à la base de connaissances (dans un vrai système, ceci irait en base de données)
  knowledgeBase.push(...validatedDocuments);
  
  console.log(`${validatedDocuments.length} nouveaux documents ajoutés à la base de connaissances`);
  
  return {
    added: validatedDocuments.length,
    rejected: newDocuments.length - validatedDocuments.length,
    total: knowledgeBase.length
  };
};

/**
 * Fonction de recherche globale
 */
export const searchEverything = async (query, options = {}) => {
  const startTime = Date.now();
  
  try {
    // Optimisation de la requête
    const optimizedQuery = ragOptimizer.optimizeQuery(query);
    
    // Recherche dans la base de connaissances
    const searchResults = searchEngine.search(optimizedQuery, {
      maxResults: options.maxResults || 5,
      minScore: options.minScore || 0.2
    });
    
    // Génération de réponse contextuelle
    const response = await ragService.generateResponse(optimizedQuery, {
      maxDocuments: options.maxDocuments || 3,
      includeSources: options.includeSources !== false,
      language: options.language || 'fr'
    });
    
    // Mesure des performances
    const endTime = Date.now();
    ragOptimizer.measurePerformance(startTime, endTime, optimizationUtils.analyzeQueryComplexity(query));
    
    return {
      query: optimizedQuery,
      response,
      searchResults,
      performance: {
        responseTime: endTime - startTime,
        resultsCount: searchResults.length
      }
    };
    
  } catch (error) {
    console.error('Erreur lors de la recherche globale:', error);
    throw error;
  }
};

// Export par défaut
export default {
  initialize: initializeRAG,
  diagnose: diagnoseRAG,
  updateKnowledgeBase,
  search: searchEverything,
  config: RAGConfig
};




