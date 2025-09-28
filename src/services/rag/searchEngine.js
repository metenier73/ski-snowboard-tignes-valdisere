/**
 * Moteur de recherche sémantique pour le système RAG
 * Utilise des techniques de recherche textuelle avancées
 */

import { knowledgeBase, searchKnowledgeBase } from './knowledgeBase.js';

/**
 * Classe principale du moteur de recherche
 */
export class SemanticSearchEngine {
  constructor() {
    this.knowledgeBase = knowledgeBase;
    this.stopWords = new Set([
      'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'ou', 'mais', 'donc', 'or', 'ni', 'car',
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'
    ]);
  }

  /**
   * Tokenise et nettoie le texte
   */
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2 && !this.stopWords.has(token));
  }

  /**
   * Calcule la similarité cosinus entre deux vecteurs de tokens
   */
  cosineSimilarity(tokens1, tokens2) {
    const allTokens = new Set([...tokens1, ...tokens2]);
    const vector1 = Array.from(allTokens).map(token => tokens1.filter(t => t === token).length);
    const vector2 = Array.from(allTokens).map(token => tokens2.filter(t => t === token).length);
    
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }
    return dotProduct / (magnitude1 * magnitude2);
  }

  /**
   * Recherche sémantique avancée
   */
  search(query, options = {}) {
    const {
      maxResults = 5,
      minScore = 0.1,
      categories = null,
      boostRecent = false
    } = options;

    const queryTokens = this.tokenize(query);
    
    const results = this.knowledgeBase
      .filter(doc => !categories || categories.includes(doc.category))
      .map(doc => {
        const titleTokens = this.tokenize(doc.title);
        const contentTokens = this.tokenize(doc.content);
        const keywordTokens = doc.keywords.flatMap(kw => this.tokenize(kw));
        
        // Calcul des scores
        const titleScore = this.cosineSimilarity(queryTokens, titleTokens) * 3;
        const contentScore = this.cosineSimilarity(queryTokens, contentTokens) * 2;
        const keywordScore = this.cosineSimilarity(queryTokens, keywordTokens) * 1.5;
        
        // Score de correspondance exacte
        const exactMatch = doc.content.toLowerCase().includes(query.toLowerCase()) ? 5 : 0;
        
        // Score final
        let finalScore = titleScore + contentScore + keywordScore + exactMatch;
        
        // Bonus pour les mots-clés exacts
        doc.keywords.forEach(keyword => {
          if (query.toLowerCase().includes(keyword.toLowerCase())) {
            finalScore += 2;
          }
        });

        return {
          ...doc,
          score: finalScore,
          matchDetails: {
            titleScore,
            contentScore,
            keywordScore,
            exactMatch
          }
        };
      })
      .filter(doc => doc.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    return results;
  }

  /**
   * Recherche par catégorie
   */
  searchByCategory(category, query = '', maxResults = 5) {
    return this.search(query, { 
      maxResults, 
      categories: [category] 
    });
  }

  /**
   * Recherche avec suggestions
   */
  searchWithSuggestions(query, maxResults = 5) {
    const results = this.search(query, { maxResults });
    
    // Génère des suggestions basées sur les résultats
    const suggestions = this.generateSuggestions(query, results);
    
    return {
      results,
      suggestions,
      query
    };
  }

  /**
   * Génère des suggestions de recherche
   */
  generateSuggestions(originalQuery, results) {
    const suggestions = new Set();
    
    // Suggestions basées sur les catégories des résultats
    results.forEach(result => {
      suggestions.add(result.category);
    });
    
    // Suggestions basées sur les mots-clés des résultats
    results.forEach(result => {
      result.keywords.forEach(keyword => {
        if (!originalQuery.toLowerCase().includes(keyword.toLowerCase())) {
          suggestions.add(keyword);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  }

  /**
   * Recherche contextuelle (pour les conversations)
   */
  contextualSearch(query, context = [], maxResults = 3) {
    // Combine la query actuelle avec le contexte
    const contextualQuery = [...context, query].join(' ');
    return this.search(contextualQuery, { maxResults });
  }

  /**
   * Recherche avec filtres avancés
   */
  advancedSearch(filters) {
    const {
      query = '',
      categories = [],
      minScore = 0.1,
      maxResults = 10,
      sortBy = 'score',
      sortOrder = 'desc'
    } = filters;

    let results = this.search(query, { maxResults: 50, minScore, categories });
    
    // Tri personnalisé
    if (sortBy !== 'score') {
      results.sort((a, b) => {
        const aVal = a[sortBy] || '';
        const bVal = b[sortBy] || '';
        return sortOrder === 'desc' ? 
          bVal.localeCompare(aVal) : 
          aVal.localeCompare(bVal);
      });
    }
    
    return results.slice(0, maxResults);
  }
}

/**
 * Instance globale du moteur de recherche
 */
export const searchEngine = new SemanticSearchEngine();

/**
 * Fonctions utilitaires pour la recherche
 */
export const searchUtils = {
  /**
   * Recherche rapide avec score minimum
   */
  quickSearch(query, minScore = 0.3) {
    return searchEngine.search(query, { minScore, maxResults: 3 });
  },

  /**
   * Recherche par catégorie
   */
  searchCategory(category, query = '') {
    return searchEngine.searchByCategory(category, query);
  },

  /**
   * Recherche avec auto-complétion
   */
  autocomplete(query, maxSuggestions = 5) {
    if (query.length < 2) {
      return [];
    }
    
    const allKeywords = new Set();
    knowledgeBase.forEach(doc => {
      doc.keywords.forEach(keyword => allKeywords.add(keyword));
    });
    
    return Array.from(allKeywords)
      .filter(keyword => {
        return keyword.toLowerCase().startsWith(query.toLowerCase());
      })
      .slice(0, maxSuggestions);
  },

  /**
   * Recherche de documents similaires
   */
  findSimilar(documentId, maxResults = 3) {
    const targetDoc = knowledgeBase.find(doc => doc.id === documentId);
    if (!targetDoc) return [];
    
    const queryTokens = searchEngine.tokenize(targetDoc.content);
    
    return knowledgeBase
      .filter(doc => doc.id !== documentId)
      .map(doc => {
        const docTokens = searchEngine.tokenize(doc.content);
        const similarity = searchEngine.cosineSimilarity(queryTokens, docTokens);
        return { ...doc, similarity };
      })
      .filter(doc => doc.similarity > 0.1)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults);
  }
};
