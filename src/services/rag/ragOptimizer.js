/**
 * Optimiseur pour le système RAG
 * Améliore les performances et la pertinence des réponses
 */

import { searchEngine } from './searchEngine.js';
import { ragService } from './ragService.js';

/**
 * Classe d'optimisation RAG
 */
export class RAGOptimizer {
  constructor() {
    this.queryCache = new Map();
    this.responseCache = new Map();
    this.userFeedback = new Map();
    this.performanceMetrics = {
      responseTime: [],
      userSatisfaction: [],
      queryComplexity: []
    };
    this.maxCacheSize = 100;
    this.cacheTimeout = 300000; // 5 minutes
  }

  /**
   * Optimise une requête avant traitement
   */
  optimizeQuery(query) {
    // Nettoyage et normalisation
    let optimizedQuery = query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\-àâäéèêëïîôöùûüÿç]/gi, '');

    // Expansion de synonymes
    optimizedQuery = this.expandSynonyms(optimizedQuery);

    // Correction d'erreurs communes
    optimizedQuery = this.correctCommonErrors(optimizedQuery);

    // Enrichissement contextuel
    optimizedQuery = this.enrichContext(optimizedQuery);

    return optimizedQuery;
  }

  /**
   * Expansion de synonymes pour améliorer la recherche
   */
  expandSynonyms(query) {
    const synonyms = {
      'prix': 'tarif coût',
      'cours': 'leçon formation enseignement',
      'ski': 'ski alpin',
      'snowboard': 'surf snow',
      'équipement': 'matériel gear',
      'sécurité': 'sécurisation protection',
      'hors-piste': 'hors piste off-piste',
      'météo': 'temps climat conditions',
      'réserver': 'réserver booker',
      'contact': 'contacter joindre',
      'débutant': 'débutant novice',
      'avancé': 'avancé expert confirmé'
    };

    let expandedQuery = query;
    Object.entries(synonyms).forEach(([key, values]) => {
      if (query.includes(key)) {
        expandedQuery += ' ' + values;
      }
    });

    return expandedQuery;
  }

  /**
   * Correction d'erreurs communes
   */
  correctCommonErrors(query) {
    const corrections = {
      'val disere': 'val d\'isère',
      'tigne': 'tignes',
      'tarifs': 'tarif prix',
      'equipement': 'équipement',
      'securite': 'sécurité',
      'meteo': 'météo',
      'hors piste': 'hors-piste'
    };

    let correctedQuery = query;
    Object.entries(corrections).forEach(([error, correction]) => {
      correctedQuery = correctedQuery.replace(new RegExp(error, 'gi'), correction);
    });

    return correctedQuery;
  }

  /**
   * Enrichissement contextuel basé sur l'historique
   */
  enrichContext(query) {
    const history = ragService.getHistory();
    if (history.length === 0) {
      return query;
    }

    // Récupère les mots-clés des dernières conversations
    const recentKeywords = history
      .slice(-3)
      .flatMap(entry => entry.query.split(' '))
      .filter(word => word.length > 3)
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    // Ajoute les mots-clés fréquents au contexte
    const topKeywords = Object.entries(recentKeywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([word]) => word);

    return topKeywords.length > 0 ? `${query} ${topKeywords.join(' ')}` : query;
  }

  /**
   * Mise en cache intelligente des réponses
   */
  getCachedResponse(query) {
    const cacheKey = this.generateCacheKey(query);
    const cached = this.responseCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.response;
    }
    
    return null;
  }

  /**
   * Mise en cache d'une réponse
   */
  setCachedResponse(query, response) {
    const cacheKey = this.generateCacheKey(query);
    
    // Gestion de la taille du cache
    if (this.responseCache.size >= this.maxCacheSize) {
      const oldestKey = this.responseCache.keys().next().value;
      this.responseCache.delete(oldestKey);
    }
    
    this.responseCache.set(cacheKey, {
      response,
      timestamp: Date.now(),
      hitCount: 1
    });
  }

  /**
   * Génère une clé de cache basée sur la requête
   */
  generateCacheKey(query) {
    return this.optimizeQuery(query).split(' ').sort().join('_');
  }

  /**
   * Enregistre le feedback utilisateur
   */
  recordFeedback(queryId, feedback) {
    this.userFeedback.set(queryId, {
      ...feedback,
      timestamp: new Date()
    });
    
    // Mise à jour des métriques
    this.performanceMetrics.userSatisfaction.push({
      timestamp: new Date(),
      satisfaction: feedback.rating,
      queryId
    });
  }

  /**
   * Optimise les résultats basé sur le feedback
   */
  optimizeBasedOnFeedback() {
    const feedbackEntries = Array.from(this.userFeedback.values());
    
    // Analyse des patterns de feedback négatif
    const negativePatterns = feedbackEntries
      .filter(feedback => feedback.rating < 3)
      .map(feedback => feedback.query)
      .join(' ');
    
    // Ajustement des paramètres de recherche
    if (negativePatterns.length > 0) {
      console.log('Optimisation basée sur le feedback négatif:', negativePatterns);
    }
  }

  /**
   * Mesure les performances du système
   */
  measurePerformance(startTime, endTime, queryComplexity) {
    const responseTime = endTime - startTime;
    
    this.performanceMetrics.responseTime.push({
      timestamp: new Date(),
      responseTime,
      queryComplexity
    });
    
    // Optimisation si les temps de réponse sont trop élevés
    if (responseTime > 2000) {
      console.warn('Temps de réponse élevé détecté:', responseTime + 'ms');
      this.optimizePerformance();
    }
  }

  /**
   * Optimise les performances du système
   */
  optimizePerformance() {
    // Réduction de la taille du cache si nécessaire
    if (this.responseCache.size > this.maxCacheSize * 0.8) {
      this.cleanOldCacheEntries();
    }
    
    // Optimisation des paramètres de recherche
    this.optimizeSearchParameters();
  }

  /**
   * Nettoie les anciennes entrées du cache
   */
  cleanOldCacheEntries() {
    const now = Date.now();
    for (const [key, value] of this.responseCache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.responseCache.delete(key);
      }
    }
  }

  /**
   * Optimise les paramètres de recherche
   */
  optimizeSearchParameters() {
    // Ajustement dynamique des seuils de score
    const avgResponseTime = this.performanceMetrics.responseTime
      .slice(-10)
      .reduce((sum, metric) => sum + metric.responseTime, 0) / 10;
    
    if (avgResponseTime > 1500) {
      // Augmentation du seuil minimum pour réduire les résultats
      searchEngine.defaultMinScore = Math.min(0.3, searchEngine.defaultMinScore + 0.05);
    }
  }

  /**
   * Génère des suggestions d'amélioration
   */
  generateImprovementSuggestions() {
    const suggestions = [];
    
    // Analyse des métriques de performance
    const avgSatisfaction = this.performanceMetrics.userSatisfaction
      .slice(-20)
      .reduce((sum, metric) => sum + metric.satisfaction, 0) / 20;
    
    if (avgSatisfaction < 3.5) {
      suggestions.push({
        type: 'satisfaction',
        message: 'Améliorer la pertinence des réponses',
        action: 'Réviser la base de connaissances'
      });
    }
    
    const avgResponseTime = this.performanceMetrics.responseTime
      .slice(-10)
      .reduce((sum, metric) => sum + metric.responseTime, 0) / 10;
    
    if (avgResponseTime > 1000) {
      suggestions.push({
        type: 'performance',
        message: 'Optimiser les temps de réponse',
        action: 'Améliorer la mise en cache'
      });
    }
    
    return suggestions;
  }

  /**
   * Exporte les métriques pour analyse
   */
  exportMetrics() {
    return {
      performance: this.performanceMetrics,
      cacheStats: {
        size: this.responseCache.size,
        hitRate: this.calculateCacheHitRate()
      },
      feedback: Array.from(this.userFeedback.values()),
      suggestions: this.generateImprovementSuggestions()
    };
  }

  /**
   * Calcule le taux de succès du cache
   */
  calculateCacheHitRate() {
    const totalRequests = this.performanceMetrics.responseTime.length;
    const cacheHits = this.responseCache.size;
    return totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;
  }

  /**
   * Réinitialise les métriques
   */
  resetMetrics() {
    this.performanceMetrics = {
      responseTime: [],
      userSatisfaction: [],
      queryComplexity: []
    };
    this.userFeedback.clear();
  }
}

/**
 * Instance globale de l'optimiseur
 */
export const ragOptimizer = new RAGOptimizer();

/**
 * Hook pour l'optimisation automatique
 */
export const useRAGOptimization = () => {
  return {
    optimizeQuery: (query) => ragOptimizer.optimizeQuery(query),
    recordFeedback: (queryId, feedback) => ragOptimizer.recordFeedback(queryId, feedback),
    getMetrics: () => ragOptimizer.exportMetrics(),
    resetMetrics: () => ragOptimizer.resetMetrics()
  };
};

/**
 * Fonctions utilitaires d'optimisation
 */
export const optimizationUtils = {
  /**
   * Analyse la complexité d'une requête
   */
  analyzeQueryComplexity(query) {
    const words = query.split(' ').length;
    const hasSpecialChars = /[^\w\s]/.test(query);
    const hasNumbers = /\d/.test(query);
    
    let complexity = 1;
    if (words > 10) {
      complexity += 1;
    }
    if (hasSpecialChars) {
      complexity += 1;
    }
    if (hasNumbers) {
      complexity += 1;
    }
    
    return Math.min(complexity, 5);
  },

  /**
   * Prédit la difficulté d'une requête
   */
  predictQueryDifficulty(query) {
    const complexity = optimizationUtils.analyzeQueryComplexity(query);
    const keywords = ['tarif', 'prix', 'cours', 'réservation', 'équipement'];
    const hasKeywords = keywords.some(keyword => query.toLowerCase().includes(keyword));
    
    return {
      complexity,
      hasKeywords,
      estimatedTime: complexity * 500 // ms
    };
  },

  /**
   * Optimise les paramètres de recherche dynamiquement
   */
  getOptimalSearchParams(query) {
    const difficulty = optimizationUtils.predictQueryDifficulty(query);
    
    return {
      maxResults: difficulty.complexity > 3 ? 5 : 3,
      minScore: difficulty.hasKeywords ? 0.2 : 0.3,
      timeout: difficulty.estimatedTime
    };
  }
};
