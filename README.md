# 🎿 Ski & Snowboard à Val d'Isère | Monitrice Diplômée

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://metenier73.github.io/ski-snowboard-tignes-valdisere/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Site web professionnel pour une monitrice de ski diplômée à Val d'Isère et Tignes. Découvrez mes cours de ski et snowboard, mes tarifs et réservez votre leçon personnalisée.

## 🌟 Aperçu

Ce site web moderne et responsive présente les services d'une monitrice de ski diplômée dans les stations de Val d'Isère et Tignes. Conçu avec React et Vite, il offre une expérience utilisateur optimale sur tous les appareils.

### 🎯 Fonctionnalités principales

- **🌐 Multilingue** : Support français, anglais et espagnol
- **📱 Responsive** : Optimisé pour mobile, tablette et desktop
- **⚡ Performance** : Chargement rapide avec Vite
- **🎨 Design moderne** : Interface élégante avec Tailwind CSS
- **📧 Contact** : Formulaire de réservation intégré
- **🗺️ Géolocalisation** : Informations sur les stations de ski

## 🚀 Démo en ligne

**Site live :** [https://metenier73.github.io/ski-snowboard-tignes-valdisere/](https://metenier73.github.io/ski-snowboard-tignes-valdisere/)

## 🛠️ Technologies utilisées

- **Frontend :** React 18.3.1
- **Build tool :** Vite 5.4.0
- **Styling :** Tailwind CSS 3.4.0
- **UI Components :** shadcn/ui + Radix UI
- **Icons :** Lucide React
- **Package Manager :** pnpm
- **Deployment :** GitHub Pages

## 📦 Installation

### Prérequis

- Node.js 18+ 
- pnpm (recommandé) ou npm

### Installation des dépendances

```bash
# Cloner le repository
git clone https://github.com/metenier73/ski-snowboard-tignes-valdisere.git
cd ski-snowboard-tignes-valdisere

# Installer les dépendances
pnpm install
# ou
npm install
```

### Développement

```bash
# Lancer le serveur de développement
pnpm dev
# ou
npm run dev
```

Le site sera accessible sur [http://localhost:5173](http://localhost:5173)

### Build de production

```bash
# Générer le build de production
pnpm build
# ou
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

## 📁 Structure du projet

```
ski-snowboard-tignes-valdisere/
├── public/                 # Fichiers statiques
│   ├── favicon.ico
│   └── 404.html           # Redirection SPA pour GitHub Pages
├── src/
│   ├── components/        # Composants React
│   │   └── ui/           # Composants UI (shadcn/ui)
│   ├── assets/           # Images et ressources
│   ├── App.jsx           # Composant principal
│   ├── App.css           # Styles globaux
│   ├── index.css         # Styles Tailwind
│   └── main.jsx          # Point d'entrée
├── .github/
│   └── workflows/        # GitHub Actions
├── dist/                 # Build de production
├── package.json
├── vite.config.js        # Configuration Vite
├── tailwind.config.cjs   # Configuration Tailwind
├── postcss.config.cjs    # Configuration PostCSS
└── .nojekyll            # Désactive Jekyll sur GitHub Pages
```

## 🌍 Système multilingue

Le site supporte 3 langues :

| Code | Langue | Drapeau |
|------|--------|---------|
| `fr` | Français | 🇫🇷 |
| `en` | Anglais | 🇬🇧 |
| `es` | Espagnol | 🇪🇸 |

### Ajouter une nouvelle langue

1. Modifiez l'objet `translations` dans `src/App.jsx`
2. Ajoutez les traductions pour la nouvelle langue
3. Mettez à jour le sélecteur de langue

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `src/App.css` via des variables CSS :

```css
:root {
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  --background: oklch(1 0 0);
  /* ... */
}
```

### Contenu

- **Textes :** Modifiez l'objet `translations` dans `src/App.jsx`
- **Images :** Remplacez les fichiers dans `src/assets/`
- **Styles :** Utilisez les classes Tailwind CSS

## 🚀 Déploiement

### GitHub Pages (automatique)

Le site est automatiquement déployé sur GitHub Pages à chaque push sur la branche `master` grâce à GitHub Actions.

### Déploiement manuel

```bash
# Build
pnpm build

# Le contenu du dossier dist/ peut être servi par n'importe quel serveur web
```

### Autres plateformes

- **Vercel :** `vercel --prod`
- **Netlify :** Drag & drop du dossier `dist/`
- **Surge :** `surge dist/`

## 📱 Fonctionnalités

### Sections du site

- **🏠 Accueil** : Présentation et call-to-action
- **👩‍🏫 À propos** : Parcours et qualifications
- **🎿 Services** : Cours de ski et snowboard
- **💰 Tarifs** : Grille tarifaire détaillée
- **📍 Stations** : Val d'Isère et Tignes
- **📞 Contact** : Formulaire de réservation

### Fonctionnalités techniques

- **SPA Routing** : Navigation fluide sans rechargement
- **SEO Optimized** : Meta tags et structure sémantique
- **PWA Ready** : Prêt pour Progressive Web App
- **Accessibility** : Conforme aux standards WCAG

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**Monitrice de Ski Diplômée**
- 📧 Email : [votre-email@example.com]
- 📱 Téléphone : [votre-numéro]
- 🏔️ Stations : Val d'Isère & Tignes
- 🌐 Site : [https://metenier73.github.io/ski-snowboard-tignes-valdisere/](https://metenier73.github.io/ski-snowboard-tignes-valdisere/)

---

⭐ **N'oubliez pas de mettre une étoile si ce projet vous a aidé !**