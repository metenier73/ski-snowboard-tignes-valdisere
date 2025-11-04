/**
 * Service RAG (Retrieval Augmented Generation) principal
 * Combine la recherche sémantique avec la génération de réponses contextuelles
 */

import { searchEngine, searchUtils } from './searchEngine.js';
import { knowledgeBase } from './knowledgeBase.js';

/**
 * Classe principale du service RAG
 */
export class RAGService {
  constructor() {
    this.searchEngine = searchEngine;
    this.conversationHistory = [];
    this.maxHistoryLength = 10;
    this._availabilityCache = { data: null, ts: 0 };
  }

  /**
   * Traite une question et génère une réponse contextuelle
   */
  async generateResponse(userQuery, options = {}) {
    const {
      maxDocuments = 3,
      includeSources = true,
      language = 'fr',
      contextLength = 5,
      boostDocumentId = null,
      boostDocument = null
    } = options;

    try {
      const queryLower = userQuery.toLowerCase();

      // 0. Déterminer si la requête concerne la disponibilité
      const availabilityIntent = this.isAvailabilityQuery(queryLower);

      // 0.b Charger les disponibilités si nécessaire et créer un document boosté
      let availabilityDoc = null;
      if (availabilityIntent) {
        const availability = await this.loadAvailability();
        availabilityDoc = this.buildAvailabilityDoc(availability);
      }

      // 1. Récupération des documents pertinents (avec boost éventuel)
      const retrievedDocs = this.retrieveRelevantDocuments(
        userQuery,
        maxDocuments,
        { boostDocumentId, boostDocument: availabilityDoc || boostDocument }
      );
      
      // 2. Construction du contexte
      const context = this.buildContext(retrievedDocs, userQuery);
      
      // 3. Génération de la réponse (spécial disponibilité si pertinent)
      let response;
      if (availabilityIntent) {
        const availability = availabilityDoc ? null : await this.loadAvailability();
        const data = availabilityDoc ? null : availability;
        response = await this.generateAvailabilityResponse(userQuery, availabilityDoc?.payload || data);
      } else {
        response = await this.generateContextualResponse(userQuery, context, language);
      }
      
      // 4. Ajout à l'historique
      this.addToHistory(userQuery, response, retrievedDocs);
      
      // 5. Formatage de la réponse finale
      return {
        answer: response,
        sources: includeSources ? retrievedDocs.map(doc => ({
          id: doc.id,
          title: doc.title,
          category: doc.category,
          score: doc.score,
          preview: typeof doc.content === 'string' ? (doc.content.length > 240 ? doc.content.slice(0, 240) + '...' : doc.content) : ''
        })) : [],
        confidence: this.calculateConfidence(retrievedDocs),
        suggestions: this.generateFollowUpQuestions(userQuery, retrievedDocs)
      };

    } catch (error) {
      console.error('Erreur dans RAGService:', error);
      return this.getFallbackResponse(userQuery);
    }
  }

  /**
   * Récupère les documents les plus pertinents
   */
  retrieveRelevantDocuments(query, maxDocuments, extra = {}) {
    // Recherche principale
    const mainResults = this.searchEngine.search(query, { 
      maxResults: maxDocuments,
      minScore: 0.2
    });

    // Recherche contextuelle si on a un historique
    let contextResults = [];
    if (this.conversationHistory.length > 0) {
      contextResults = this.searchEngine.contextualSearch(query, this.getRecentContext(), maxDocuments);
    }

    // Combine et déduplique les résultats
    let allResults = [...mainResults, ...contextResults];

    // Boost par catégorie selon la requête
    const q = query.toLowerCase();
    const categoryBoosts = this.getCategoryBoosts(q);
    allResults = allResults.map(doc => {
      const boost = categoryBoosts[doc.category] || 0;
      return { ...doc, score: (doc.score || 0) + boost };
    });

    // Boost d'un document sélectionné (placé en tête)
    if (extra && (extra.boostDocument || extra.boostDocumentId)) {
      let boosted = null;
      if (extra.boostDocument) {
        boosted = { ...extra.boostDocument, score: 999 }; // score très élevé pour prioriser
      } else if (extra.boostDocumentId) {
        const kbDoc = knowledgeBase.find(doc => doc.id === extra.boostDocumentId);
        if (kbDoc) {
          boosted = { ...kbDoc, score: 999 };
        }
      }
      if (boosted) {
        allResults = [boosted, ...allResults];
      }
    }
    const uniqueResults = this.deduplicateResults(allResults);
    
    return uniqueResults.slice(0, maxDocuments);
  }

  /**
   * Construit le contexte à partir des documents récupérés
   */
  buildContext(documents, query) {
    const contextParts = [];
    
    documents.forEach((doc, index) => {
      contextParts.push(`Document ${index + 1} - ${doc.title}:
${doc.content}

Catégorie: ${doc.category}
Mots-clés: ${doc.keywords.join(', ')}`);
    });

    return contextParts.join('\n\n---\n\n');
  }

  /**
   * Génère une réponse contextuelle (simulation d'un LLM)
   */
  async generateContextualResponse(query, context, language) {
    // Simulation d'un modèle de langage - dans un vrai système, 
    // ceci ferait appel à OpenAI, Claude, ou un modèle local
    
    const queryLower = query.toLowerCase();
    
    // Réponses spécialisées basées sur le type de question
    if (queryLower.includes('tarif') || queryLower.includes('prix') || queryLower.includes('coût')) {
      return this.generatePricingResponse(context);
    }
    
    if (queryLower.includes('cours') || queryLower.includes('apprendre') || queryLower.includes('niveau')) {
      return this.generateLessonResponse(context);
    }
    
    if (queryLower.includes('équipement') || queryLower.includes('matériel') || queryLower.includes('sécurité')) {
      return this.generateEquipmentResponse(context);
    }
    
    if (queryLower.includes('météo') || queryLower.includes('conditions') || queryLower.includes('neige')) {
      return this.generateWeatherResponse(context);
    }
    
    if (queryLower.includes('contact') || queryLower.includes('réserver') || queryLower.includes('réservation')) {
      return this.generateContactResponse(context);
    }
    
    // Réponse générique basée sur le contexte
    return this.generateGenericResponse(query, context);
  }

  // Détection d'intention disponibilité
  isAvailabilityQuery(queryLower) {
    const terms = ['disponible', 'disponibil', 'matin', 'après-midi', "apres-midi", 'matins', 'aprem', 'créneau', 'creneau', 'réserver', 'reservation', 'réservation'];
    return terms.some(t => queryLower.includes(t)) || /\b\d{1,2}\/\d{1,2}\/\d{4}\b/.test(queryLower);
  }

  // Chargement et cache de availability.json
  async loadAvailability() {
    const now = Date.now();
    if (this._availabilityCache.data && now - this._availabilityCache.ts < 5 * 60 * 1000) {
      return this._availabilityCache.data;
    }
    try {
      const res = await fetch('/availability.json', { cache: 'no-cache' });
      const data = await res.json();
      this._availabilityCache = { data, ts: now };
      return data;
    } catch (e) {
      console.warn('RAGService: impossible de charger availability.json', e);
      return { morningsBlocked: [], afternoonsBlocked: [] };
    }
  }

  // Construire un document RAG depuis les disponibilités
  buildAvailabilityDoc(availability) {
    const m = availability?.morningsBlocked || [];
    const a = availability?.afternoonsBlocked || [];
    const content = `Disponibilités (source calendrier):\nMatins bloqués: ${m.length} dates\nAprès-midis bloqués: ${a.length} dates`;
    return { id: 'availability-json', category: 'disponibilite', title: 'Disponibilités actuelles', content, score: 500, payload: availability };
  }

  // Générer une réponse ciblée disponibilité
  async generateAvailabilityResponse(query, availability) {
    const m = new Set(availability?.morningsBlocked || []);
    const a = new Set(availability?.afternoonsBlocked || []);

    // Cherche une date au format fr FR dd/mm/yyyy
    const match = query.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
    if (match) {
      const iso = this.frDateToISO(match[0]);
      const morning = m.has(iso);
      const afternoon = a.has(iso);
      if (morning && afternoon) {
        return `Le ${match[0]}, je suis indisponible toute la journée (matin et après-midi).`;
      } else if (morning) {
        {
          const extended = new Set(['26/01/2026','27/01/2026','28/01/2026','29/01/2026','30/01/2026']);
          const morning = extended.has(match[0]) ? '09:00–14:00' : '09:00–13:00';
          return `Le ${match[0]}, le matin (${morning}) est indisponible. L'après-midi reste disponible.`;
        }
      } else if (afternoon) {
        {
          const extended = new Set(['26/01/2026','27/01/2026','28/01/2026','29/01/2026','30/01/2026']);
          const afternoon = extended.has(match[0]) ? '14:00–16:30' : '13:00–16:30';
          return `Le ${match[0]}, l'après-midi (${afternoon}) est indisponible. Le matin reste disponible.`;
        }
      } else {
        return `Le ${match[0]}, je suis disponible sur les deux créneaux (matin et après-midi).`;
      }
    }

    // Pas de date précise: fournir un résumé utile
    return `Je peux vérifier une date précise si vous me donnez le format jj/mm/aaaa. À titre indicatif: ${
      (availability?.morningsBlocked?.length || 0)
    } matin(s) et ${
      (availability?.afternoonsBlocked?.length || 0)
    } après-midi bloqué(s) dans le calendrier actuel.`;
  }

  frDateToISO(ddmmyyyy) {
    const [d, m, y] = ddmmyyyy.split('/').map(v => parseInt(v, 10));
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  }

  getCategoryBoosts(queryLower) {
    const boosts = {
      tarifs: 0,
      services: 0,
      contact: 0,
      meteo: 0,
      securite: 0,
      stations: 0,
      disponibilite: 0
    };
    if (/(tarif|prix|co[uû]t)/.test(queryLower)) boosts.tarifs = 2;
    if (/(cours|le[çc]on|apprendre|niveau|hors-piste|snowboard|ski)/.test(queryLower)) boosts.services = 1.5;
    if (/(contact|r[ée]server|r[ée]servation|t[ée]l[ée]phone|email)/.test(queryLower)) boosts.contact = 2;
    if (/(m[ée]t[ée]o|neige|conditions)/.test(queryLower)) boosts.meteo = 1.5;
    if (/(s[ée]curit[ée]|avalanche|DVA|urgence)/i.test(queryLower)) boosts.securite = 1.5;
    if (/(tignes|val d'is[eè]re|station)/.test(queryLower)) boosts.stations = 1;
    if (this.isAvailabilityQuery(queryLower)) boosts.disponibilite = 3;
    return boosts;
  }

  /**
   * Génère une réponse sur les tarifs
   */
  generatePricingResponse(context) {
    return `Basé sur les informations disponibles, voici les détails sur nos tarifs pour l'hiver 2025-2026 :

Les tarifs varient selon les périodes :
• Début de saison (novembre-décembre) : à partir de 79€/heure
• Saison régulière : 89-100€/heure  
• Vacances scolaires et fêtes : tarifs majorés (jusqu'à 131€/heure)

• Tarifs journée : 495€ à 851€ selon la période
• Remise de 8% pour les cours d'après-midi
• Créneaux disponibles : 09:00-13:00 et 13:00-16:30

Pour connaître le tarif exact pour votre période de séjour, n'hésitez pas à me contacter directement.`;
  }

  /**
   * Génère une réponse sur les cours
   */
  generateLessonResponse(context) {
    return `Je propose des cours adaptés à tous les niveaux :

🎿 **Ski Alpin :**
• Débutant : apprentissage des bases en confiance
• Intermédiaire : amélioration technique et fluidité
• Avancé : perfectionnement et pistes rouges/noires

🏂 **Snowboard :**
• Initiation : équilibre et premières descentes
• Perfectionnement : virages frontside/backside, carving
• Freestyle & hors-piste

🏔️ **Hors-piste sécurisé :**
• Exploration encadrée du domaine hors pistes
• Techniques spécifiques et lecture du terrain
• Équipement de sécurité fourni

Chaque cours offre un suivi individuel pour une progression personnalisée.`;
  }

  /**
   * Génère une réponse sur l'équipement
   */
  generateEquipmentResponse(context) {
    return `Voici mes recommandations d'équipement :

**Équipement de base :**
• Skis/snowboard adaptés à votre niveau
• Chaussures de ski/snowboard
• Bâtons (pour le ski)
• Casque (obligatoire)
• Lunettes de soleil ou masque

**Pour le hors-piste (obligatoire) :**
• DVA (Détecteur de Victimes d'Avalanches)
• Pelle
• Sonde

**Recommandé :**
• Sac airbag
• Gilet airbag
• Kit de premiers secours
• Téléphone portable chargé

Je peux vous conseiller sur le choix de votre équipement selon votre niveau et vos objectifs.`;
  }

  /**
   * Génère une réponse sur la météo
   */
  generateWeatherResponse(context) {
    return `Pour les conditions météo actuelles et les prévisions :

**Conseils généraux :**
• Matin : privilégiez les pentes ensoleillées
• Après-midi : neiges généralement plus souples
• Consultez toujours les bulletins météo avant de partir

**En cas de conditions particulières :**
• Brouillard : restez sur les pistes balisées
• Temps variable : prévoyez plusieurs couches de vêtements
• Vent fort : évitez les crêtes et sommets

**Sources fiables :**
• Météo France pour Val d'Isère et Tignes
• Bulletins d'avalanche ANENA
• Applications officielles des stations

Je consulte régulièrement ces sources pour adapter mes cours aux conditions.`;
  }

  /**
   * Génère une réponse de contact
   */
  generateContactResponse(context) {
    return `Pour me contacter et réserver vos cours :

📧 **Email :** meteniermyriam@yahoo.fr
📱 **Téléphone :** +33 7 68 10 61 07
📍 **Adresse :** Val d'Isère, France

**Réservation :**
• Via le site Maison Sport (lien dans la section réservation)
• Contact direct par email ou téléphone
• Disponible pour questions et conseils personnalisés

**Politique d'annulation flexible :**
• 21+ jours : remboursement 95%
• 14-20 jours : remboursement 50%
• ≤13 jours : pas de remboursement

N'hésitez pas à me contacter pour toute question !`;
  }

  /**
   * Génère une réponse générique basée sur le contexte
   */
  generateGenericResponse(query, context) {
    const documents = context.split('---').filter(doc => doc.trim());
    
    if (documents.length === 0) {
      return "Je n'ai pas trouvé d'informations spécifiques sur votre question. Pouvez-vous être plus précis ou essayer de reformuler ?";
    }

    let response = "Basé sur mes connaissances, voici ce que je peux vous dire :\n\n";
    
    documents.slice(0, 2).forEach((doc, index) => {
      const lines = doc.split('\n');
      const title = lines[0]?.replace('Document ' + (index + 1) + ' - ', '') || 'Information';
      const content = lines.slice(1).join('\n').trim();
      
      response += `**${title}**\n`;
      response += content.substring(0, 300) + (content.length > 300 ? '...' : '') + '\n\n';
    });

    response += "Pour plus de détails ou des informations spécifiques, n'hésitez pas à me poser une question plus précise !";

    return response;
  }

  /**
   * Calcule le niveau de confiance de la réponse
   */
  calculateConfidence(documents) {
    if (documents.length === 0) return 0.1;
    
    const avgScore = documents.reduce((sum, doc) => sum + doc.score, 0) / documents.length;
    return Math.min(avgScore / 10, 1.0); // Normalise le score entre 0 et 1
  }

  /**
   * Génère des questions de suivi
   */
  generateFollowUpQuestions(originalQuery, documents) {
    const suggestions = [];
    const queryLower = originalQuery.toLowerCase();
    
    if (queryLower.includes('tarif')) {
      suggestions.push("Quels sont les créneaux horaires disponibles ?");
      suggestions.push("Y a-t-il des remises pour les cours d'après-midi ?");
    }
    
    if (queryLower.includes('cours')) {
      suggestions.push("Quel niveau me convient le mieux ?");
      suggestions.push("Proposez-vous des cours de hors-piste ?");
    }
    
    if (queryLower.includes('équipement')) {
      suggestions.push("Quel équipement est obligatoire pour le hors-piste ?");
      suggestions.push("Où puis-je louer du matériel ?");
    }
    
    // Suggestions basées sur les catégories des documents
    const categories = [...new Set(documents.map(doc => doc.category))];
    categories.forEach(category => {
      if (category === 'stations' && !queryLower.includes('tignes') && !queryLower.includes('val')) {
        suggestions.push("Quelles sont les différences entre Tignes et Val d'Isère ?");
      }
      if (category === 'securite' && !queryLower.includes('sécurité')) {
        suggestions.push("Quelles sont les règles de sécurité en montagne ?");
      }
    });
    
    return suggestions.slice(0, 3);
  }

  /**
   * Ajoute une interaction à l'historique
   */
  addToHistory(query, response, documents) {
    this.conversationHistory.push({
      query,
      response,
      documents: documents.map(doc => doc.id),
      timestamp: new Date()
    });
    
    // Limite la taille de l'historique
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
    }
  }

  /**
   * Récupère le contexte récent pour la recherche contextuelle
   */
  getRecentContext() {
    return this.conversationHistory
      .slice(-3)
      .map(entry => entry.query)
      .join(' ');
  }

  /**
   * Déduplique les résultats de recherche
   */
  deduplicateResults(results) {
    const seen = new Set();
    return results.filter(result => {
      if (seen.has(result.id)) {
        return false;
      }
      seen.add(result.id);
      return true;
    });
  }

  /**
   * Réponse de secours en cas d'erreur
   */
  getFallbackResponse(query) {
    return {
      answer: "Je rencontre actuellement un problème technique. Pouvez-vous reformuler votre question ou essayer plus tard ? En attendant, vous pouvez me contacter directement par email ou téléphone.",
      sources: [],
      confidence: 0.1,
      suggestions: [
        "Comment puis-je réserver un cours ?",
        "Quels sont vos tarifs ?",
        "Quel équipement me faut-il ?"
      ]
    };
  }

  /**
   * Efface l'historique de conversation
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Obtient l'historique de conversation
   */
  getHistory() {
    return this.conversationHistory;
  }
}

/**
 * Instance globale du service RAG
 */
export const ragService = new RAGService();

/**
 * Fonctions utilitaires pour l'API RAG
 */
export const ragUtils = {
  /**
   * Recherche rapide avec réponse
   */
  async quickAnswer(query) {
    return await ragService.generateResponse(query, { maxDocuments: 2 });
  },

  /**
   * Recherche détaillée avec sources
   */
  async detailedAnswer(query) {
    return await ragService.generateResponse(query, { 
      maxDocuments: 5,
      includeSources: true 
    });
  },

  /**
   * Recherche par catégorie
   */
  async searchCategory(category, query = '') {
    const docs = searchUtils.searchCategory(category, query);
    return await ragService.generateResponse(query, { maxDocuments: 3 });
  },

  /**
   * Obtient des suggestions de questions
   */
  getSuggestedQuestions() {
    return [
      "Quels sont vos tarifs pour cette saison ?",
      "Proposez-vous des cours pour débutants ?",
      "Quel équipement me faut-il pour le ski ?",
      "Comment réserver un cours ?",
      "Quelles sont les conditions météo actuelles ?",
      "Proposez-vous des cours de hors-piste ?"
    ];
  }
};
