# Site Web Multilingue React

## Description

Ce projet est un site web multilingue développé avec React, supportant trois langues : français, anglais et espagnol. Il présente une interface moderne et responsive avec des composants UI de haute qualité.

## Fonctionnalités

- **Multilingue** : Support complet pour le français, l'anglais et l'espagnol
- **Design responsive** : Compatible desktop et mobile
- **Interface moderne** : Utilisation de Tailwind CSS et shadcn/ui
- **Navigation fluide** : Menu de navigation avec liens d'ancrage
- **Sections complètes** :
  - Page d'accueil avec hero section
  - Section À propos avec statistiques
  - Section Services avec cartes
  - Section Contact avec informations
  - Footer professionnel

## Technologies utilisées

- **React** : Framework JavaScript pour l'interface utilisateur
- **Vite** : Outil de build rapide
- **Tailwind CSS** : Framework CSS utilitaire
- **shadcn/ui** : Composants UI modernes
- **Lucide React** : Icônes vectorielles
- **pnpm** : Gestionnaire de paquets

## Structure du projet

```
my-react-app/
├── public/
├── src/
│   ├── assets/          # Ressources statiques
│   ├── components/
│   │   └── ui/          # Composants UI shadcn
│   ├── App.jsx          # Composant principal
│   ├── App.css          # Styles globaux
│   ├── index.css        # Styles de base
│   └── main.jsx         # Point d'entrée
├── dist/                # Build de production
├── package.json
└── vite.config.js
```

## Installation et utilisation

### Prérequis
- Node.js (version 18 ou supérieure)
- pnpm

### Installation
```bash
cd my-react-app
pnpm install
```

### Développement
```bash
pnpm run dev
```
Le site sera accessible sur http://localhost:5173

### Build de production
```bash
pnpm run build
```
Les fichiers de production seront générés dans le dossier `dist/`

## Fonctionnement du multilingue

Le système multilingue est implémenté avec :
- Un objet `translations` contenant toutes les traductions
- Un état React `currentLang` pour la langue active
- Un sélecteur de langue dans l'en-tête
- Mise à jour automatique de tout le contenu lors du changement de langue

### Langues supportées
- 🇫🇷 Français (fr)
- 🇬🇧 Anglais (en)
- 🇪🇸 Espagnol (es)

## Sections du site

### 1. En-tête (Header)
- Logo et titre du site
- Menu de navigation
- Sélecteur de langue
- Menu mobile responsive

### 2. Section Hero
- Titre principal
- Description
- Bouton d'appel à l'action

### 3. Section À propos
- Description de l'équipe
- Statistiques (années d'expérience, projets, clients)

### 4. Section Services
- Trois services principaux :
  - Développement Web
  - Applications Mobile
  - Design UI/UX

### 5. Section Contact
- Informations de contact :
  - Email
  - Téléphone
  - Adresse

### 6. Footer
- Logo et titre
- Sous-titre
- Copyright

## Personnalisation

Pour personnaliser le site :

1. **Contenu** : Modifiez l'objet `translations` dans `App.jsx`
2. **Styles** : Ajustez les classes Tailwind ou modifiez `App.css`
3. **Couleurs** : Personnalisez les variables CSS dans `App.css`
4. **Composants** : Ajoutez de nouveaux composants dans le dossier `components/`

## Déploiement

Le dossier `dist/` contient tous les fichiers nécessaires pour le déploiement :
- Fichiers HTML, CSS et JavaScript optimisés
- Assets compressés
- Prêt pour serveur web statique

## Support

Ce projet utilise des technologies modernes et est compatible avec tous les navigateurs récents.

