# Système RAG (Retrieval Augmented Generation)

## Vue d'ensemble

Ce système RAG (Retrieval Augmented Generation) est spécialement conçu pour le site de ski et snowboard de Myriam à Tignes et Val d'Isère. Il combine une recherche sémantique avancée avec une génération de réponses contextuelles pour offrir une expérience utilisateur intelligente et personnalisée.

## Architecture

### Composants principaux

1. **Base de connaissances** (`knowledgeBase.js`)
   - 12+ documents structurés couvrant tous les aspects du ski et snowboard
   - Métadonnées enrichies (catégories, mots-clés, scores de pertinence)
   - Mise à jour facile et extensible

2. **Moteur de recherche sémantique** (`searchEngine.js`)
   - Recherche par similarité cosinus
   - Filtrage par catégories
   - Auto-complétion et suggestions
   - Recherche contextuelle

3. **Service RAG principal** (`ragService.js`)
   - Génération de réponses contextuelles
   - Gestion de l'historique conversationnel
   - Réponses spécialisées par type de question
   - Suggestions de questions de suivi

4. **Optimiseur** (`ragOptimizer.js`)
   - Mise en cache intelligente
   - Optimisation des requêtes
   - Métriques de performance
   - Feedback utilisateur

5. **Interface utilisateur** (`RAGChat.jsx`, `RAGSearch.jsx`, `RAGAssistant.jsx`)
   - Chat interactif moderne
   - Recherche avancée avec filtres
   - Interface unifiée avec onglets

## Fonctionnalités

### 🎿 Spécialisation Ski & Snowboard
- **Cours** : Débutant, intermédiaire, avancé (ski alpin et snowboard)
- **Tarifs** : Grille complète hiver 2025-2026 avec périodes
- **Équipement** : Recommandations sécurité et matériel
- **Stations** : Informations détaillées Tignes et Val d'Isère
- **Météo** : Conseils conditions et sécurité
- **Réservation** : Processus et politique d'annulation

### 🤖 Intelligence Artificielle
- **Recherche sémantique** : Comprend l'intention derrière les questions
- **Réponses contextuelles** : S'adapte au type de question
- **Mémoire conversationnelle** : Maintient le contexte entre les échanges
- **Suggestions intelligentes** : Propose des questions de suivi pertinentes

### ⚡ Performance & Optimisation
- **Cache intelligent** : Réponses fréquentes mises en cache
- **Optimisation des requêtes** : Amélioration automatique des recherches
- **Métriques de performance** : Suivi des temps de réponse et satisfaction
- **Feedback utilisateur** : Amélioration continue basée sur les retours

## Utilisation

### Intégration dans l'application

```jsx
import RAGAssistant from '@/components/rag/RAGAssistant.jsx';

function App() {
  const [isRAGOpen, setIsRAGOpen] = useState(false);
  
  return (
    <div>
      {/* Bouton pour ouvrir l'assistant */}
      <Button onClick={() => setIsRAGOpen(true)}>
        Assistant IA
      </Button>
      
      {/* Assistant RAG */}
      <RAGAssistant 
        isOpen={isRAGOpen} 
        onClose={() => setIsRAGOpen(false)} 
      />
    </div>
  );
}
```

### API Programmatique

```javascript
import { ragService, searchEngine, ragUtils } from '@/services/rag';

// Recherche simple
const response = await ragService.generateResponse("Quels sont vos tarifs ?");

// Recherche avancée
const results = searchEngine.search("cours débutant ski", {
  maxResults: 5,
  minScore: 0.3,
  categories: ['services']
});

// Recherche par catégorie
const pricingDocs = ragUtils.searchCategory('tarifs', 'hiver 2025');
```

## Configuration

### Paramètres par défaut

```javascript
const RAGConfig = {
  search: {
    maxResults: 5,
    minScore: 0.2,
    timeout: 5000,
    enableCache: true,
    cacheTimeout: 300000 // 5 minutes
  },
  generation: {
    maxDocuments: 3,
    includeSources: true,
    language: 'fr',
    enableSuggestions: true
  },
  optimization: {
    enableQueryOptimization: true,
    enableCaching: true,
    enableFeedback: true,
    maxCacheSize: 100
  }
};
```

## Base de connaissances

### Catégories disponibles

- **monitrice** : Profil et expérience de Myriam
- **services** : Cours de ski, snowboard, hors-piste
- **stations** : Informations Tignes et Val d'Isère
- **tarifs** : Grille tarifaire complète
- **technique** : Conseils techniques ski et snowboard
- **equipement** : Recommandations matériel et sécurité
- **securite** : Règles sécurité en montagne
- **meteo** : Conseils conditions météo
- **contact** : Informations de contact et réservation

### Structure des documents

```javascript
{
  id: 'unique-identifier',
  category: 'category-name',
  title: 'Document Title',
  content: 'Full document content...',
  keywords: ['keyword1', 'keyword2', ...],
  metadata: {
    // Additional structured data
  }
}
```

## Métriques et Monitoring

### Indicateurs de performance

- **Temps de réponse** : Moyenne < 500ms
- **Taux de cache** : Objectif > 60%
- **Satisfaction utilisateur** : Score sur 5
- **Pertinence des réponses** : Score de confiance

### Diagnostic

```javascript
import { diagnoseRAG } from '@/services/rag';

const diagnostics = diagnoseRAG();
console.log(diagnostics);
// {
//   status: 'healthy',
//   metrics: { ... },
//   knowledgeBase: { ... },
//   recommendations: [ ... ]
// }
```

## Maintenance

### Ajout de nouveaux documents

```javascript
import { updateKnowledgeBase } from '@/services/rag';

const newDocuments = [
  {
    id: 'new-doc-1',
    category: 'services',
    title: 'Nouveau Service',
    content: 'Description du nouveau service...',
    keywords: ['nouveau', 'service', 'ski']
  }
];

const result = updateKnowledgeBase(newDocuments);
```

### Optimisation continue

- **Analyse des logs** : Identifier les questions fréquentes
- **Feedback utilisateur** : Améliorer les réponses
- **Mise à jour de la base** : Ajouter de nouveaux sujets
- **Ajustement des paramètres** : Optimiser les scores de pertinence

## Avantages du système

### Pour les utilisateurs
- **Réponses instantanées** : Pas d'attente pour obtenir des informations
- **Contexte personnalisé** : Réponses adaptées aux besoins spécifiques
- **Interface intuitive** : Chat moderne et recherche avancée
- **Disponibilité 24/7** : Assistant toujours disponible

### Pour l'activité
- **Réduction de la charge** : Moins de questions répétitives
- **Qualification des prospects** : Informations détaillées avant contact
- **Amélioration de l'expérience** : Service client intelligent
- **Données d'usage** : Insights sur les besoins des clients

## Technologies utilisées

- **React** : Interface utilisateur moderne
- **JavaScript ES6+** : Logique métier
- **Tailwind CSS** : Styling responsive
- **Lucide React** : Icônes modernes
- **Algorithmes de similarité** : Recherche sémantique
- **Mise en cache** : Optimisation des performances

## Roadmap

### Améliorations prévues
- [ ] Intégration avec un vrai LLM (OpenAI, Claude)
- [ ] Support multilingue (EN, ES)
- [ ] Analytics avancées
- [ ] Intégration CRM
- [ ] Notifications push
- [ ] Mode hors-ligne

### Extensions possibles
- **Booking intelligent** : Réservation automatique
- **Recommandations personnalisées** : Basées sur le profil utilisateur
- **Chatbot vocal** : Support audio
- **Intégration météo** : API temps réel
- **Géolocalisation** : Informations contextuelles

---

*Ce système RAG a été conçu pour offrir une expérience utilisateur exceptionnelle tout en réduisant la charge de travail de l'équipe. Il évolue continuellement grâce aux retours utilisateurs et aux métriques de performance.*





