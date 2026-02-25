import Logo from '@/assets/Logo.png'
import QRCode from '@/assets/qr-code.png'
import BookingWidget from '@/components/booking/BookingWidget.jsx'
import RAGAssistant from '@/components/rag/RAGAssistant.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages'
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Compass,
  Image,
  ImagePlus,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  Settings,
  Shield,
  ShieldAlert,
  Smartphone,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentLang, setCurrentLang] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [weather, setWeather] = useState({ tignes: null, val: null, arcs: null })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isRAGOpen, setIsRAGOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? (window.location.hash || '#home') : '#home'
  )

  // Fonctions pour gérer l'affichage des articles
  const showArticle = (articleType) => {
    const preview = document.getElementById('article-preview');
    const title = document.getElementById('article-title');
    const content = document.getElementById('article-content');
    
    // Contenu des articles
    const articles = {
      nouveautes: {
        title: currentLang === 'fr' ? 'Nouveautés Hiver 2025-2026' : 'New for Winter 2025-2026',
        content: currentLang === 'fr' ? 
          `<h2>🎿 Les dernières améliorations des domaines skiables</h2>
          <p class="lead">Découvrez toutes les nouveautés qui rendront votre séjour ski inoubliable !</p>
          
          <h3>🚡 Nouvelles remontées mécaniques</h3>
          <ul>
            <li><strong>Tignes:</strong> Nouveau télésiège 6 places débrayable - Palafour Express</li>
            <li><strong>Val d'Isère:</strong> Télécabine Olympique rénovée avec WiFi embarqué</li>
            <li><strong>Les Arcs:</strong> Nouveau funiculaire Arc 2000 - Aiguille Rouge</li>
          </ul>
          
          <h3>🎪 Zones freestyle étendues</h3>
          <ul>
            <li><strong>Snowpark Tignes:</strong> Nouveau Big Air de 25m et half-pipe olympique</li>
            <li><strong>Val Park:</strong> Zone débutant agrandie et modules de freestyle</li>
            <li><strong>Les Arcs:</strong> Snowpark 2.0 avec zone boardercross</li>
          </ul>
          
          <h3>🏠 Services améliorés</h3>
          <ul>
            <li><strong>Restaurants altitude:</strong> Nouveaux self-services avec cuisine locale</li>
            <li><strong>Écoles de ski:</strong> Zones d'apprentissage équipées de tapis magiques</li>
            <li><strong>Applications mobile:</strong> Forfait digital et suivi en temps réel</li>
          </ul>
          
          <blockquote class="blockquote">
            <p>🎯 <strong>Notre conseil:</strong> Profitez des nouvelles installations dès l'ouverture pour éviter les foules de décembre !</p>
          </blockquote>` :
          `<h2>🎿 The latest improvements to the ski areas</h2>
          <p class="lead">Discover all the new features that will make your ski holiday unforgettable!</p>
          
          <h3>🚡 New Ski Lifts</h3>
          <ul>
            <li><strong>Tignes:</strong> New detachable 6-seater chairlift - Palafour Express</li>
            <li><strong>Val d'Isère:</strong> Renovated Olympic gondola with onboard Wi-Fi</li>
            <li><strong>Les Arcs:</strong> New Arc 2000 - Aiguille Rouge funicular</li>
          </ul>
          
          <h3>🎪 Expanded Freestyle Areas</h3>
          <ul>
            <li><strong>Tignes Snowpark:</strong> New 25m Big Air jump and Olympic halfpipe</li>
            <li><strong>Val Park:</strong> Expanded beginner area and freestyle features</li>
            <li><strong>Les Arcs:</strong> Snowpark 2.0 with boardercross area</li>
          </ul>
          
          <h3>🏠 Enhanced Services</h3>
          <ul>
            <li><strong>High-Altitude Restaurants:</strong> New self-service restaurants with local cuisine</li>
            <li><strong>Ski Schools:</strong> Learning areas equipped with magic carpets</li>
            <li><strong>Mobile Apps:</strong> Digital lift pass and real-time tracking</li>
          </ul>
          
          <blockquote class="blockquote">
            <p>🎯 <strong>Our Tip:</strong> Enjoy the new facilities as soon as they open to avoid the December crowds!</p>
          </blockquote>`
      },
      freeride: {
        title: currentLang === 'fr' ? 'Meilleures Spots Freeride' : 'Best Freeride Spots',
        content: currentLang === 'fr' ? 
          `<h2>🏔️ Les secrets des hors-pistes authentiques et sécurisés</h2>
          <p class="lead">Explorez les couloirs mythiques et les forêts enneigées avec nos guides experts...</p>
          
          <h3>⛰️ Tignes - Les incontournables</h3>
          <ul>
            <li><strong>Le Grand Motet:</strong> Face Nord - 45° - Niveau Expert</li>
            <li><strong>La Sache:</strong> Forêt enneigée - 30° - Niveau Intermédiaire</li>
            <li><strong>Tichot:</strong> Couloir mythique - 40° - Niveau Expert</li>
          </ul>
          
          <h3>🏰 Val d'Isère - Classiques et secrets</h3>
          <ul>
            <li><strong>Face de Bellevarde:</strong> Olympique - 35° - Niveau Avancé</li>
            <li><strong>Le Pissaillas:</strong> Glacier - 25° - Niveau Intermédiaire</li>
            <li><strong>Forêt du Manchet:</strong> Bois enneigé - 20° - Tous niveaux</li>
          </ul>
          
          <h3>🎿 Les Arcs - Domaine freeride</h3>
          <ul>
            <li><strong>Aiguille Rouge:</strong> 3000m de dénivelé - Niveau Expert</li>
            <li><strong>Combe de la Arc:</strong> Large et accessible - Niveau Intermédiaire</li>
            <li><strong>Foret du Mont Blanc:</strong> Abois enneigés - Tous niveaux</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Sécurité avant tout</h4>
            <p>Toujours vérifier le bulletin d'avalanches, emporter DVA, pelle et sonde. Partir accompagné et informer quelqu'un de votre itinéraire.</p>
          </div>` :
          `<h2>🏔️ The secrets of authentic and safe off-piste skiing</h2>
          <p class="lead">Explore legendary couloirs and snow-covered forests with our expert guides...</p>
          
          <h3>⛰️ Tignes - The Must-Sees</h3>
          <ul>
            <li><strong>Le Grand Motet:</strong> North Face - 45° - Expert Level</li>
            <li><strong>La Sache:</strong> Snow-Covered Forest - 30° - Intermediate Level</li>
            <li><strong>Tichot:</strong> Legendary Couloir - 40° - Expert Level</li>
          </ul>
          
          <h3>🏰 Val d'Isère - Classics and Hidden Gems</h3>
          <ul>
            <li><strong>Face de Bellevarde:</strong> Olympic - 35° - Advanced Level</li>
            <li><strong>Le Pissaillas:</strong> Glacier - 25° - Intermediate Level</li>
            <li><strong>Forêt du Manchet:</strong> Snow-Covered Woods - 20° - All Levels</li>
          </ul>
          
          <h3>🎿 Les Arcs - Freeride Area</h3>
          <ul>
            <li><strong>Aiguille Rouge:</strong> 3000m Vertical Drop - Expert Level</li>
            <li><strong>Combe de la Arc:</strong> Wide and Accessible - Intermediate Level</li>
            <li><strong>Forêt du Mont Blanc:</strong> Abois Snowy - All levels</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Safety first</h4>
            <p>Always check the avalanche bulletin, carry an avalanche transceiver, shovel, and probe. Go with a companion and inform someone of your route.</p>
          </div>`
      },
      equipement: {
        title: currentLang === 'fr' ? 'Équipement Essentiel' : 'Essential Equipment',
        content: currentLang === 'fr' ? 
          `<h2>🎿 Le matériel parfait pour votre séjour au ski</h2>
          <p class="lead">Tests comparatifs des derniers skis, casques et accessoires de la saison...</p>
          
          <h3>🎿 Skis - Nos sélections 2025-2026</h3>
          <h4>Débutant - Progression</h4>
          <ul>
            <li><strong>Head Supershape Team:</strong> Stable et tolérant - 400€</li>
            <li><strong>Salomon QST 85:</strong> Polyvalent et confortable - 450€</li>
            <li><strong>Rossignol Experience 88:</strong> Excellent rapport qualité/prix - 380€</li>
          </ul>
          
          <h4>Intermédiaire - Polyvalence</h4>
          <ul>
            <li><strong>Volkl Kendo 88:</strong> Dynamique et précis - 550€</li>
            <li><strong>Blizzard Bonafide 88:</strong> Accroche et stabilité - 600€</li>
            <li><strong>Fischer Ranger 96:</strong> Freeride accessible - 520€</li>
          </ul>
          
          <h4>Expert - Performance</h4>
          <ul>
            <li><strong>Head Kore 105:</strong> Léger et réactif - 650€</li>
            <li><strong>Salomon QST 106:</strong> Flottabilité exceptionnelle - 700€</li>
            <li><strong>Black Crows Navis Freebird:</strong> Pur freeride - 800€</li>
          </ul>
          
          <h3>🪖 Casques - Protection et confort</h3>
          <ul>
            <li><strong>Smith Quantum:</strong> MIPS + Audio intégré - 180€</li>
            <li><strong>Giro Range:</strong> ajustement parfait - 160€</li>
            <li><strong>Salomon Icon:</strong> léger et ventilé - 140€</li>
          </ul>
          
          <h3>🥾 Chaussures - Le confort avant tout</h3>
          <div class="alert alert-info">
            <p><strong>Notre conseil:</strong> Essayez toujours vos chaussures en fin de journée quand vos pieds sont légèrement gonflés.</p>
          </div>` :
          `<h2>🎿 The perfect gear for your ski trip</h2>
          <p class="lead">Comparative tests of the latest skis, helmets, and accessories of the season...</p>
          
          <h3>🎿 Skis - Our 2025-2026 selections</h3>
          <h4>Beginner - Progression</h4>
          <ul>
            <li><strong>Head Supershape Team:</strong> Stable and forgiving - €400</li>
            <li><strong>Salomon QST 85:</strong> Versatile and comfortable - €450</li>
            <li><strong>Rossignol Experience 88:</strong> Excellent value for money - €380</li>
          </ul>
          
          <h4>Intermediate - Versatility</h4>
          <ul>
            <li><strong>Volkl Kendo 88:</strong> Dynamic and precise - €550</li>
            <li><strong>Blizzard Bonafide 88:</strong> Grip and stability - €600</li>
            <li><strong>Fischer Ranger 96:</strong> Accessible freeride - €520</li>
          </ul>
          
          <h4>Expert - Performance</h4>
          <ul>
            <li><strong>Head Kore 105:</strong> Lightweight and responsive - €650</li>
            <li><strong>Salomon QST 106:</strong> Exceptional float - €700</li>
            <li><strong>Black Crows Navis Freebird:</strong> Pure Freeride - €800</li>
          </ul>
          
          <h3>🪖 Helmets - Protection and Comfort</h3>
          <ul>
            <li><strong>Smith Quantum:</strong> MIPS + Integrated Audio - €180</li>
            <li><strong>Giro Range:</strong> Perfect Fit - €160</li>
            <li><strong>Salomon Icon:</strong> Lightweight and Ventilated - €140</li>
          </ul>
          
          <h3>🥾 Shoes - Comfort First</h3>
          <div class="alert alert-info">
            <p><strong>Our Tip:</strong> Always try on your shoes at the end of the day when your feet are slightly swollen.</p>
          </div>`
      },
      carving: {
        title: currentLang === 'fr' ? 'Technique du Carving Parfait' : 'The Perfect Carving Technique',
        content: currentLang === 'fr' ? 
          `<h2>🎿 Maîtrisez les virages coupés comme un champion</h2>
          <p class="lead">Apprenez les secrets du carving moderne : positionnement, angulation et timing...</p>
          
          <h3>🏃‍♂️ Positionnement du corps</h3>
          <ul>
            <li><strong>Hanches basses:</strong> Gardez les hanches au niveau des genoux pour maximiser l'angulation</li>
            <li><strong>Torse incliné:</strong> Penchez le torse vers l'intérieur du virage pour équilibrer</li>
            <li><strong>Bras ouverts:</strong> Écartez les bras comme des ailes pour l'équilibre et la visibilité</li>
            <li><strong>Regard en avant:</strong> Fixez la sortie du virage, pas vos skis</li>
          </ul>
          
          <h3>🦵 Angulation des genoux</h3>
          <ul>
            <li><strong>Genoux pliés:</strong> Fléchissez les genoux pour absorber les chocs et maintenir l'équilibre</li>
            <li><strong>Pression égale:</strong> Répartissez le poids uniformément sur les deux skis</li>
            <li><strong>Flexion dynamique:</strong> Maintenez une flexion active tout au long du virage</li>
            <li><strong>Extension progressive:</strong> Dépliez progressivement en sortie de virage</li>
          </ul>
          
          <h3>⏱️ Timing et rythme</h3>
          <ul>
            <li><strong>Initiation précoce:</strong> Commencez le virage avant le point de chute naturel</li>
            <li><strong>Phase de contrôle:</strong> Maintenez l'angulation maximale au milieu du virage</li>
            <li><strong>Sortie fluide:</strong> Relâchez progressivement l'angulation pour le virage suivant</li>
            <li><strong>Enchaînement:</strong> Rythmez vos virages comme une danse sur la neige</li>
          </ul>
          
          <h3>🎯 Exercices progressifs</h3>
          <ul>
            <li><strong>Virages garçons:</strong> Enchaînez des virages courts pour développer le rythme</li>
            <li><strong>Ski sur une carre:</strong> Pratiquez sur piste plate pour perfectionner l'angulation</li>
            <li><strong>Virages serrés:</strong> Réduisez le rayon pour tester votre maîtrise</li>
            <li><strong>Carving en terrain variable:</strong> Adaptez votre technique selon la neige</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil de pro</h4>
            <p>Commencez par des virages larges et progressivement réduisez le rayon. La vitesse vient avec la maîtrise, pas l'inverse !</p>
          </div>` :
          `<h2>🎿 Master carved turns like a champion</h2>
          <p class="lead">Learn the secrets of modern carving: positioning, angle, and timing...</p>
          
          <h3>🏃‍♂️ Body Positioning</h3>
          <ul>
            <li><strong>Low hips:</strong> Keep your hips level with your knees to maximize angle</li>
            <li><strong>Leaning torso:</strong> Lean your torso into the turn for balance</li>
            <li><strong>Open arms:</strong> Spread your arms like wings for balance and visibility</li>
            <li><strong>Look ahead:</strong> Focus on the exit of the turn, not your skis</li>
          </ul>
          
          <h3>🦵 Knee Angle</h3>
          <ul>
            <li><strong>Bent knees:</strong> Bend your knees to absorb shock and maintain balance</li>
            <li><strong>Equal pressure:</strong> Distribute weight evenly on both skis</li>
            <li><strong>Dynamic flexion:</strong> Maintain active flexion throughout the turn</li>
            <li><strong>Progressive extension:</strong> Extend gradually at the exit of the turn</li>
          </ul>
          
          <h3>⏱️ Timing and Rhythm</h3>
          <ul>
            <li><strong>Early initiation:</strong> Start the turn before the natural breakaway point</li>
            <li><strong>Control phase:</strong> Maintain maximum angle in the middle of the turn.</li>
            <li><strong>Smooth exit:</strong> Gradually release the angle for the next turn.</li>
            <li><strong>Linking turns:</strong> Rhythmically flow through your turns like a dance on the snow.</li>
          </ul>
          
          <h3>🎯 Progressive exercises</h3>
          <ul>
            <li><strong>Boys' turns:</strong> Link short turns to develop rhythm.</li>
            <li><strong>Skiing on one edge:</strong> Practice on flat terrain to perfect your angle.</li>
            <li><strong>Tight turns:</strong> Reduce the radius to test your control.</li>
            <li><strong>Carving on variable terrain:</strong> Adapt your technique to the snow conditions.</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Pro tip</h4>
            <p>Start with wide turns and gradually reduce the radius. Speed comes with control, not the other way around!</p>
          </div>`
      },
      securite: {
        title: currentLang === 'fr' ? 'Sécurité sur les Pistes' : 'Ski Safety',
        content: currentLang === 'fr' ? 
          `<h2>⛑️ Les règles d'or pour skier en toute sécurité</h2>
          <p class="lead">10 règles essentielles, gestion des collisions et conduite responsable...</p>
          
          <h3>📋 Les 10 règles d'or du skieur</h3>
          <ol>
            <li><strong>Respectez les autres:</strong> Adaptez votre vitesse et votre trajectoire</li>
            <li><strong>Maîtrisez votre vitesse:</strong> Skiiez toujours en contrôle de votre trajectoire</li>
            <li><strong>Choisissez votre trajectoire:</strong> Le skieur en amont a priorité</li>
            <li><strong>Dépassez avec précaution:</strong> Laissez suffisamment d'espace latéral</li>
            <li><strong>Ne vous arrêtez pas brutalement:</strong> Vérifiez en amont avant de vous arrêter</li>
            <li><strong>Remontez sur le côté:</strong> Utilisez les bords des pistes pour monter</li>
            <li><strong>Respectez la signalisation:</strong> Obéissez aux panneaux et balises</li>
            <li><strong>Aidez en cas d'accident:</strong> Protégez et alertez les secours</li>
            <li><strong>Identifiez-vous:</strong> Portez votre nom et coordonnées en cas d'accident</li>
            <li><strong>Équipez-vous:</strong> Portez toujours un casque homologué</li>
          </ol>
          
          <h3>🚨 Gestion des collisions</h3>
          <ul>
            <li><strong>Anticipation:</strong> Observez constamment les skieurs autour de vous</li>
            <li><strong>Communication:</strong> Utilisez des gestes ou des sons pour signaler vos intentions</li>
            <li><strong>Zone de sécurité:</strong> Gardez toujours une distance de sécurité</li>
            <li><strong>Adaptation:</strong> Modifiez votre trajectoire si nécessaire</li>
          </ul>
          
          <h3>🏥 En cas d'accident</h3>
          <ul>
            <li><strong>Protégez la zone:</strong> Placez des skis en croix au-dessus et en dessous</li>
            <li><strong>Alertez les secours:</strong> Appelez le 112 ou les pistoires-secouristes</li>
            <li><strong>Ne déplacez pas:</strong> Sauf en cas de danger immédiat</li>
            <li><strong>Rassurez la victime:</strong> Restez calme et communiquant</li>
          </ul>
          
          <h3>🎿 Équipement de sécurité</h3>
          <ul>
            <li><strong>Casque:</strong> Indispensable pour tous, enfants comme adultes</li>
            <li><strong>Lunettes:</strong> Protection UV et visibilité optimale</li>
            <li><strong>Téléphone:</strong> Batterie chargée et couverture réseau</li>
            <li><strong>Forfait:</strong> Numéro d'urgence visible sur le forfait</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Rappel important</h4>
            <p>La sécurité est l'affaire de tous. Un skieur responsable est un skieur qui revient vivant !</p>
          </div>` :
          `<h2>⛑️ The Golden Rules for Safe Skiing</h2>
          <p class="lead">10 Essential Rules, Collision Management, and Responsible Skiing...</p>
          
          <h3>📋 The 10 Golden Rules for Skiers</h3>
          <ol>
            <li><strong>Respect Others:</strong> Adapt your speed and trajectory</li>
            <li><strong>Control Your Speed:</strong> Always ski in control of your trajectory</li>
            <li><strong>Choose Your Trajectory:</strong> The skier uphill has priority</li>
            <li><strong>Overtake Carefully:</strong> Leave Sufficient Lateral Space</li>
            <li><strong>Don't Stop Suddenly:</strong> Check uphill before stopping</li>
            <li><strong>Uphill on the Side:</strong> Use the edges of the slopes to ascend</li>
            <li><strong>Respect Signage:</strong> Obey signs and markers</li>
            <li><strong>Help in Case of an Accident:</strong> Protect others and alert emergency services</li>
            <li><strong>Identify Yourself:</strong> Carry your name and contact information in case of an accident</li>
            <li><strong>Equip Yourself:</strong> Always wear a certified helmet</li>
          </ol>
          
          <h3>🚨 Collision Management</h3>
          <ul>
            <li><strong>Anticipation:</strong> Constantly observe the skiers around you</li>
            <li><strong>Communication:</strong> Use gestures or sounds to signal Your intentions</li>
            <li><strong>Safety zone:</strong> Always maintain a safe distance</li>
            <li><strong>Adapt:</strong> Modify your trajectory if necessary</li>
          </ul>
          
          <h3>🏥 In case of an accident</h3>
          <ul>
            <li><strong>Protect the area:</strong> Place skis in a cross shape above and below</li>
            <li><strong>Alert emergency services:</strong> Call 112 or the ski patrol</li>
            <li><strong>Do not move:</strong> Except in case of immediate danger</li>
            <li><strong>Reassure the victim:</strong> Remain calm and communicative</li>
          </ul>
          
          <h3>🎿 Safety equipment</h3>
          <ul>
            <li><strong>Helmet:</strong> Essential for everyone, children and adults alike</li>
            <li><strong>Goggles:</strong> UV protection and optimal visibility</li>
            <li><strong>Phone:</strong> Charged battery and network coverage</li>
            <li><strong>Lift pass:</strong> Emergency number visible on the pass</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Important reminder</h4>
            <p>Safety is everyone's responsibility. A responsible skier is a skier who comes back alive!</p>
          </div>`
      },
      quandPartir: {
        title: currentLang === 'fr' ? 'Quand partir ?' : 'When to go?',
        content: currentLang === 'fr' ? 
          `<h2>📅 Meilleures périodes, tarifs et affluence</h2>
          <p class="lead">Optimisez votre séjour ski en choisissant la bonne période</p>
          
          <h3>🎿 Saison hiver 2025-2026</h3>
          <ul>
            <li><strong>Ouverture:</strong> Fin novembre 2025 (Tignes) / Début décembre 2025 (Val d'Isère)</li>
            <li><strong>Fermeture:</strong> Début mai 2026 (selon conditions)</li>
            <li><strong>Période optimale:</strong> Décembre à mars</li>
            <li><strong>Haute saison:</strong> Vacances de Noël, février et Pâques</li>
          </ul>
          
          <h3>📊 Analyse par période</h3>
          
          <h4>🍂 Décembre - Début Janvier</h4>
          <ul>
            <li><strong>Avantages:</strong> Neige fraîche, domaine complet, ambiance festive</li>
            <li><strong>Inconvénients:</strong> Affluence maximale, prix élevés</li>
            <li><strong>Idéal pour:</strong> Vacanciers de Noël, amateurs de neige poudreuse</li>
            <li><strong>Tarifs:</strong> +30% par rapport à la moyenne</li>
          </ul>
          
          <h4>❄️ Janvier - Mars</h4>
          <ul>
            <li><strong>Avantages:</strong> Bon enneigement, météo stable, pistes parfaites</li>
            <li><strong>Inconvénients:</strong> Forte affluence en février</li>
            <li><strong>Idéal pour:</strong> Skieurs de tous niveaux, familles</li>
            <li><strong>Tarifs:</strong> Prix standards</li>
          </ul>
          
          <h4>🌸 Avril - Mai</h4>
          <ul>
            <li><strong>Avantages:</strong> Moins de monde, prix réduits, ensoleillement</li>
            <li><strong>Inconvénients:</strong> Neige de printemps, certaines pistes fermées</li>
            <li><strong>Idéal pour:</strong> Budget limité, amateurs de soleil</li>
            <li><strong>Tarifs:</strong> -40% par rapport à la haute saison</li>
          </ul>
          
          <h3>💰 Conseils budgétaires</h3>
          <ul>
            <li><strong>Hors vacances scolaires:</strong> Économisez 20-30%</li>
            <li><strong>Réservation anticipée:</strong> Réductions jusqu'à 25%</li>
            <li><strong>Dernière minute:</strong> Offres spéciales selon disponibilité</li>
            <li><strong>Forfait saison:</strong> Intéressant pour plus de 2 semaines</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil d'expert</h4>
            <p>Pour le meilleur rapport qualité/prix, visez la mi-janvier ou mars : neige garantie, affluence raisonnable et tarifs standards.</p>
          </div>` :
          `<h2>📅 Best Times, Prices, and Crowds</h2>
          <p class="lead">Optimize your ski trip by choosing the right time</p>
          
          <h3>🎿 Winter Season 2025-2026</h3>
          <ul>
            <li><strong>Opening:</strong> Late November 2025 (Tignes) / Early December 2025 (Val d'Isère)</li>
            <li><strong>Closing:</strong> Early May 2026 (depending on conditions)</li>
            <li><strong>Optimal Period:</strong> December to March</li>
            <li><strong>High Season:</strong> Christmas, February, and Easter holidays</li>
          </ul>
          
          <h3>📊 Analysis by Period</h3>
          
          <h4>🍂 December - Early January</h4>
          <ul>
            <li><strong>Pros:</strong> Fresh snow, full ski area, festive atmosphere</li>
            <li><strong>Cons:</strong> Maximum crowds, high prices</li>
            <li><strong>Ideal for:</strong> Christmas vacationers, powder lovers</li>
            <li><strong>Prices:</strong> +30% compared to average</li>
          </ul>
          
          <h4>❄️ January - March</h4>
          <ul>
            <li><strong>Pros:</strong> Good snow conditions, stable weather, perfect slopes</li>
            <li><strong>Cons:</strong> High crowds in February</li>
            <li><strong>Ideal for:</strong> Skiers of all levels, families</li>
            <li><strong>Prices:</strong> Price Standards</li>
          </ul>
          
          <h4>🌸 April - May</h4>
          <ul>
            <li><strong>Pros:</strong> Fewer crowds, lower prices, sunshine</li>
            <li><strong>Cons:</strong> Spring snow, some slopes closed</li>
            <li><strong>Ideal for:</strong> Budget-conscious, sun worshippers</li>
            <li><strong>Prices:</strong> 40% off compared to peak season</li>
          </ul>
          
          <h3>💰 Budget Tips</h3>
          <ul>
            <li><strong>Outside of school holidays:</strong> Save 20-30%</li>
            <li><strong>Early bird booking:</strong> Discounts up to 25%</li>
            <li><strong>Last minute:</strong> Special offers subject to availability</li>
            <li><strong>Season pass:</strong> Worthwhile for stays of more than 2 weeks</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Expert tip</h4>
            <p>For the best value, aim for mid-January or March: guaranteed snow, reasonable crowds, and standard prices.</p>
          </div>`
      },
      ouLoger: {
        title: currentLang === 'fr' ? 'Où loger ?' : 'Where to stay?',
        content: currentLang === 'fr' ? 
          `<h2>🏨 Hôtels, chalets et appartements</h2>
          <p class="lead">Trouvez l'hébergement parfait pour votre séjour ski</p>
          
          <h3>🏨 Hôtels</h3>
          
          <h4>Luxe - 4★ et 5★</h4>
          <ul>
            <li><strong>Tignes:</strong> Le Lana, Le Savoie, Le Suites - 200-500€/nuit</li>
            <li><strong>Val d'Isère:</strong> Le Christiania, Le Aigle, Le Brice - 250-600€/nuit</li>
            <li><strong>Les Arcs:</strong> Le Royal, Le Montana, Le Sherpa - 180-450€/nuit</li>
            <li><strong>Services:</strong> Spa, restaurant, bar, consierge</li>
          </ul>
          
          <h4>Standard - 3★</h4>
          <ul>
            <li><strong>Tignes:</strong> Le Alpaga, Le Lys, Le Gypaète - 80-150€/nuit</li>
            <li><strong>Val d'Isère:</strong> Le Diable, Le Belvédère, Le Kandahar - 90-180€/nuit</li>
            <li><strong>Les Arcs:</strong> Le Chalet, Le Marmotte, Le Chamois - 70-140€/nuit</li>
            <li><strong>Services:</strong> Petit déjeuner, bar, localisation ski aux pieds</li>
          </ul>
          
          <h3>🏡 Chalets et appartements</h3>
          
          <h4>Chalets privés</h4>
          <ul>
            <li><strong>Capacité:</strong> 4-12 personnes</li>
            <li><strong>Prix:</strong> 800-3000€/semaine selon saison</li>
            <li><strong>Avantages:</strong> Intimité, cuisine, espace, convivialité</li>
            <li><strong>Équipement:</strong> Cheminée, spa parfois, garage</li>
          </ul>
          
          <h4>Résidences de tourisme</h4>
          <ul>
            <li><strong>Tignes:</strong> Le Lac, Le Bouchet, Le Val Claret</li>
            <li><strong>Val d'Isère:</strong> Le Gallois, Le Cret, Le Joseray</li>
            <li><strong>Les Arcs:</strong> Le Charmettan, Le Planay, Le Villard</li>
            <li><strong>Prix:</strong> 500-1500€/semaine</li>
          </ul>
          
          <h3>🎯 Conseils de réservation</h3>
          <ul>
            <li><strong>Lieu:</strong> Proximité des remontées et commerces</li>
            <li><strong>Orientation:</strong> Sud pour le soleil, nord pour la neige</li>
            <li><strong>Altitude:</strong> Plus haut = plus de neige garantie</li>
            <li><strong>Services:</strong> Parking, WiFi, laverie, sèche-chaussures</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Attention</h4>
            <p>Réservez 6-8 mois à l'avance pour Noël et février. Les meilleures adresses partent très vite !</p>
          </div>` :
          `<h2>🏨 Hotels, Chalets, and Apartments</h2>
          <p class="lead">Find the perfect accommodation for your ski holiday</p>
          
          <h3>🏨 Hotels</h3>
          
          <h4>Luxury - 4★ and 5★</h4>
          <ul>
            <li><strong>Tignes:</strong> Le Lana, Le Savoie, Le Suites - €200-500/night</li>
            <li><strong>Val d'Isère:</strong> Le Christiania, Le Aigle, Le Brice - €250-600/night</li>
            <li><strong>Les Arcs:</strong> Le Royal, Le Montana, Le Sherpa - €180-450/night</li>
            <li><strong>Amenities:</strong> Spa, restaurant, bar, concierge</li>
          </ul>
          
          <h4>Standard - 3★</h4>
          <ul>
            <li><strong>Tignes:</strong> Le Alpaga, Le Lys, Le Gypaète - €80-150/night</li>
            <li><strong>Val d'Isère:</strong> Le Diable, Le Belvédère, Le Kandahar - €90-180/night</li>
            <li><strong>Les Arcs:</strong> Le Chalet, Le Marmotte, Le Chamois - €70-140/night</li>
            <li><strong>Amenities:</strong> Breakfast, bar, ski-in/ski-out</li>
          </ul>
          
          <h3>🏡 Chalets and Apartments</h3>
          
          <h4>Private Chalets</h4>
          <ul>
            <li><strong>Capacity:</strong> 4-12 people</li>
            <li><strong>Price:</strong> €800-3000/week depending on the season</li>
            <li><strong>Advantages:</strong> Privacy, kitchen, space, convivial atmosphere</li>
            <li><strong>Equipment:</strong> Fireplace, spa (sometimes), garage</li>
          </ul>
          
          <h4>Tourist Residences</h4>
          <ul>
            <li><strong>Tignes:</strong> Le Lac, Le Bouchet, Le Val Claret</li>
            <li><strong>Val d'Isère:</strong> Le Gallois, Le Cret, Le Joseray</li>
            <li><strong>Les Arcs:</strong> Le Charmettan, Le Planay, Le Villard</li>
            <li><strong>Price:</strong> €500-1500/week</li>
          </ul>
          
          <h3>🎯 Booking Tips</h3>
          <ul>
            <li><strong>Location:</strong> Close to ski lifts and shops</li>
            <li><strong>Orientation:</strong> South for sun, north for snow</li>
            <li><strong>Altitude:</strong> Higher = more snow guaranteed</li>
            <li><strong>Amenities:</strong> Parking, Wi-Fi, laundry facilities, boot dryers</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Important</h4>
            <p>Book 6-8 months in advance for Christmas and February. The best places get booked up very quickly!</p>
          </div>`
      },
      materiel: {
        title: currentLang === 'fr' ? 'Matériel' : 'Equipment',
        content: currentLang === 'fr' ? 
          `<h2>🎿 Location, achat et entretien</h2>
          <p class="lead">Le guide complet pour bien choisir et entretenir votre matériel</p>
          
          <h3>🏪 Location de matériel</h3>
          
          <h4>Sur place</h4>
          <ul>
            <li><strong>Avantages:</strong> Adaptation sur place, pas de transport</li>
            <li><strong>Inconvénients:</strong> Prix élevés, stock limité</li>
            <li><strong>Prix:</strong> Skis 25-35€/jour, Casque 10-15€/jour</li>
            <li><strong>Boutiques:</strong> Intersport, Skiset, Twinner, locaux indépendants</li>
          </ul>
          
          <h4>En ligne</h4>
          <ul>
            <li><strong>Avantages:</strong> Prix réduits, large choix, réservation</li>
            <li><strong>Inconvénients:</strong> Transport à gérer, adaptation parfois nécessaire</li>
            <li><strong>Sites:</strong> Skiset.com, Locaski.com, Alpinresort.com</li>
            <li><strong>Prix:</strong> Skis 15-25€/jour, Casque 5-10€/jour</li>
          </ul>
          
          <h3>💰 Achat de matériel</h3>
          
          <h4>Neuf vs Occasion</h4>
          <ul>
            <li><strong>Neuf:</strong> Garantie, dernière technologie, service après-vente</li>
            <li><strong>Occasion:</strong> 30-50% moins cher, déjà rodé, bon rapport qualité/prix</li>
            <li><strong>Où acheter:</strong> Magasins spécialisés, grandes surfaces, sites d'occasion</li>
            <li><strong>Garantie:</strong> 1-2 ans neuf, pas de garantie occasion</li>
          </ul>
          
          <h4>Investissement moyen</h4>
          <ul>
            <li><strong>Skis + Fixations:</strong> 400-800€ (débutant à expert)</li>
            <li><strong>Casque:</strong> 80-200€</li>
            <li><strong>Lunettes:</strong> 100-300€</li>
            <li><strong>Chaussures:</strong> 200-500€</li>
            <li><strong>Total:</strong> 780-1800€ pour un équipement complet</li>
          </ul>
          
          <h3>🔧 Entretien du matériel</h3>
          
          <h4>Après chaque journée</h4>
          <ul>
            <li><strong>Sécher les skis:</strong> Verticalement, pointes vers le bas</li>
            <li><strong>Déposer les chaussures:</strong> Ouvertes pour séchage</li>
            <li><strong>Vérifier les fixations:</strong> Resserrer si nécessaire</li>
            <li><strong>Nettoyer casque:</strong> Intérieur et extérieur</li>
          </ul>
          
          <h4>Entretien saisonnier</h4>
          <ul>
            <li><strong>Fartage:</strong> Appliquer cire de fartage tous les 5-6 jours</li>
            <li><strong>Reparations:</strong> Professionnel pour les dégâts importants</li>
            <li><strong>Stockage:</strong> Sec, tempéré, à l'abri de la lumière</li>
            <li><strong>Révision:</strong> Fixations et semelles tous les 2-3 ans</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil pro</h4>
            <p>Un bon entretien prolonge la vie de votre matériel de 3-5 ans et améliore vos performances sur les pistes !</p>
          </div>` :
          `<h2>🎿 Rental, Purchase, and Maintenance</h2>
          <p class="lead">The Complete Guide to Choosing and Maintaining Your Equipment</p>
          
          <h3>🏪 Equipment Rental</h3>
          
          <h4>On-Site</h4>
          <ul>
            <li><strong>Advantages:</strong> On-site fitting, no transportation required</li>
            <li><strong>Disadvantages:</strong> High prices, limited stock</li>
            <li><strong>Prices:</strong> Skis €25-35/day, Helmet €10-15/day</li>
            <li><strong>Shops:</strong> Intersport, Skiset, Twinner, independent retailers</li>
          </ul>
          
          <h4>Online</h4>
          <ul>
            <li><strong>Advantages:</strong> Reduced prices, wide selection, reservations</li>
            <li><strong>Disadvantages:</strong> Transportation to arrange, fitting sometimes necessary</li>
            <li><strong>Websites:</strong> Skiset.com, Locaski.com, Alpinresort.com</li>
            <li><strong>Prices:</strong> Skis €15-25/day, Helmet €5-10/day</li>
          </ul>
          
          <h3>💰 Equipment Purchase</h3>
          
          <h4>New vs. Used</h4>
          <ul>
            <li><strong>New:</strong> Warranty, latest technology, after-sales service</li>
            <li><strong>Used:</strong> 30-50% cheaper, already broken in, good value for money</li>
            <li><strong>Where to buy:</strong> Specialty stores, supermarkets, second-hand websites</li>
            <li><strong>Warranty:</strong> 1-2 years old, new, no used warranty</li>
          </ul>
          
          <h4>Average investment</h4>
          <ul>
            <li><strong>Skis + Bindings:</strong> €400-800 (beginner to expert)</li>
            <li><strong>Helmet:</strong> €80-200</li>
            <li><strong>Goggles:</strong> €100-300</li>
            <li><strong>Boots:</strong> €200-500</li>
            <li><strong>Total:</strong> €780-1800 for a complete set</li>
          </ul>
          
          <h3>🔧 Equipment Maintenance</h3>
          
          <h4>After each day</h4>
          <ul>
            <li><strong>Dry skis:</strong> Vertically, tips down</li>
            <li><strong>Take off boots:</strong> Open to dry</li>
            <li><strong>Check bindings:</strong> Tighten if necessary</li>
            <li><strong>Clean helmet:</strong> Inside and out</li>
          </ul>
          
          <h4>Seasonal Maintenance</h4>
          <ul>
            <li><strong>Waxing:</strong> Apply wax every 5-6 days</li>
            <li><strong>Repairs:</strong> Professional for major damage</li>
            <li><strong>Storage:</strong> Dry, temperate, away from light</li>
            <li><strong>Service:</strong> Bindings and bases every 2-3 years</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Pro Tip</h4>
            <p>Proper maintenance extends the life of your equipment by 3-5 years and improves your performance on the slopes!</p>
          </div>`
      },
      applications: {
        title: currentLang === 'fr' ? 'Applications' : 'Apps',
        content: currentLang === 'fr' ? 
          `<h2>📱 Météo, neige et forfaits</h2>
          <p class="lead">Les applications indispensables pour votre séjour ski</p>
          
          <h3>🌨️ Météo et neige</h3>
          
          <h4>Météo France</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Prévisions détaillées, bulletins neige, radars</li>
            <li><strong>Avantages:</strong> Officiel, fiable, gratuit</li>
            <li><strong>Inconvénients:</strong> Prévisions parfois imprécises en montagne</li>
            <li><strong>Idéal pour:</strong> Planification à court terme</li>
          </ul>
          
          <h4>Snow-Forecast</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Prévisions neige ultra-précises, webcams</li>
            <li><strong>Avantages:</strong> Très précis en montagne, webcams en direct</li>
            <li><strong>Inconvénients:</strong> Payant pour fonctionnalités avancées</li>
            <li><strong>Idéal pour:</strong> Choisir le meilleur jour pour skier</li>
          </ul>
          
          <h4>YR.no</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Météo norvégienne, très fiable en montagne</li>
            <li><strong>Avantages:</strong> Prévisions exceptionnelles, gratuit</li>
            <li><strong>Inconvénients:</strong> Interface en anglais/norvégien</li>
            <li><strong>Idéal pour:</strong> Prévisions à long terme</li>
          </ul>
          
          <h3>🎿 Applications domaines skiables</h3>
          
          <h4>MyTignes</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Plan des pistes, webcam, météo, enneigement</li>
            <li><strong>Avantages:</strong> Officiel Tignes, très complet</li>
            <li><strong>Services:</strong> Achat forfait, réservation restaurants</li>
            <li><strong>Idéal pour:</strong> Tignes et Val d'Isère</li>
          </ul>
          
          <h4>Val d'Isère</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Plan domaines, webcam, état des pistes</li>
            <li><strong>Avantages:</strong> Officiel Val d'Isère, informations fiables</li>
            <li><strong>Services:</strong> Forfait digital, informations pratiques</li>
            <li><strong>Idéal pour:</strong> Val d'Isère et Espace Killy</li>
          </ul>
          
          <h4>Ski-Alpes</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Plusieurs domaines, météo, webcams</li>
            <li><strong>Avantages:</strong> Multi-domaines, comparaison stations</li>
            <li><strong>Couverture:</strong> Alpes françaises et suisses</li>
            <li><strong>Idéal pour:</strong> Comparer différentes stations</li>
          </ul>
          
          <h3>📱 Applications utiles</h3>
          
          <h4>Geoportail</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Cartes IGN, localisation GPS, sécurité</li>
            <li><strong>Avantages:</strong> Indispensable pour hors-piste, gratuit</li>
            <li><strong>Idéal pour:</strong> Randonnées en montagne, sécurité</li>
          </ul>
          
          <h4>WhatsApp</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Communication groupe, partage position</li>
            <li><strong>Avantages:</strong> Gratuit, universel, fonctionne hors réseau</li>
            <li><strong>Idéal pour:</strong> Coordonner avec votre groupe sur les pistes</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil de pro</h4>
            <p>Combinez 2-3 applications : une météo (Snow-Forecast), une domaine (MyTignes) et une utilitaire (Geoportail) pour couvrir tous vos besoins !</p>
          </div>` :
          `<h2>📱 Weather, Snow, and Lift Passes</h2>
          <p class="lead">Essential apps for your ski trip</p>
          
          <h3>🌨️ Weather and Snow</h3>
          
          <h4>Météo France</h4>
          <ul>
            <li><strong>Features:</strong> Detailed forecasts, snow reports, radar</li>
            <li><strong>Pros:</strong> Official, reliable, free</li>
            <li><strong>Cons:</strong> Forecasts sometimes inaccurate in the mountains</li>
            <li><strong>Ideal for:</strong> Short-term planning</li>
          </ul>
          
          <h4>Snow-Forecast</h4>
          <ul>
            <li><strong>Features:</strong> Ultra-precise snow forecasts, webcams</li>
            <li><strong>Pros:</strong> Very accurate in the mountains, live webcams</li>
            <li><strong>Cons:</strong> Paid for advanced features</li>
            <li><strong>Ideal for:</strong> Choosing the best day to ski</li>
          </ul>
          
          <h4>YR.no</h4>
          <ul>
            <li><strong>Features:</strong> Norwegian weather, very reliable in the mountains</li>
            <li><strong>Pros:</strong> Exceptional forecasts, free</li>
            <li><strong>Cons:</strong> Interface in English/Norwegian</li>
            <li><strong>Ideal for:</strong> Long-term forecasts</li>
          </ul>
          
          <h3>🎿 Ski Area Apps</h3>
          
          <h4>MyTignes</h4>
          <ul>
            <li><strong>Features:</strong> Piste map, webcam, weather, snow conditions</li>
            <li><strong>Pros:</strong> Official Tignes app, very comprehensive</li>
            <li><strong>Services:</strong> Ski pass purchase, restaurant reservations</li>
            <li><strong>Ideal for:</strong> Tignes and Val d'Isère</li>
          </ul>
          
          <h4>Val d'Isère</h4>
          <ul>
            <li><strong>Features:</strong> Area map, webcam, piste conditions</li>
            <li><strong>Advantages:</strong> Official Val d'Isère, reliable information</li>
            <li><strong>Services:</strong> Digital ski pass, practical information</li>
            <li><strong>Ideal for:</strong> Val d'Isère and Espace Killy</li>
          </ul>
          
          <h4>Ski-Alpes</h4>
          <ul>
            <li><strong>Features:</strong> Multiple areas, weather, webcams</li>
            <li><strong>Advantages:</strong> Multi-area, resort comparison</li>
            <li><strong>Coverage:</strong> French and Swiss Alps</li>
            <li><strong>Ideal for:</strong> Comparing different resorts</li>
          </ul>
          
          <h3>📱 Useful Apps</h3>
          
          <h4>Geoportail</h4>
          <ul>
            <li><strong>Features:</strong> IGN maps, GPS location, safety</li>
            <li><strong>Advantages:</strong> Essential for off-piste skiing, free</li>
            <li><strong>Ideal for:</strong> Mountain hiking, safety</li>
          </ul>
          
          <h4>WhatsApp</h4>
          <ul>
            <li><strong>Features:</strong> Group communication, location sharing</li>
            <li><strong>Advantages:</strong> Free, universal, works offline</li>
            <li><strong>Ideal for:</strong> Coordinating with your group on the slopes</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Pro Tip</h4>
            <p>Combine 2-3 apps: one weather app (Snow-Forecast), a domain (MyTignes) and a utility (Geoportail) to cover all your needs!</p>
          </div>`
      },
      lesArcs: {
        title: 'Les Arcs',
        content: `
          <h2>🏔️ 4 stations, 200+ km de pistes, architecture moderne</h2>
          <p class="lead">Découvrez le domaine skiable des Arcs avec ses 4 stations uniques</p>
          
          <h3>🏔️ Les 4 stations des Arcs</h3>
          
          <h4>🎿 Arc 1600 - La porte des Arcs</h4>
          <ul>
            <li><strong>Altitude:</strong> 1600m - Station la plus basse</li>
            <li><strong>Caractère:</strong> Familiale, accessible, moderne</li>
            <li><strong>Avantages:</strong> Accès facile, parking gratuit, commerces</li>
            <li><strong>Pistes:</strong> 10 pistes (2 vertes, 5 bleues, 3 rouges)</li>
            <li><strong>Idéal pour:</strong> Débutants, familles, premier prix</li>
          </ul>
          
          <h4>🎿 Arc 1800 - Le charme authentique</h4>
          <ul>
            <li><strong>Altitude:</strong> 1800m - Station village</li>
            <li><strong>Caractère:</strong> Traditionnel, convivial, authentique</li>
            <li><strong>Avantages:</strong> Architecture savoyarde, restaurants typiques</li>
            <li><strong>Pistes:</strong> 15 pistes (3 vertes, 7 bleues, 4 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Ambiance village, ski familial, tradition</li>
          </ul>
          
          <h4>🎿 Arc 1950 - La station moderne</h4>
          <ul>
            <li><strong>Altitude:</strong> 1950m - Station piétonne</li>
            <li><strong>Caractère:</strong> Moderne, dynamique, piétonne</li>
            <li><strong>Avantages:</strong> Pas de voitures, architecture innovante, spa</li>
            <li><strong>Pistes:</strong> 20 pistes (4 vertes, 10 bleues, 5 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Ski sans voiture, modernité, bien-être</li>
          </ul>
          
          <h4>🎿 Arc 2000 - La station sport</h4>
          <ul>
            <li><strong>Altitude:</strong> 2000m - Station haute altitude</li>
            <li><strong>Caractère:</strong> Sportive, ensoleillée, panoramique</li>
            <li><strong>Avantages:</strong> Vue exceptionnelle, ensoleillement maximal</li>
            <li><strong>Pistes:</strong> 25 pistes (5 vertes, 12 bleues, 6 rouges, 2 noires)</li>
            <li><strong>Idéal pour:</strong> Skieurs sportifs, ensoleillement, vue</li>
          </ul>
          
          <h3>🎿 Domaine skiable des Arcs</h3>
          <ul>
            <li><strong>Kilomètres de pistes:</strong> 200+ km</li>
            <li><strong>Nombre de pistes:</strong> 106 pistes (21 vertes, 48 bleues, 28 rouges, 9 noires)</li>
            <li><strong>Remontées:</strong> 54 installations</li>
            <li><strong>Altitude max:</strong> 3226m (Aiguille Rouge)</li>
            <li><strong>Enneigement:</strong> 80% du domaine enneigeable artificiellement</li>
          </ul>
          
          <h3>🎿 Spécialités des Arcs</h3>
          <ul>
            <li><strong>Freeride:</strong> Domaine réputé, nombreux itinéraires</li>
            <li><strong>Freestyle:</strong> Snowpark 2.0, boardercross, half-pipe</li>
            <li><strong>Famille:</strong> Zones dédiées, écoles de ski</li>
            <li><strong>Architecture:</strong> Station piétonne, design moderne</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil d'expert</h4>
            <p>Les Arcs sont parfaits pour les skieurs de tous niveaux avec une architecture moderne et un excellent enneigement garanti !</p>
          </div>
        `
      },
      laPlagne: {
        title: 'La Plagne',
        content: `
          <h2>🏔️ 10 stations, 225 km de pistes, familial</h2>
          <p class="lead">Le domaine familial par excellence avec ses 10 stations uniques</p>
          
          <h3>🏔️ Les 10 stations de La Plagne</h3>
          
          <h4>🎿 Plagne Centre - Le cœur du domaine</h4>
          <ul>
            <li><strong>Altitude:</strong> 1970m - Station principale</li>
            <li><strong>Caractère:</strong> Dynamique, commerciale, familiale</li>
            <li><strong>Avantages:</strong> Tous commerces, piscine, cinéma</li>
            <li><strong>Pistes:</strong> 15 pistes (3 vertes, 8 bleues, 3 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Familles, commodités, animations</li>
          </ul>
          
          <h4>🎿 Bellecôte - L'élégance</h4>
          <ul>
            <li><strong>Altitude:</strong> 2050m - Station prestige</li>
            <li><strong>Caractère:</strong> Luxueuse, élégante, panoramique</li>
            <li><strong>Avantages:</strong> Hôtels 5★, restaurants gastronomiques</li>
            <li><strong>Pistes:</strong> 20 pistes (4 vertes, 10 bleues, 4 rouges, 2 noires)</li>
            <li><strong>Idéal pour:</strong> Luxe, gastronomie, vue exceptionnelle</li>
          </ul>
          
          <h4>🎿 Aime 2000 - La tranquillité</h4>
          <ul>
            <li><strong>Altitude:</strong> 2000m - Station calme</li>
            <li><strong>Caractère:</strong> Familiale, tranquille, ensoleillée</li>
            <li><strong>Avantages:</strong> Calme, ensoleillement, accès facile</li>
            <li><strong>Pistes:</strong> 12 pistes (3 vertes, 6 bleues, 2 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Familles avec jeunes enfants, calme</li>
          </ul>
          
          <h4>🎿 Plagne 1800 - Le village</h4>
          <ul>
            <li><strong>Altitude:</strong> 1800m - Station traditionnelle</li>
            <li><strong>Caractère:</strong> Authentique, savoyarde, conviviale</li>
            <li><strong>Avantages:</strong> Architecture traditionnelle, restaurants</li>
            <li><strong>Pistes:</strong> 10 pistes (2 vertes, 5 bleues, 2 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Ambiance village, tradition, convivialité</li>
          </ul>
          
          <h3>🎿 Domaine skiable de La Plagne</h3>
          <ul>
            <li><strong>Kilomètres de pistes:</strong> 225 km</li>
            <li><strong>Nombre de pistes:</strong> 131 pistes (28 vertes, 63 bleues, 34 rouges, 6 noires)</li>
            <li><strong>Remontées:</strong> 63 installations</li>
            <li><strong>Altitude max:</strong> 3250m (Glacier de Bellecôte)</li>
            <li><strong>Enneigement:</strong> 85% du domaine enneigeable artificiellement</li>
          </ul>
          
          <h3>🎿 Spécialités de La Plagne</h3>
          <ul>
            <li><strong>Familial:</strong> Idéal pour les enfants, zones dédiées</li>
            <li><strong>Glacier:</strong> Glacier de Bellecôte pour ski d'été</li>
            <li><strong>Freeride:</strong> Domaine accessible pour tous niveaux</li>
            <li><strong>Innovation:</strong> Premier téléphérique du monde</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil d'expert</h4>
            <p>La Plagne est parfaite pour les familles avec un excellent rapport qualité/prix et des pistes adaptées à tous les niveaux !</p>
          </div>
        `
      },
      vanoiseExpress: {
        title: 'Vanoise Express',
        content: `
          <h2>🚡 Le lien magique entre les domaines</h2>
          <p class="lead">Le téléphérique qui relie Les Arcs à La Plagne en 5 minutes</p>
          
          <h3>🚡 Caractéristiques techniques</h3>
          <ul>
            <li><strong>Type:</strong> Téléphérique à double cabine</li>
            <li><strong>Capacité:</strong> 200 personnes par cabine</li>
            <li><strong>Durée:</strong> 4 minutes de trajet</li>
            <li><strong>Altitude départ:</strong> 1600m (Arc 1600)</li>
            <li><strong>Altitude arrivée:</strong> 2500m (Roche de Mioz)</li>
            <li><strong>Débit:</strong> 2000 personnes/heure par sens</li>
          </ul>
          
          <h3>🏔️ Les 2 gares</h3>
          
          <h4>Gare des Arcs (Arc 1600)</h4>
          <ul>
            <li><strong>Services:</strong> Restaurants, boutiques, location</li>
            <li><strong>Accès:</strong> Parking gratuit, navettes depuis autres stations</li>
            <li><strong>Commerces:</strong> Supermarché, pharmacies, boulangeries</li>
            <li><strong>Idéal pour:</strong> Départ depuis Les Arcs</li>
          </ul>
          
          <h4>Gare de La Plagne (Plagne Centre)</h4>
          <ul>
            <li><strong>Services:</strong> Restaurants, boutiques, crèche</li>
            <li><strong>Accès:</strong> Navettes depuis toutes stations Plagne</li>
            <li><strong>Commerces:</strong> Tous services de station principale</li>
            <li><strong>Idéal pour:</strong> Départ depuis La Plagne</li>
          </ul>
          
          <h3>🎿 Domaine Paradiski unifié</h3>
          <ul>
            <li><strong>Kilomètres totaux:</strong> 425 km de pistes</li>
            <li><strong>Nombre de pistes:</strong> 237 pistes (49 vertes, 111 bleues, 62 rouges, 15 noires)</li>
            <li><strong>Remontées totales:</strong> 117 installations</li>
            <li><strong>Altitude max:</strong> 3250m (Glacier de Bellecôte)</li>
            <li><strong>Altitude min:</strong> 1200m (Arc 1600)</li>
          </ul>
          
          <h3>🎿 Avantages du Vanoise Express</h3>
          <ul>
            <li><strong>Rapidité:</strong> 5 minutes entre les domaines</li>
            <li><strong>Capacité:</strong> 2000 personnes/heure</li>
            <li><strong>Confort:</strong> Cabines spacieuses, assises</li>
            <li><strong>Paysage:</strong> Vue spectaculaire sur la vallée</li>
            <li><strong>Flexibilité:</strong> Ski sur 2 domaines le même jour</li>
          </ul>
          
          <h3>🎿 Conseils pratiques</h3>
          <ul>
            <li><strong>Horaires:</strong> 8h30-17h00 (saison d'hiver)</li>
            <li><strong>Forfait:</strong> Forfait Paradiski obligatoire</li>
            <li><strong>Attente:</strong> 5-15 minutes en haute saison</li>
            <li><strong>Stockage skis:</strong> Gratuit aux gares</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Important</h4>
            <p>Le Vanoise Express ferme généralement 2 semaines par an pour maintenance. Vérifiez les dates avant votre séjour !</p>
          </div>
        `
      },
      tignes: {
        title: 'Tignes',
        content: `
          <h2>🏔️ Station moderne, haute altitude, glacier du Grand Motte</h2>
          <p class="lead">Découvrez Tignes, la station sportive par excellence de l'Espace Killy</p>
          
          <h3>🏔️ Les 5 stations de Tignes</h3>
          
          <h4>🎿 Val Claret (1550m) - La porte de Tignes</h4>
          <ul>
            <li><strong>Altitude:</strong> 1550m - Station principale</li>
            <li><strong>Caractère:</strong> Dynamique, commerciale, familiale</li>
            <li><strong>Avantages:</strong> Tous commerces, piscine, cinéma, restaurants</li>
            <li><strong>Pistes:</strong> 15 pistes (3 vertes, 8 bleues, 3 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Familles, commodités, animations</li>
          </ul>
          
          <h4>🎿 Le Lac (2100m) - Le cœur sportif</h4>
          <ul>
            <li><strong>Altitude:</strong> 2100m - Station haute altitude</li>
            <li><strong>Caractère:</strong> Sportive, ensoleillée, panoramique</li>
            <li><strong>Avantages:</strong> Vue exceptionnelle, accès direct glacier</li>
            <li><strong>Pistes:</strong> 20 pistes (4 vertes, 10 bleues, 4 rouges, 2 noires)</li>
            <li><strong>Idéal pour:</strong> Skieurs sportifs, ensoleillement, glacier</li>
          </ul>
          
          <h4>🎿 Le Bouchet (1550m) - La tranquillité</h4>
          <ul>
            <li><strong>Altitude:</strong> 1550m - Station calme</li>
            <li><strong>Caractère:</strong> Familiale, tranquille, ensoleillée</li>
            <li><strong>Avantages:</strong> Calme, ensoleillement, accès facile</li>
            <li><strong>Pistes:</strong> 12 pistes (3 vertes, 6 bleues, 2 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Familles avec jeunes enfants, calme</li>
          </ul>
          
          <h3>🏂 Particularités de Tignes</h3>
          <ul>
            <li><strong>Glacier du Grand Motte:</strong> Ski d'été garanti</li>
            <li><strong>Haute altitude:</strong> Enneigement exceptionnel</li>
            <li><strong>Station moderne:</strong> Architecture innovante</li>
            <li><strong>Sportive:</strong> Accueil de grandes compétitions</li>
            <li><strong>Familiale:</strong> Zones dédiées enfants</li>
          </ul>
          
          <h3>🎿 Domaine skiable Tignes</h3>
          <ul>
            <li><strong>Kilomètres de pistes:</strong> 150 km (uniquement Tignes)</li>
            <li><strong>Nombre de pistes:</strong> 82 pistes (15 vertes, 36 bleues, 23 rouges, 8 noires)</li>
            <li><strong>Remontées:</strong> 44 installations</li>
            <li><strong>Altitude max:</strong> 3450m (Glacier du Grand Motte)</li>
            <li><strong>Enneigement:</strong> 90% du domaine enneigeable artificiellement</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil d'expert</h4>
            <p>Tignes est parfaite pour les skieurs sportifs avec un enneigement garanti et un accès au glacier toute l'année !</p>
          </div>
        `
      },
      valDisere: {
        title: 'Val d\'Isère',
        content: `
          <h2>🏰 Station historique, village authentique, Face de Bellevarde</h2>
          <p class="lead">Découvrez Val d'Isère, la station prestigieuse de l'Espace Killy</p>
          
          <h3>🏰 Les quartiers de Val d'Isère</h3>
          
          <h4>🎿 Centre historique (1850m) - Le village authentique</h4>
          <ul>
            <li><strong>Altitude:</strong> 1850m - Cœur historique</li>
            <li><strong>Caractère:</strong> Traditionnel, savoyard, authentique</li>
            <li><strong>Avantages:</strong> Architecture traditionnelle, restaurants typiques</li>
            <li><strong>Pistes:</strong> 18 pistes (4 vertes, 9 bleues, 4 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Ambiance village, tradition, gastronomie</li>
          </ul>
          
          <h4>🎿 Le Fornet (1930m) - L'élégance</h4>
          <ul>
            <li><strong>Altitude:</strong> 1930m - Station prestige</li>
            <li><strong>Caractère:</strong> Luxueuse, élégante, panoramique</li>
            <li><strong>Avantages:</strong> Hôtels 5★, restaurants gastronomiques</li>
            <li><strong>Pistes:</strong> 15 pistes (3 vertes, 8 bleues, 3 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Luxe, gastronomie, vue exceptionnelle</li>
          </ul>
          
          <h4>🎿 La Daille (1780m) - Le soleil</h4>
          <ul>
            <li><strong>Altitude:</strong> 1780m - Station ensoleillée</li>
            <li><strong>Caractère:</strong> Familiale, ensoleillée, accessible</li>
            <li><strong>Avantages:</strong> Ensoleillement maximal, accès facile</li>
            <li><strong>Pistes:</strong> 12 pistes (3 vertes, 6 bleues, 2 rouges, 1 noire)</li>
            <li><strong>Idéal pour:</strong> Familles, ensoleillement, accessibilité</li>
          </ul>
          
          <h3>🏂 Particularités de Val d'Isère</h3>
          <ul>
            <li><strong>Face de Bellevarde:</strong> Piste olympique mythique</li>
            <li><strong>Village authentique:</strong> Architecture savoyarde préservée</li>
            <li><strong>Station historique:</strong> Plus de 80 ans d'histoire</li>
            <li><strong>Prestigieuse:</strong> Accueil de grandes compétitions</li>
            <li><strong>Gastronomique:</strong> Restaurants étoilés</li>
          </ul>
          
          <h3>🎿 Domaine skiable Val d'Isère</h3>
          <ul>
            <li><strong>Kilomètres de pistes:</strong> 150 km (uniquement Val d'Isère)</li>
            <li><strong>Nombre de pistes:</strong> 89 pistes (17 vertes, 42 bleues, 24 rouges, 6 noires)</li>
            <li><strong>Remontées:</strong> 44 installations</li>
            <li><strong>Altitude max:</strong> 3450m (Pointe du Mont Pourri)</li>
            <li><strong>Enneigement:</strong> 85% du domaine enneigeable artificiellement</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil d'expert</h4>
            <p>Val d'Isère est parfaite pour les amateurs de tradition et de gastronomie avec des pistes mythiques et un village authentique !</p>
          </div>
        `
      },
      espaceKilly: {
        title: 'Espace Killy',
        content: `
          <h2>🗺️ Le plus beau domaine du monde</h2>
          <p class="lead">Découvrez l'Espace Killy, 300 km de pistes entre Tignes et Val d'Isère</p>
          
          <h3>🎿 Domaine skiable unifié</h3>
          <ul>
            <li><strong>Kilomètres totaux:</strong> 300 km de pistes</li>
            <li><strong>Nombre de pistes:</strong> 139 pistes (21 vertes, 66 bleues, 40 rouges, 12 noires)</li>
            <li><strong>Remontées totales:</strong> 88 installations</li>
            <li><strong>Altitude max:</strong> 3450m (Pointe du Mont Pourri)</li>
            <li><strong>Altitude min:</strong> 1550m (Val Claret)</li>
          </ul>
          
          <h3>🚡 Remontées mécaniques</h3>
          <ul>
            <li><strong>Téléphériques:</strong> 12 installations</li>
            <li><strong>Télésièges:</strong> 35 installations</li>
            <li><strong>Télécabines:</strong> 18 installations</li>
            <li><strong>Téléskis:</strong> 23 installations</li>
            <li><strong>Funiculaires:</strong> 2 installations (Tignes & Val d'Isère)</li>
          </ul>
          
          <h3>❄️ Glaciers</h3>
          
          <h4>Glacier du Grand Motte (Tignes)</h4>
          <ul>
            <li><strong>Altitude:</strong> 3450m - 2550m</li>
            <li><strong>Particularité:</strong> Ski d'été possible</li>
            <li><strong>Pistes:</strong> 20 km de pistes glacier</li>
            <li><strong>Accès:</strong> Téléphérique depuis Le Lac</li>
          </ul>
          
          <h4>Glacier de Pisaillas (Val d'Isère)</h4>
          <ul>
            <li><strong>Altitude:</strong> 3400m - 2800m</li>
            <li><strong>Particularité:</strong> Domaine freeride</li>
            <li><strong>Pistes:</strong> 15 km de pistes glacier</li>
            <li><strong>Accès:</strong> Télécabine depuis Le Fornet</li>
          </ul>
          
          <h3>🎯 Forfait unique</h3>
          <ul>
            <li><strong>Type:</strong> Forfait Espace Killy</li>
            <li><strong>Accès:</strong> Illimité Tignes + Val d'Isère</li>
            <li><strong>Validité:</strong> 1 jour à saison complète</li>
            <li><strong>Options:</strong> Family, Senior, Junior</li>
            <li><strong>Rabais:</strong> -10% réservation en ligne</li>
          </ul>
          
          <h3>🎿 Spécialités du domaine</h3>
          <ul>
            <li><strong>Freeride:</strong> Domaine exceptionnel, nombreux itinéraires</li>
            <li><strong>Freestyle:</strong> 2 snowparks, half-pipe, boardercross</li>
            <li><strong>Familial:</strong> Zones dédiées, écoles de ski</li>
            <li><strong>Olympique:</strong> Piste de Bellevarde, compétitions</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Important</h4>
            <p>L'Espace Killy est l'un des rares domaines à garantir l'enneigement de novembre à mai grâce à ses 2 glaciers !</p>
          </div>
        `
      },
      horairesSaison: {
        title: 'Horaires saison 2025-2026',
        content: `
          <h2>⏰ Calendrier complet de la saison</h2>
          <p class="lead">Toutes les dates importantes pour planifier votre séjour</p>
          
          <h3>📅 Dates d'ouverture et fermeture</h3>
          
          <h4>🎂 Ouverture Tignes</h4>
          <ul>
            <li><strong>Date:</strong> 28 novembre 2025</li>
            <li><strong>Particularité:</strong> Plus ouverte des Alpes</li>
            <li><strong>Domaine:</strong> Glacier du Grand Motte ouvert</li>
            <li><strong>Conditions:</strong> Neige naturelle + enneigement artificiel</li>
          </ul>
          
          <h4>🎂 Ouverture Val d'Isère</h4>
          <ul>
            <li><strong>Date:</strong> 5 décembre 2025</li>
            <li><strong>Particularité:</strong> Ouverture traditionnelle</li>
            <li><strong>Domaine:</strong> Ensemble du domaine</li>
            <li><strong>Conditions:</strong> Enneigement artificiel garanti</li>
          </ul>
          
          <h4>🎂 Fermeture estimée</h4>
          <ul>
            <li><strong>Date:</strong> 3 mai 2026</li>
            <li><strong>Particularité:</strong> Selon conditions météo</li>
            <li><strong>Domaine:</strong> Glacier Grand Motte ouvert jusqu'en juillet</li>
            <li><strong>Conditions:</strong> Minimum 30 cm de neige</li>
          </ul>
          
          <h3>🌞 Périodes saisonnières</h3>
          
          <h4>Haute saison</h4>
          <ul>
            <li><strong>Noël:</strong> 20 décembre - 6 janvier</li>
            <li><strong>Février:</strong> 8 février - 8 mars</li>
            <li><strong>Particularité:</strong> Affluence maximale</li>
            <li><strong>Tarifs:</strong> +30% par rapport à la moyenne</li>
          </ul>
          
          <h4>Basse saison</h4>
          <ul>
            <li><strong>Décembre:</strong> 7 décembre - 19 décembre</li>
            <li><strong>Mars-avril:</strong> 9 mars - 2 mai</li>
            <li><strong>Particularité:</strong> Moins de monde</li>
            <li><strong>Tarifs:</strong> -20% par rapport à la moyenne</li>
          </ul>
          
          <h4>Printemps ski</h4>
          <ul>
            <li><strong>Période:</strong> Avril 2026</li>
            <li><strong>Particularité:</strong> Neige de printemps</li>
            <li><strong>Avantages:</strong> Ensoleillement, prix réduits</li>
            <li><strong>Conditions:</strong> Neige garantie en altitude</li>
          </ul>
          
          <h3>🎿 Horaires des remontées</h3>
          <ul>
            <li><strong>Hiver:</strong> 8h30 - 17h00</li>
            <li><strong>Décembre:</strong> 8h45 - 16h45</li>
            <li><strong>Printemps:</strong> 9h00 - 16h30</li>
            <li><strong>Glacier:</strong> 8h00 - 13h00 (été)</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil de pro</h4>
            <p>Pour le meilleur rapport qualité/prix, visez la mi-décembre ou mars : neige garantie, affluence raisonnable et tarifs réduits !</p>
          </div>
        `
      },
      programmeAnimations: {
        title: 'Programme d\'animations',
        content: `
          <h2>🎊 Agenda des événements saison 2025-2026</h2>
          <p class="lead">Découvrez toutes les animations et événements de la saison</p>
          
          <h3>🎂 Décembre 2025</h3>
          
          <h4>Ouverture et festivités</h4>
          <ul>
            <li><strong>28 nov:</strong> Ouverture Tignes - Feux d'artifice</li>
            <li><strong>5 déc:</strong> Ouverture Val d'Isère - Défilé</li>
            <li><strong>15 déc:</strong> Marché de Noël - Tignes</li>
            <li><strong>24 déc:</strong> Veillée de Noël - Les deux stations</li>
            <li><strong>31 déc:</strong> Réveillon - Grand feu d'artifice</li>
          </ul>
          
          <h3>❄️ Janvier 2026</h3>
          
          <h4>Sports et compétitions</h4>
          <ul>
            <li><strong>5-10 jan:</strong> Coupe du monde de slalom - Val d'Isère</li>
            <li><strong>15 jan:</strong> Grand Prix de freeride - Tignes</li>
            <li><strong>20 jan:</strong> Festival de musique - Tignes</li>
            <li><strong>25 jan:</strong> Course de luge - Val d'Isère</li>
          </ul>
          
          <h3>🎿 Février 2026</h3>
          
          <h4>Février - Vacances scolaires</h4>
          <ul>
            <li><strong>1-28 fév:</strong> Animations quotidiennes</li>
            <li><strong>8 fév:</strong> Carnaval d'hiver - Tignes</li>
            <li><strong>15 fév:</strong> Festival de glace - Val d'Isère</li>
            <li><strong>20 fév:</strong> Soirée DJ - Les deux stations</li>
            <li><strong>25 fév:</strong> Course de fond - Espace Killy</li>
          </ul>
          
          <h3>🌸 Mars 2026</h3>
          
          <h4>Printemps et soleil</h4>
          <ul>
            <li><strong>5 mars:</strong> Festival de musique folklorique</li>
            <li><strong>10 mars:</strong> Course de ski alpin</li>
            <li><strong>15 mars:</strong> Fête du printemps - Tignes</li>
            <li><strong>20 mars:</strong> Soirée gastronomique - Val d'Isère</li>
            <li><strong>25 mars:</strong> Grand festival de ski</li>
          </ul>
          
          <h3>🎊 Avril 2026</h3>
          
          <h4>Printemps ski et festivités</h4>
          <ul>
            <li><strong>1-15 avr:</strong> Printemps ski - Animations</li>
            <li><strong>5 avr:</strong> Festival de musique électronique</li>
            <li><strong>10 avr:</strong> Course de ski de vitesse</li>
            <li><strong>15 avr:</strong> Fête de la montagne</li>
            <li><strong>20 avr:</strong> Grand closing - Les deux stations</li>
          </ul>
          
          <h3>🎿 Animations régulières</h3>
          <ul>
            <li><strong>Lundi:</strong> Soirée cinéma - Tignes</li>
            <li><strong>Mardi:</strong> Marché local - Val d'Isère</li>
            <li><strong>Mercredi:</strong> Animations enfants</li>
            <li><strong>Jeudi:</strong> Soirée DJ - Les deux stations</li>
            <li><strong>Vendredi:</strong> Feu d'artifice</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil de pro</h4>
            <p>Consultez le programme hebdomadaire à votre arrivée : les événements peuvent changer selon les conditions météo !</p>
          </div>
        `
      },
      applicationsMobile: {
        title: 'Applications mobiles',
        content: `
          <h2>📱 Apps Tignes & Val d'Isère</h2>
          <p class="lead">Les applications indispensables pour votre séjour dans l'Espace Killy</p>
          
          <h3>📱 Applications officielles</h3>
          
          <h4>MyTignes</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Plan des pistes, webcam, météo, enneigement</li>
            <li><strong>Avantages:</strong> Officiel Tignes, très complet</li>
            <li><strong>Services:</strong> Achat forfait, réservation restaurants</li>
            <li><strong>Particularité:</strong> Notifications en temps réel</li>
            <li><strong>Idéal pour:</strong> Tignes et Espace Killy</li>
          </ul>
          
          <h4>Val d'Isère</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Plan domaines, webcam, état des pistes</li>
            <li><strong>Avantages:</strong> Officiel Val d'Isère, informations fiables</li>
            <li><strong>Services:</strong> Forfait digital, informations pratiques</li>
            <li><strong>Particularité:</strong> Guide restaurants et boutiques</li>
            <li><strong>Idéal pour:</strong> Val d'Isère et Espace Killy</li>
          </ul>
          
          <h3>🌨️ Météo et neige</h3>
          
          <h4>Snow-Forecast</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Prévisions neige ultra-précises, webcams</li>
            <li><strong>Avantages:</strong> Très précis en montagne, webcams en direct</li>
            <li><strong>Couverture:</strong> Toutes les stations de l'Espace Killy</li>
            <li><strong>Idéal pour:</strong> Choisir le meilleur jour pour skier</li>
          </ul>
          
          <h4>Météo France</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Prévisions détaillées, bulletins neige, radars</li>
            <li><strong>Avantages:</strong> Officiel, fiable, gratuit</li>
            <li><strong>Particularité:</strong> Alertes météo en temps réel</li>
            <li><strong>Idéal pour:</strong> Planification à court terme</li>
          </ul>
          
          <h3>🗺️ Cartes et navigation</h3>
          
          <h4>Geoportail</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Cartes IGN, localisation GPS, sécurité</li>
            <li><strong>Avantages:</strong> Indispensable pour hors-piste, gratuit</li>
            <li><strong>Particularité:</strong> Cartes topographiques détaillées</li>
            <li><strong>Idéal pour:</strong> Randonnées en montagne, sécurité</li>
          </ul>
          
          <h4>IGNrando</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Itinéraires, traces GPS, points d'intérêt</li>
            <li><strong>Avantages:</strong> Spécialisé randonnée, très complet</li>
            <li><strong>Particularité:</strong> Hors-ligne possible</li>
            <li><strong>Idéal pour:</strong> Randonneurs expérimentés</li>
          </ul>
          
          <h3>📲 Applications utiles</h3>
          
          <h4>WhatsApp</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Communication groupe, partage position</li>
            <li><strong>Avantages:</strong> Gratuit, universel, fonctionne hors réseau</li>
            <li><strong>Idéal pour:</strong> Coordonner avec votre groupe sur les pistes</li>
          </ul>
          
          <h4>Strava</h4>
          <ul>
            <li><strong>Fonctionnalités:</strong> Tracking GPS, statistiques, challenges</li>
            <li><strong>Avantages:</strong> Communauté sportive, motivation</li>
            <li><strong>Idéal pour:</strong> Sportifs, suivi performance</li>
          </ul>
          
          <div class="alert alert-info">
            <h4>💡 Conseil de pro</h4>
            <p>Combinez 2-3 applications : une officielle (MyTignes), une météo (Snow-Forecast) et une utilitaire (Geoportail) pour couvrir tous vos besoins !</p>
          </div>
        `
      },
      servicesPratiques: {
        title: 'Services pratiques',
        content: `
          <h2>🏢 Offices & Remontées</h2>
          <p class="lead">Accédez aux services essentiels de l'Espace Killy</p>
          
          <h3>🏢 Offices de tourisme</h3>
          
          <h4>Office de Tourisme de Tignes</h4>
          <ul>
            <li><strong>Adresse:</strong> Place du Curling, Val Claret</li>
            <li><strong>Téléphone:</strong> 04 79 06 44 44</li>
            <li><strong>Horaires:</strong> 8h30-12h30 / 14h30-18h30</li>
            <li><strong>Services:</strong> Informations, réservations, billets</li>
            <li><strong>Site:</strong> www.tignes.net</li>
            <li><strong>Email:</strong> info@tignes.net</li>
          </ul>
          
          <h4>Office de Tourisme de Val d'Isère</h4>
          <ul>
            <li><strong>Adresse:</strong> Avenue de la Face de Bellevarde</li>
            <li><strong>Téléphone:</strong> 04 79 06 44 44</li>
            <li><strong>Horaires:</strong> 8h30-12h30 / 14h30-18h30</li>
            <li><strong>Services:</strong> Informations, réservations, billets</li>
            <li><strong>Site:</strong> www.valdisere.com</li>
            <li><strong>Email:</strong> info@valdisere.com</li>
          </ul>
          
          <h3>🚡 Services des remontées</h3>
          
          <h4>Tignes Ski Lifts</h4>
          <ul>
            <li><strong>Téléphone:</strong> 04 79 06 42 22</li>
            <li><strong>Horaires:</strong> 8h00-18h00 (saison)</li>
            <li><strong>Services:</strong> Forfaits, informations, pannes</li>
            <li><strong>Site:</strong> www.tignes-ski.com</li>
            <li><strong>Particularité:</strong> Forfaits en ligne</li>
          </ul>
          
          <h4>Val d'Isère Ski Lifts</h4>
          <ul>
            <li><strong>Téléphone:</strong> 04 79 06 42 22</li>
            <li><strong>Horaires:</strong> 8h00-18h00 (saison)</li>
            <li><strong>Services:</strong> Forfaits, informations, pannes</li>
            <li><strong>Site:</strong> www.valdisere-ski.com</li>
            <li><strong>Particularité:</strong> Forfaits Espace Killy</li>
          </ul>
          
          <h3>💳 Achat de forfaits en ligne</h3>
          
          <h4>Sites officiels</h4>
          <ul>
            <li><strong>Tignes:</strong> www.tignes.net/forfaits</li>
            <li><strong>Val d'Isère:</strong> www.valdisere.com/forfaits</li>
            <li><strong>Espace Killy:</strong> www.espacekilly.com</li>
            <li><strong>Avantages:</strong> -10% réservation en ligne</li>
            <li><strong>Options:</strong> Assurance, casque, livraison</li>
          </ul>
          
          <h4>Types de forfaits</h4>
          <ul>
            <li><strong>Espace Killy:</strong> Toutes pistes Tignes + Val d'Isère</li>
            <li><strong>Tignes:</strong> Uniquement pistes Tignes</li>
            <li><strong>Val d'Isère:</strong> Uniquement pistes Val d'Isère</li>
            <li><strong>Durée:</strong> 1 jour, 6 jours, saison</li>
          </ul>
          
          <h3>📱 Informations remontées</h3>
          
          <h4>État des pistes</h4>
          <ul>
            <li><strong>Site:</strong> www.espacekilly.com/pistes</li>
            <li><strong>Mise à jour:</strong> Quotidienne 8h00</li>
            <li><strong>Informations:</strong> Ouvertures, fermetures, conditions</li>
            <li><strong>Webcams:</strong> 15 webcams en direct</li>
          </ul>
          
          <h4>Alertes et informations</h4>
          <ul>
            <li><strong>SMS:</strong> Inscription gratuite</li>
            <li><strong>Newsletter:</strong> Hebdomadaire</li>
            <li><strong>Applications:</strong> Notifications push</li>
            <li><strong>Réseaux sociaux:</strong> Facebook, Instagram, Twitter</li>
          </ul>
          
          <div class="alert alert-warning">
            <h4>⚠️ Important</h4>
            <p>Réservez vos forfaits en ligne pour économiser jusqu'à 15% et éviter les files d'attente aux caisses !</p>
          </div>
        `
      }
  };
    
    // Afficher l'article
    title.textContent = articles[articleType].title;
    content.innerHTML = articles[articleType].content;
    preview.classList.remove('hidden');
    
    // Scroll vers l'article
    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const hideArticle = () => {
    const preview = document.getElementById('article-preview');
    preview.classList.add('hidden');
  };

  // Suivre le hash pour marquer le lien actif dans la navigation
  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash || '#home')
      // Ferme le menu mobile lors de la navigation
      setIsMenuOpen(false)
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Ferme le menu mobile lors d'un clic en dehors
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu')
      const menuButton = event.target.closest('button[aria-controls="mobile-menu"]')
      
      if (mobileMenu && !mobileMenu.contains(event.target) && !menuButton) {
        setIsMenuOpen(false)
      }
    }

    // Ajoute un léger délai pour éviter la fermeture immédiate au clic sur le bouton
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])
  // Indisponibilités dynamiques chargées depuis /availability.json
  const [availability, setAvailability] = useState({ morningsBlocked: [], afternoonsBlocked: [] })
  useEffect(() => {
    let isMounted = true
    fetch(`${(import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'}availability.json`, { cache: 'no-cache' })
      .then((r) => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data) => {
        if (!isMounted) return
        const mornings = Array.isArray(data.morningsBlocked) ? data.morningsBlocked : []
        const afternoons = Array.isArray(data.afternoonsBlocked) ? data.afternoonsBlocked : []
        setAvailability({ morningsBlocked: mornings, afternoonsBlocked: afternoons })
      })
      .catch((e) => {
        console.error('Failed to load availability.json', e)
      })
    return () => { isMounted = false }
  }, [])

  const bookingUrl = 'https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend'

  // État pour gérer l'expansion des avis clients
  const [expandedReviews, setExpandedReviews] = useState({})

  // Fonction pour basculer l'expansion d'un avis
  const toggleReviewExpansion = (idx) => {
    setExpandedReviews(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  // Fonction pour déterminer si un avis est long
  const isLongReview = (text) => {
    return text.length > 200 // Seuil de caractères pour considérer un avis comme long
  }

  const isActive = (href) => !!href && href === currentHash
  
  // Fonction pour obtenir l'URL d'une image de la galerie
  const getCarouselImage = (index) => {
    return getGalleryImage(index);
  };

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  // Fonction pour revenir à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  // Défilement automatique (respecte prefers-reduced-motion)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const translations = {
    fr: {
      title: "Myriam Val d'Isère - Tignes - Les Arcs",
      subtitle: 'Votre solution professionnelle pour des vacances de rêves',
      nav: {
        home: 'Accueil',
        about: 'À propos',
        services: 'Services',
        blog: 'Blog',
        weather: 'Météo',
        avalanche: 'Avalanche',
        gallery: 'Galerie',
        booking: 'Réserver',
		    contact: 'contact',
        
      },
      hero: {
        title: 'Cours de ski et snowboard personnalisés à Tignes, Val d\'Isère & Les Arcs ❄️',
        description: 'Monitrice diplômée et expérimentée, je propose des cours privés de ski et snowboard à Tignes, Val d\'Isère et Les Arcs, adaptés à tous les niveaux.',
        cta: 'Réserver vos cours'
      },
      about: {
        title: 'À propos de Myriam',
        description: "Je m'appelle **Myriam Metenier**, née à **Lyon** et installée en **Tarentaise depuis plus de 32 ans**. La montagne n'est pas seulement mon cadre de vie : c'est mon terrain d'expression, d'apprentissage et de transmission.\n\nReconnue pour mon **expertise**, ma **pédagogie** et mon **attachement profond au milieu montagnard**, j'enseigne le **ski alpin** et le **snowboard** aux enfants comme aux adultes. J'accompagne chacun avec une approche personnalisée, adaptée au niveau, aux objectifs et à la sensibilité de chaque pratiquant. Au fil des années, j'ai guidé de nombreux groupes sur des terrains variés, en transmettant aussi bien les techniques avancées que les principes essentiels de sécurité en montagne.\n\nTrès tôt, le sport a façonné mon parcours. Élevée dans la **pratique du sport de haut niveau**, j'ai évolué en **course à pied – demi-fond**, avec un **record de France à l'âge de 15 ans**. Le dépassement de soi a toujours été une valeur centrale dans ma vie, mais dans une approche plus **philosophique que compétitive** : se dépasser, oui, mais avant tout face à soi-même. Et ce dépassement prend encore plus de sens lorsque je peux **aider les autres à s'élever à travers leurs propres performances**.\n\nAprès un **baccalauréat en chimie**, le besoin viscéral d'être au plus proche de la montagne m'a conduite à m'installer définitivement en Tarentaise. J'y ai obtenu le **Diplôme d'État de ski alpin**, après avoir débuté comme **animatrice dès l'âge de 16 ans**, puis enseigné le ski et le snowboard avec passion et engagement.\n\nParallèlement à ma vie sportive et pédagogique, j'ai construit un parcours solide dans les **nouvelles technologies**. Titulaire d'un **BTS Services Informatiques aux Organisations – option SLAM (Solutions Logicielles et Applications Métiers)**, j'ai trouvé un équilibre précieux entre le besoin d'être active sur le terrain et celui de réfléchir, structurer et analyser. Cette dynamique m'a naturellement menée vers une **Maîtrise d'Administrateur Infrastructure et Cloud**.\n\nAujourd'hui, j'ai la chance de pouvoir **concilier mes deux passions** : les **technologies numériques** et mon **amour de la glisse**, en particulier de la neige. Curieuse et en constante évolution, je poursuis activement ma montée en compétences dans les domaines de la **cybersécurité** et de l'**intelligence artificielle**.\n\nEn parallèle, je m'intéresse profondément à tout ce qui permet une **meilleure connaissance de soi**. Cette quête m'a conduite à obtenir un **diplôme en naturopathie** ainsi qu'en **psychanalyse**, enrichissant ma compréhension de l'humain, de ses mécanismes et de son potentiel.\n\n### Ce vers quoi je tends\n\nLa **complémentarité de ces deux univers** – la montagne et la technologie, le corps et l'esprit, l'action et la réflexion – est aujourd'hui au cœur de mon épanouissement. Elle me permet de tendre vers une posture à la fois **humaine et structurée**, en restant **humble**, **observatrice**, **empathique** et **ouverte d'esprit**, tout en étant **critique**, **concentrée**, **pragmatique**, **organisée**, **réaliste**, **objective** et **stable**.\n\nC'est dans cet équilibre que je continue d'avancer, d'apprendre et de transmettre.",
        experience: 'Années d\'expérience',
        projects: 'Hors-pistes',
        clients: 'Clients satisfaits'
      },
      services: {
        title: 'Mes Services',
        web: {
          title: 'Cours de Ski',
          description: 'À Tignes et Val d\'Isère, des cours adaptés à chaque profil :\n\n• Débutant : apprendre les bases en confiance\n• Intermédiaire : améliorer technique et fluidité\n• Avancé : perfectionnement et pistes rouges/noires\n\nUn suivi individuel pour une progression personnalisée.'
        },
        mobile: {
          title: 'Cours de Snowboard',
          description: 'Pour tous les niveaux :\n\n• Initiation : équilibre et premières descentes\n• Perfectionnement : virages frontside/backside, carving\n• Freestyle & hors-piste\n\nSelon conditions et niveaux, pour une expérience sécurisée.'
        },
        design: {
          title: 'Hors-piste',
          description: 'Exploration sécurisée du domaine hors des pistes balisées.\n\n• Découverte du hors-piste encadrée\n• Apprentissage des techniques spécifiques\n• Sécurité et lecture du terrain\n\nMatériel de sécurité recommandé.'
        }
      },
      contact: {
        title: 'Contactez-moi',
        description: 'Prêt à démarrer vos vacances ? Contactez-moi dès aujourd\'hui.',
        email: 'meteniermyriam@yahoo.fr',
        phone: '+33 7 68 10 61 07',
        address: "Val d'Isère, France"
      }
    },
    en: {
      title: "Myriam Val d'Isère - Tignes - Les Arcs",
      subtitle: 'Your professional solution for dream holidays',
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        blog: 'Blog',
        weather: 'Weather',
        avalanche: 'Avalanche',
        gallery: 'Gallery',
        booking: 'Book',
		    contact: 'Contact',
        
      },
      hero: {
        title: 'Private ski and snowboard lessons in Val d\'Isère 🏔️',
        description: 'Enjoy private lessons in Val d\'Isère, in the heart of one of the most beautiful ski areas in the Alps. Whether you want to learn the basics, perfect your technique, or explore new sensations, I\'ll guide you on the legendary slopes of the Espace Killy with personalized and supportive instruction ❄️✨.',
        cta: 'Book your lessons'
      },
      about: {
        title: 'About Me',
        description: 'Recognized for my expertise, teaching skills, and attraction to the mountain environment.\n\nI teach children and adults the basics of alpine skiing and snowboarding. I combine teaching skills and a personalized approach to adapt to everyone\'s needs.\n\nOver the years, I have guided groups of practitioners on various terrains while teaching advanced skiing techniques and safety principles.',
        experience: 'Years of experience',
        projects: 'Projects completed',
        clients: 'Satisfied clients'
      },
      services: {
        title: 'Our Services',
        web: {
          title: 'Ski Lessons',
          description: 'Learning alpine skiing for all levels'
        },
        mobile: {
          title: 'Snowboard Lessons',
          description: 'Snowboard initiation and improvement'
        },
        design: {
          title: 'Off-piste',
          description: 'Safe off-piste outings'
        }
      },
      contact: {
        title: 'Contact Me',
        description: 'Ready to start your holidays? Contact me today.',
        email: 'meteniermyriam@yahoo.fr',
        phone: '+33 7 68 10 61 07',
        address: 'Val d\'Isère, France'
      }
    }
  }

  const t = translations[currentLang]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  // Ferme le menu mobile lorsqu'un lien est cliqué
  const closeMenu = () => setIsMenuOpen(false)
  
  // Gère le clic sur les liens de navigation mobile
  const handleNavClick = (e) => {
    // Ferme le menu après un court délai pour permettre la navigation
    setTimeout(() => {
      closeMenu()
    }, 100)
  }

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('Début de la récupération des données météo...');
      try {
        const endpoints = [
          {
            key: 'tignes',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.468&longitude=6.909&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
          },
          {
            key: 'val',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.448&longitude=6.980&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
          },
          {
            key: 'arcs',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.562&longitude=6.775&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
          }
        ];
        
        const responses = await Promise.all(
          endpoints.map(e => 
            fetch(e.url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status} pour ${e.key}`);
                }
                return response.json();
              })
              .then(data => {
                console.log(`Données reçues pour ${e.key}:`, data);
                return { key: e.key, data };
              })
              .catch(error => {
                console.error(`Erreur lors de la récupération des données pour ${e.key}:`, error);
                return { key: e.key, error: error.message };
              })
          )
        );

        // Créer un objet avec les données ou les erreurs
        const weatherData = responses.reduce((acc, { key, data, error }) => {
          if (error) {
            console.error(`Erreur pour ${key}:`, error);
            acc[key] = { error };
          } else {
            acc[key] = data;
          }
          return acc;
        }, {});

        console.log('Données météo mises à jour:', weatherData);
        setWeather(weatherData);
        
      } catch (e) {
        console.error('Erreur lors de la récupération des données météo:', e);
        // Mettre à jour l'état avec l'erreur pour l'affichage
        setWeather({
          tignes: { error: 'Impossible de charger les données météo pour Tignes' },
          val: { error: 'Impossible de charger les données météo pour Val d\'Isère' }
        });
      }
    };

    // Appel initial
    fetchWeather();
    
    // Rafraîchir les données toutes les heures (3600000 ms)
    const intervalId = setInterval(fetchWeather, 3600000);
    
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [])

  const getWeatherIcon = (weatherCode) => {
    // Map des codes météo vers les icônes Lucide
    const iconMap = {
      0: Sun,        // Ciel dégagé
      1: CloudSun,   // Légèrement nuageux
      2: CloudSun,   // Partiellement nuageux
      3: Cloudy,     // Couvert
      45: CloudFog,  // Brouillard
      48: CloudFog,  // Brouillard givrant
      51: CloudRain, // Légère bruine
      53: CloudRain, // Bruine modérée
      55: CloudRain, // Forte bruine
      56: CloudHail, // Légère bruine verglaçante
      57: CloudHail, // Forte bruine verglaçante
      61: CloudRain, // Légère pluie
      63: CloudRain, // Pluie modérée
      65: CloudRain, // Forte pluie
      66: CloudHail, // Légère pluie verglaçante
      67: CloudHail, // Forte pluie verglaçante
      71: CloudSnow, // Légère neige
      73: CloudSnow, // Neige modérée
      75: CloudSnow, // Forte neige
      77: Snowflake, // Neige en grains
      80: CloudRain, // Légères averses
      81: CloudRain, // Averses modérées
      82: CloudRain, // Fortes averses
      85: CloudSnow, // Légères averses de neige
      86: CloudSnow, // Fortes averses de neige
      95: CloudLightning, // Orage
      96: CloudLightning, // Orage avec grêle légère
      99: CloudLightning  // Orage avec forte grêle
    };
    
    const IconComponent = iconMap[weatherCode] || CloudSun;
    return <IconComponent className="h-6 w-6 text-blue-500" />;
  };

  const renderForecast = (data, location = 'inconnu') => {
    // Vérification plus robuste des données manquantes
    if (!data || data.error || !data.daily) {
      console.log('No weather data available for', location, data?.error || 'No data');
      return (
        <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
          {data?.error || 'Chargement des données météo…'}
        </div>
      );
    }
    
    // Vérification des données quotidiennes
    const days = Array.isArray(data.daily?.time) ? data.daily.time : [];
    if (days.length === 0) {
      return (
        <div className="text-gray-500 p-4 bg-yellow-50 rounded-lg">
          Aucune donnée météo disponible pour le moment
        </div>
      );
    }
    
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          {location === 'tignes' ? (
            <Mountain className="h-5 w-5 mr-2 text-blue-600" />
          ) : location === 'val' ? (
            <Compass className="h-5 w-5 mr-2 text-indigo-600" />
          ) : (
            <MapPin className="h-5 w-5 mr-2 text-purple-600" />
          )}
          {location === 'tignes' ? 'Tignes' : location === 'val' ? "Val d'Isère" : "Les Arcs"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {days.map((d, i) => {
            const tempMin = Math.round(data.daily.temperature_2m_min?.[i] || 0);
            const tempMax = Math.round(data.daily.temperature_2m_max?.[i] || 0);
            const snow = Math.round((data.daily.snowfall_sum?.[i] || 0));
            const precip = Math.round((data.daily.precipitation_sum?.[i] || 0));
            const weatherCode = data.daily.weather_code?.[i] || 0;
            
            return (
              <div key={d} className="bg-white/90 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short' })}
                </div>
                <div className="flex justify-center my-2">
                  {getWeatherIcon(weatherCode)}
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-bold text-blue-600">{tempMax}°</span>
                  <span className="text-gray-500 text-sm">{tempMin}°</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Snowflake className="h-3 w-3 mr-1 text-blue-400" />
                    {snow}cm
                  </span>
                  <span className="flex items-center">
                    <CloudRain className="h-3 w-3 mr-1 text-blue-400" />
                    {precip}mm
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Lien d'accès rapide au contenu principal */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] bg-blue-600 text-white px-3 py-2 rounded shadow"
      >
        Aller au contenu
      </a>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img src={Logo} alt="Tignes logo" className="h-16 w-16 object-contain" decoding="async" fetchpriority="high" loading="eager" />
                <span className="ml-3 text-xl font-bold text-gray-900 whitespace-nowrap">
                  <span className="block text-sm font-normal text-gray-500 leading-none">Myriam</span>
                  <span>Val d'Isère - Tignes - Les Arcs</span>
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center" role="navigation" aria-label="Navigation principale">
              {/* Premier groupe : Accueil avec sous-menu (A propos, Galerie) */}
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.home}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#home" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <Snowflake className="h-4 w-4 text-blue-600" />
                    <span>Accueil</span>
                  </a>
                  <div className="my-1 border-t border-gray-100" />
                  <a href="#about" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md" aria-current={isActive('#about') ? 'page' : undefined}>
                    <Info className="h-4 w-4 text-gray-600" />
                    <span>{t.nav.about}</span>
                  </a>
                  <a href="#gallery" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md" aria-current={isActive('#gallery') ? 'page' : undefined}>
                    <Image className="h-4 w-4 text-gray-600" />
                    <span>{t.nav.gallery}</span>
                  </a>
                </div>
              </div>
              
              {/* Deuxième groupe : Réserver/Services */}
              <a href="#booking" className={`nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#booking') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#booking') ? 'page' : undefined}>
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.booking}
              </a>
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.services}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#services" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span>Tous les services</span>
                  </a>
                  <a href="#blog" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <BookOpen className="h-4 w-4 text-gray-600" />
                    <span>{t.nav.blog}</span>
                  </a>
                  <div className="my-1 border-t border-gray-100" />
                  <a href="#weather" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <CloudSun className="h-4 w-4 text-blue-600" />
                    <span>Prévisions météo</span>
                  </a>
                  <a href="#avalanche" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <ShieldAlert className="h-4 w-4 text-red-600" />
                    <span>{t.nav.avalanche}</span>
                  </a>
                </div>
              </div>
              
              {/* Contact */}
              <a href="#contact" className={`nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#contact') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#contact') ? 'page' : undefined}>
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.contact}
              </a>
            </nav>

            {/* Language and Assistant */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                {/* Assistant RAG */}
                <Button
                  onClick={() => setIsRAGOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <Bot className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">Assistant IA</span>
                  <Sparkles className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="border-l border-gray-200 h-6"></div>
              
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                aria-label={currentLang === 'fr' ? 'Choisir la langue' : 'Choose language'}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? (currentLang === 'fr' ? 'Fermer le menu' : 'Close menu') : (currentLang === 'fr' ? 'Ouvrir le menu' : 'Open menu')}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div id="mobile-menu" className="md:hidden py-2 border-t border-gray-200">
              <nav className="flex flex-col space-y-1" role="navigation" aria-label="Navigation mobile">
                {/* Premier groupe : Accueil avec sous-menu (A propos, Galerie) */}
                <div>
                  <button className="py-3 px-4 nav-link flex items-center w-full text-left">
                    <Snowflake className="h-4 w-4 mr-2" />
                    {t.nav.home}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </button>
                  <div className="pl-8 pr-4">
                    <a href="#home" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Snowflake className="h-4 w-4 text-blue-600" />
                      <span>Accueil</span>
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    <a href="#about" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Info className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.about}</span>
                    </a>
                    <a href="#gallery" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Image className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.gallery}</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Deuxième groupe : Réserver/Services */}
                <a href="#booking" onClick={handleNavClick} className={`py-3 px-4 nav-link flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#booking') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#booking') ? 'page' : undefined}>
                  <Snowflake className="h-4 w-4 mr-2" />
                  {t.nav.booking}
                </a>
                <div>
                  <button className="py-3 px-4 nav-link flex items-center w-full text-left">
                    <Snowflake className="h-4 w-4 mr-2" />
                    {t.nav.services}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </button>
                  <div className="pl-8 pr-4">
                    <a href="#services" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span>Tous les services</span>
                    </a>
                    <a href="#blog" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.blog}</span>
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    <a href="#weather" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <CloudSun className="h-4 w-4 text-blue-600" />
                      <span>Prévisions météo</span>
                    </a>
                    <a href="#avalanche" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      <span>{t.nav.avalanche}</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Troisième groupe supprimé: météo/avalanche déplacés sous Services */}
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Contact */}
                <a href="#contact" onClick={handleNavClick} className={`py-3 px-4 nav-link flex items-center ${isActive('#contact') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#contact') ? 'page' : undefined}>
                  <Snowflake className="h-4 w-4 mr-2" />
                  {t.nav.contact}
                </a>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Assistant IA */}
                <button 
                  onClick={() => {
                    setIsRAGOpen(true)
                    closeMenu()
                  }}
                  className="py-3 px-4 nav-link flex items-center w-full text-left"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Assistant IA
                  <Sparkles className="h-3 w-3 ml-auto" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" role="main" tabIndex={-1} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              {t.hero.description}
              {currentLang === 'fr' && ' Débutant, intermédiaire ou confirmé, chaque séance est conçue selon vos objectifs, votre rythme et votre expérience, pour une progression rapide et en toute sécurité ⛷️🏂.'}
              {currentLang === 'en' && ' My ski and snowboard lessons in Tignes – Val d\'Isère are suitable for beginners as well as experienced skiers and riders looking to improve their performance 🏂🔥. The goal: to progress effectively, gain confidence, and above all, have fun on the snow 😄.'}
            </p>
            <a href="#booking" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                {t.hero.cta}
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {currentLang === 'fr' && (
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Mountain className="h-6 w-6 text-blue-600" />
                    Cours particuliers dans l'Espace Killy 🏔️
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700">
                    Profitez de cours particuliers dans l'Espace Killy, le plus beau domaine skiable du monde ! Que vous souhaitiez apprendre les bases à Tignes, perfectionner votre technique à Val d'Isère, ou explorer de nouvelles sensations, je vous accompagne sur les pistes mythiques de Tignes et Val d'Isère avec un suivi personnalisé et bienveillant ❄️✨.
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            {currentLang === 'en' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Mountain className="h-6 w-6 text-blue-600" />
                    Private lessons in the Espace Killy 🏔️
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700">
                    Enjoy private lessons in the Espace Killy, the most beautiful ski area in the world! Whether you want to learn the basics in Tignes, perfect your technique in Val d'Isère, or explore new sensations, I will accompany you on the legendary slopes of Tignes and Val d'Isère with personalized and supportive guidance ❄️✨.
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            {currentLang === 'fr' && (
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Snowflake className="h-6 w-6 text-emerald-600" />
                    Cours de ski et snowboard dans Paradiski ⛷️
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700">
                    Découvrez mes cours de ski et snowboard dans le domaine Paradiski ! Que vous soyez débutant ou expert, mes cours aux Arcs et La Plagne vous permettent de progresser efficacement. L'objectif : gagner en confiance, maîtriser les pistes et surtout prendre du plaisir sur la neige dans ce domaine exceptionnel 😄.
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            {currentLang === 'en' && (
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Snowflake className="h-6 w-6 text-emerald-600" />
                    Ski and snowboard lessons in Paradiski ⛷️
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700">
                    Discover my ski and snowboard lessons in the Paradiski area! Whether you're a beginner or an expert, my lessons in Les Arcs and La Plagne will help you progress effectively. The goal: to gain confidence, master the slopes, and above all, have fun on the snow in this exceptional area 😄.
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-12">
            {currentLang === 'fr' && (
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 justify-center">
                  <Star className="h-6 w-6 text-amber-600" />
                  Pourquoi choisir un cours privé à Tignes – Val d'Isère – Les Arcs ? ⭐
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Cours particuliers 100 % personnalisés</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Monitrice diplômée et passionnée</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Progression rapide et encadrement sécurisé</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Découverte des plus beaux secteurs de Tignes Le Lac, Val Claret, Val d'Isère et Les Arcs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Flexibilité des horaires et du lieu de rendez-vous 📍</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentLang === 'en' && (
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 justify-center">
                  <Star className="h-6 w-6 text-amber-600" />
                  Why choose a private lesson in Tignes – Val d'Isère – Les Arcs? ⭐
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">100% personalized private lessons</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Qualified and passionate instructor</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Fast progress and safe supervision</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Discover the most beautiful areas of Tignes Le Lac, Val Claret, Val d'Isère, and Les Arcs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Flexible schedule and meeting point 📍</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {currentLang === 'fr' && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              À propos de Myriam 🏔️⛷️💻
            </h2>
          )}

          {currentLang === 'en' && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              About Myriam 🏔️⛷️💻
            </h2>
          )}

          {currentLang === 'fr' && (
            <div className="text-lg text-gray-700 max-w-4xl mx-auto">
              <div className="space-y-6 text-left">
                <p>
                  Je m'appelle <strong>Myriam Metenier</strong>, née à <strong>Lyon</strong> et installée en <strong>Tarentaise depuis plus de 32 ans</strong>. La montagne n'est pas seulement mon cadre de vie : c'est mon terrain d'expression, d'apprentissage et de transmission 🌲❄️.
                </p>
                <p>
                  Reconnue pour mon <strong>expertise</strong>, ma <strong>pédagogie</strong> et mon <strong>attachement profond au milieu montagnard</strong>, j'enseigne le <strong>ski alpin</strong> et le <strong>snowboard</strong> aux enfants comme aux adultes ⛷️🏂. J'accompagne chacun avec une approche personnalisée, adaptée au niveau, aux objectifs et à la sensibilité de chaque pratiquant. Au fil des années, j'ai guidé de nombreux groupes sur des terrains variés, en transmettant aussi bien les techniques avancées que les principes essentiels de sécurité en montagne 🛡️🏔️.
                </p>
                <p>
                  Très tôt, le sport a façonné mon parcours. Élevée dans la <strong>pratique du sport de haut niveau</strong>, j'ai évolué en <strong>course à pied – demi-fond</strong>, avec un <strong>record de France à 15 ans</strong> 🏃‍♀️🔥. Le dépassement de soi a toujours été une valeur centrale pour moi : se dépasser, oui, mais avant tout face à soi-même 💪. Et ce dépassement prend encore plus de sens lorsque je peux aider les autres à s'élever à travers leurs propres performances 🌟.
                </p>
                <p>
                  Après un <strong>baccalauréat en chimie</strong>, le besoin viscéral d'être proche de la montagne m'a conduite à m'installer définitivement en Tarentaise 🏔️. J'y ai obtenu le <strong>Diplôme d'État de ski alpin</strong>, après avoir débuté comme <strong>animatrice dès l'âge de 16 ans</strong>, puis enseigné le ski et le snowboard avec passion et engagement ⛷️🏂❤️.
                </p>
                <p>
                  Parallèlement, j'ai construit un parcours solide dans les <strong>nouvelles technologies</strong> 💻. Titulaire d'un <strong>BTS Services Informatiques aux Organisations – option SLAM</strong>, j'ai trouvé un équilibre précieux entre le besoin d'être active sur le terrain et celui de réfléchir, structurer et analyser 🧠. Cette dynamique m'a naturellement menée vers une <strong>Maîtrise d'Administrateur Infrastructure et Cloud</strong> ☁️.
                </p>
                <p>
                  Aujourd'hui, j'ai la chance de pouvoir concilier mes deux passions : les <strong>technologies numériques</strong> et mon <strong>amour de la glisse</strong> ❄️. Curieuse et en constante évolution, je poursuis activement mes compétences dans la <strong>cybersécurité</strong> 🔒 et l'<strong>intelligence artificielle</strong> 🤖.
                </p>
                <p>
                  En parallèle, je m'intéresse profondément à tout ce qui permet une <strong>meilleure connaissance de soi</strong> 🌿. Cette quête m'a conduite à obtenir des diplômes en <strong>naturopathie</strong> 🌱 et en <strong>psychanalyse</strong> 🧠, enrichissant ma compréhension de l'humain, de ses mécanismes et de son potentiel.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">🌟 Ce vers quoi je tends</h3>
                  <p>
                    La <strong>complémentarité de ces deux univers</strong> — la montagne et la technologie, le corps et l'esprit, l'action et la réflexion — est aujourd'hui au cœur de mon épanouissement ⚖️.
                  </p>
                  <p className="mt-4">
                    En tant que <strong>monitrice de ski</strong>, cet équilibre guide ma manière d'enseigner, d'accompagner et de transmettre.
                  </p>
                  <p className="mt-4">
                    Il me permet d'adopter une posture à la fois <strong>humaine et structurée</strong> : rester <strong>présente</strong>, <strong>observatrice</strong> et <strong>empathique</strong> 💛, tout en étant <strong>exigeante</strong>, <strong>concentrée</strong>, <strong>pragmatique</strong> et <strong>organisée</strong> 🎯. Sur les skis comme en dehors, j'avance avec attention, en m'adaptant à chacun et à chaque situation.
                  </p>
                  <p className="mt-4 italic text-gray-600">
                    C'est dans cette alliance entre sensibilité et rigueur que je continue de progresser, d'apprendre et de transmettre, au rythme de la montagne 🏔️✨
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentLang === 'en' && (
            <div className="text-lg text-gray-700 max-w-4xl mx-auto">
              <div className="space-y-6 text-left">
                <p>
                  My name is <strong>Myriam Metenier</strong>, born in Lyon and living in the Tarentaise region for over 32 years. The mountains aren't just my home: they're my playground for expression, learning, and sharing 🌲❄️.
                </p>
                <p>
                  Known for my expertise, teaching skills, and deep connection to the mountains, I teach alpine skiing and snowboarding to children and adults alike ⛷️🏂. I guide each student with a personalized approach, tailored to their level, goals, and individual needs. Over the years, I've led numerous groups on diverse terrain, sharing both advanced techniques and essential mountain safety principles 🛡️🏔️.
                </p>
                <p>
                  From a very young age, sport shaped my path. Raised in a world of high-level sports, I developed my skills in middle-distance running, achieving a French record at 15 🏃‍♀️🔥. Pushing my limits has always been a core value for me: surpassing myself, yes, but above all, pushing my own boundaries 💪. And this sense of accomplishment takes on even greater meaning when I can help others reach their full potential through their own achievements 🌟.
                </p>
                <p>
                  After graduating high school with a degree in chemistry, a deep-seated need to be close to the mountains led me to settle permanently in the Tarentaise Valley 🏔️. There, I earned my State Diploma in Alpine Skiing, having started as an instructor at the age of 16, and then teaching skiing and snowboarding with passion and dedication ⛷️🏂❤️.
                </p>
                <p>
                  In parallel, I built a solid career in new technologies 💻. Holding a BTS (Advanced Vocational Diploma) in IT Services for Organizations – specializing in SLAM (Software Solutions and Applications), I found a valuable balance between the need to be hands-on and the need to reflect, structure, and analyze 🧠. This dynamic naturally led me to a Master's degree in Infrastructure and Cloud Administration ☁️.
                </p>
                <p>
                  Today, I am fortunate to be able to combine my two passions: digital technologies and my love of board sports ❄️. Curious and constantly evolving, I am actively developing my skills in cybersecurity 🔒 and artificial intelligence 🤖.
                </p>
                <p>
                  At the same time, I am deeply interested in anything that fosters greater self-awareness 🌿. This quest led me to obtain degrees in naturopathy 🌱 and psychoanalysis 🧠, enriching my understanding of human nature, its mechanisms, and its potential.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">🌟 What I strive for</h3>
                  <p>
                    The complementarity of these two worlds—the mountains and technology, body and mind, action and reflection—is now at the heart of my fulfillment ⚖️.
                  </p>
                  <p className="mt-4">
                    As a ski instructor, this balance guides my teaching, mentoring, and sharing knowledge.
                  </p>
                  <p className="mt-4">
                    It allows me to adopt an approach that is both human and structured: remaining present, observant, and empathetic 💛, while also being demanding, focused, pragmatic, and organized 🎯. On and off the slopes, I move forward attentively, adapting to each individual and each situation.
                  </p>
                  <p className="mt-4 italic text-gray-600">
                    It is in this blend of sensitivity and rigor that I continue to progress, learn, and share my knowledge, in harmony with the rhythm of the mountains 🏔️✨
                  </p>
                </div>
              </div>
            </div>
          )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">{t.about.experience}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">{t.about.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4 500+</div>
              <div className="text-gray-600">{t.about.clients}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.services.title}
            </h2>
          </div>
          
          {/* Cours de Ski */}
          <div className="mb-16">
            {currentLang === 'fr' && (
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Mountain className="h-7 w-7 text-blue-600" />
                Cours de Ski ⛷️❄️
              </h3>
              <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                Découvrez le plaisir du ski alpin ⛷️❄️ avec des cours adaptés à tous les niveaux, du débutant au skieur confirmé !
              </p>
            </div>
          )}

          {currentLang === 'en' && (
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Mountain className="h-7 w-7 text-blue-600" />
                Ski Lessons ⛷️❄️
              </h3>
              <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                Discover the joy of alpine skiing ⛷️❄️ with lessons adapted to all levels, from beginner to advanced skier!
              </p>
            </div>
          )}

          {currentLang === 'fr' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    🌱 Débutants
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les skieurs qui découvrent le ski alpin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🎿</span>
                      <span>Découverte et réglage du matériel (chaussures, skis, bâtons)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚖️</span>
                      <span>Position de base et équilibre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🛷</span>
                      <span>Glisse en ligne droite et premières sensations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>↩️</span>
                      <span>Techniques de freinage (chasse-neige) ⛔ et premiers virages</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-green-700">
                      🎯 Objectif : acquérir les bases du ski, gagner en confiance et descendre des pentes douces en toute sécurité 🛡️.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    ⛷️ Intermédiaires
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour ceux qui souhaitent améliorer leur technique.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🔄</span>
                      <span>Virages en parallèle et enchaînement fluide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🏁</span>
                      <span>Meilleur contrôle de la vitesse et de la trajectoire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🎯</span>
                      <span>Travail de l'équilibre et des appuis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✨</span>
                      <span>Introduction au carving sur pistes bleues et rouges</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-700">
                      🎯 Objectif : skier avec aisance sur des pentes plus soutenues et gagner en précision et en fluidité ⛷️💨.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    🔥 Avancé
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les skieurs confirmés souhaitant se perfectionner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⚡</span>
                      <span>Carving avancé et virages coupés à haute vitesse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🖤</span>
                      <span>Techniques sur pistes rouges et noires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🤸‍♂️</span>
                      <span>Initiation au freestyle (modules, sauts simples)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Bases du hors-piste et sécurité en montagne ❄️</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-orange-700">
                      🎯 Objectif : maîtriser une technique avancée, repousser ses limites et profiter pleinement du ski alpin dans toutes les conditions 🌟.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentLang === 'en' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    🌱 Beginners
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    For skiers new to alpine skiing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">You will learn:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🎿</span>
                      <span>Equipment setup and adjustment (boots, skis, poles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚖️</span>
                      <span>Basic stance and balance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🛷</span>
                      <span>Straight skiing and first sensations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>↩️</span>
                      <span>Snowploughing techniques ⛔ and first turns</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-green-700">
                      🎯 Goal: to acquire the basics of skiing, gain confidence, and ski down gentle slopes safely 🛡️.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    ⛷️ Intermediate
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    For those who want to improve their technique.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🔄</span>
                      <span>Parallel turns and smooth transitions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🏁</span>
                      <span>Improved speed and trajectory control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🎯</span>
                      <span>Balance and weight distribution training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✨</span>
                      <span>Introduction to carving on blue and red runs</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-700">
                      🎯 Objective: Ski with ease on steeper slopes and gain precision and fluidity ⛷️💨.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    🔥 Advanced
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    For experienced skiers looking to refine their skills.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⚡</span>
                      <span>Advanced carving and high-speed turns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🖤</span>
                      <span>Techniques on red and black runs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🤸‍♂️</span>
                      <span>Introduction to freestyle (features, simple jumps)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Off-piste basics and mountain safety ❄️</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-orange-700">
                      🎯 Objective: Master an advanced technique, push your limits, and fully enjoy alpine skiing in all conditions 🌟.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          </div>

          {/* Ski Hors-Piste */}
          <div className="mb-16">
            {currentLang === 'fr' && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  <Mountain className="h-7 w-7 text-blue-600" />
                  Ski Hors-Piste ⛷️🏔️
                </h3>
                <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                  Explorez les montagnes 🏔️ et découvrez les sensations uniques du ski hors-piste ❄️⛷️ avec mes cours adaptés à tous les niveaux. Que vous soyez débutant en hors-piste 🌱 ou skieur expérimenté 🔥 cherchant à perfectionner votre technique, je vous accompagne avec sérieux et bienveillance, en toute sécurité 🛡️.
                </p>
              </div>
            )}

            {currentLang === 'en' && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  <Mountain className="h-7 w-7 text-blue-600" />
                  Off-Piste Skiing ⛷️🏔️
                </h3>
                <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                  Explore the mountains 🏔️ and discover the unique sensations of off-piste skiing ❄️⛷️ with my lessons tailored to all levels. Whether you're a beginner in off-piste 🌱 or an experienced skier 🔥 looking to refine your technique, I'll guide you with professionalism and care, ensuring your safety 🛡️.
                </p>
              </div>
            )}

            {currentLang === 'fr' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700">
                      🌨️ Découverte du ski hors-piste
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Idéal pour les skieurs expérimentés sur piste 🎿 souhaitant découvrir le hors-piste en douceur.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🎒</span>
                        <span>Introduction à l'équipement (skis, DVA 📡, pelle, sonde)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Techniques de base (positions, virages)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Lecture du terrain et choix des lignes de descente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Premiers principes de sécurité avalanche ❄️</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-emerald-700">
                        🎯 Objectif : acquérir les bases nécessaires pour skier en toute sécurité en hors-piste et explorer des terrains faciles à modérés en confiance.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      ❄️ Perfectionnement hors-piste
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Pour les skieurs ayant déjà une première expérience du hors-piste.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Ce cours vise à :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Techniques avancées (virages serrés, contrôle de la vitesse)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🌲</span>
                        <span>Navigation en terrain varié (poudreuse, neige croûtée, forêts)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>📡</span>
                        <span>Utilisation avancée du DVA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Gestion des risques et choix des lignes de descente</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-blue-700">
                        🎯 Objectif : gagner en confiance et en compétence sur des terrains intermédiaires à difficiles, tout en renforçant les bonnes pratiques de sécurité.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      🏔️ Hors-piste expert / engagement
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Destiné aux skieurs confirmés 💪 pour des terrains exigeants.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛰️</span>
                        <span>Ski en pente raide et couloirs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>❄️</span>
                        <span>Gestion des conditions de neige difficiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🚑</span>
                        <span>Techniques de secours en avalanche</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Planification d'itinéraires et prise de décision en haute montagne</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-red-700">
                        🎯 Objectif : devenir un skieur hors-piste autonome et compétent, capable d'évoluer sur des terrains complexes en toute sécurité.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentLang === 'en' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700">
                      🌨️ Discover Off-Piste Skiing
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Ideal for experienced on-piste skiers 🎿 who want to gently discover off-piste skiing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">You will learn:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🎒</span>
                        <span>Introduction to equipment (skis, avalanche transceiver 📡, shovel, probe)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Basic techniques (stances, turns)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Reading the terrain and choosing descent lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Basic avalanche safety principles ❄️</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-emerald-700">
                        🎯 Objective: to acquire the necessary skills to ski safely off-piste and confidently explore easy to moderate terrain.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      ❄️ Advanced Off-Piste Skiing
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For skiers with some prior off-piste experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">This course aims to:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Advanced techniques (tight turns, speed control)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🌲</span>
                        <span>Navigation in varied terrain (powder, crusty snow, forests)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>📡</span>
                        <span>Advanced use of avalanche transceivers (DVA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Risk management and route selection</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-blue-700">
                        🎯 Objective: to gain confidence and skill on intermediate to difficult terrain, while reinforcing good safety practices.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      🏔️ Expert off-piste / commitment
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Designed for advanced skiers 💪 for challenging terrain.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛰️</span>
                        <span>Skiing on steep slopes and couloirs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>❄️</span>
                        <span>Managing difficult snow conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🚑</span>
                        <span>Avalanche rescue techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Route planning and decision-making in high mountain environments</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-red-700">
                        🎯 Objective: to become a self-reliant and competent off-piste skier, capable of navigating complex terrain safely.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Snowboard Hors-Piste */}
          <div className="mb-16">
            {currentLang === 'fr' && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  <Snowflake className="h-7 w-7 text-purple-600" />
                  Snowboard Hors-Piste 🏂🏔️
                </h3>
                <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                  Plongez dans l'aventure 🏔️ et découvrez la liberté du snowboard hors-piste ❄️🏂 avec mes cours adaptés à tous les niveaux. Que vous soyez débutant 🌱 ou rider expérimenté 🔥 cherchant à perfectionner votre technique, je vous accompagne en toute sécurité 🛡️.
                </p>
              </div>
            )}

            {currentLang === 'en' && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  <Snowflake className="h-7 w-7 text-purple-600" />
                  Off-Piste Snowboarding 🏂🏔️
                </h3>
                <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                  Dive into the adventure 🏔️ and discover the freedom of off-piste snowboarding ❄️🏂 with lessons tailored to all levels. Whether you're a beginner 🌱 or an experienced rider 🔥 looking to refine your technique, I'll guide you safely 🛡️.
                </p>
              </div>
            )}

            {currentLang === 'fr' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700">
                      🌨️ Découverte du hors-piste
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Idéal pour les snowboarders ayant de l'expérience sur piste 🎿 et souhaitant explorer le hors-piste.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🎒</span>
                        <span>Introduction à l'équipement 🏂 (planche, DVA 📡, pelle, sonde)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Techniques de base (positions, virages)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Lecture du terrain et choix des lignes de descente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Principes de sécurité avalanche ❄️</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-emerald-700">
                        🎯 Objectif : acquérir les bases nécessaires pour rider en toute sécurité et explorer des terrains faciles à modérés 🌲.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      ❄️ Perfectionnement hors-piste
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Pour les riders ayant déjà une première expérience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Techniques avancées (virages serrés, contrôle de la vitesse)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🌨️</span>
                        <span>Navigation en terrain varié (poudreuse, croûtée, forêts)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>📡</span>
                        <span>Utilisation avancée du DVA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Gestion des risques et choix des lignes de descente</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-purple-700">
                        🎯 Objectif : gagner en confiance et en compétence sur des terrains intermédiaires à difficiles, tout en renforçant les pratiques de sécurité.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      🏔️ Hors-piste expert / engagement
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Pour les snowboarders confirmés 💪.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛰️</span>
                        <span>Techniques en pente raide et couloirs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>❄️</span>
                        <span>Gestion des conditions de neige difficiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🚑</span>
                        <span>Techniques de secours en avalanche</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Planification d'itinéraires et prise de décision en haute montagne</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-red-700">
                        🎯 Objectif : devenir un rider autonome et compétent, capable de naviguer sur des terrains complexes en toute sécurité ✅.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentLang === 'en' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-700">
                      🌨️ Discover Off-Piste
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Ideal for snowboarders with on-piste experience 🎿 who want to explore off-piste terrain.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">You will learn:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🎒</span>
                        <span>Introduction to equipment 🏂 (snowboard, avalanche transceiver 📡, shovel, probe)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Basic techniques (stances, turns)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Reading the terrain and choosing descent lines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Avalanche safety principles ❄️</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-emerald-700">
                        🎯 Objective: to acquire the necessary skills to ride safely and explore easy to moderate terrain 🌲.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      ❄️ Advanced off-piste riding
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For riders with some prior experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Advanced techniques (tight turns, speed control)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🌨️</span>
                        <span>Navigation in varied terrain (powder, crust, trees)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>📡</span>
                        <span>Advanced use of avalanche transceivers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Risk management and line selection</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-purple-700">
                        🎯 Objective: to gain confidence and skill on intermediate to difficult terrain, while reinforcing safety practices.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      🏔️ Expert off-piste / commitment
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For experienced snowboarders 💪.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛰️</span>
                        <span>Steep slope and couloir techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>❄️</span>
                        <span>Managing difficult snow conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🚑</span>
                        <span>Avalanche rescue techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🧭</span>
                        <span>Route planning and decision-making in high mountain environments</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-red-700">
                        🎯 Objective: to become an independent and competent rider, capable of navigating complex terrain safely ✅.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Cours de Snowboard */}
          <div className="mb-8">
            {currentLang === 'en' && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                  <Snowflake className="h-7 w-7 text-cyan-600" />
                  Snowboard Lessons 🏂❄️
                </h3>
                <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                  Discover the joy of snowboarding 🏂❄️ with my lessons adapted to all levels!
                </p>
              </div>
            )}

            {currentLang === 'fr' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      🌱 Débutants
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Pour les riders qui découvrent le snowboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🎒</span>
                        <span>Apprendre à connaître et ajuster l'équipement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚖️</span>
                        <span>Positions de base et équilibre</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🛷</span>
                        <span>Glisser sur une surface plane</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>↩️</span>
                        <span>Techniques de freinage de base ⛔ et premiers virages</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-green-700">
                        🎯 Objectif : gagner en confiance et maîtriser les bases pour vos premières descentes sur des pentes douces en toute sécurité 🛡️.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-cyan-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cyan-700">
                      ⛷️ Intermédiaires
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Pour ceux qui veulent progresser.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🔄</span>
                        <span>Techniques de virage avancées</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🏁</span>
                        <span>Contrôle de la vitesse et de la direction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🎯</span>
                        <span>Initiation au carving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✨</span>
                        <span>Introduction au freestyle (sauts simples et figures de base)</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-cyan-700">
                        🎯 Objectif : être à l'aise sur des pentes plus raides et commencer à explorer le freestyle 🏂💨.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      🔥 Avancés
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Pour les riders confirmés souhaitant repousser leurs limites.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Carving avancé et techniques de virage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🤸‍♂️</span>
                        <span>Sauts et figures en freestyle (grabs, rotations…)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🏔️</span>
                        <span>Techniques de hors-piste / backcountry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Sécurité en montagne et avalanche ❄️</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-orange-700">
                        🎯 Objectif : maîtriser des techniques avancées et profiter pleinement du snowboard dans toutes ses dimensions 🌟.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentLang === 'en' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      🌱 Beginners
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For riders new to snowboarding.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">You will learn:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🎒</span>
                        <span>How to understand and adjust your equipment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚖️</span>
                        <span>Basic stances and balance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🛷</span>
                        <span>Gliding on a flat surface</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>↩️</span>
                        <span>Basic braking techniques ⛔ and first turns</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-green-700">
                        🎯 Goal: Gain confidence and master the basics for your first runs on gentle slopes safely 🛡️.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-cyan-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cyan-700">
                      ⛷️ Intermediate
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For those who want to progress.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>🔄</span>
                        <span>Advanced turning techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🏁</span>
                        <span>Speed ​​and direction control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🎯</span>
                        <span>Introduction to carving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✨</span>
                        <span>Introduction to freestyle (simple jumps and basic tricks)</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-cyan-700">
                        🎯 Goal: to feel comfortable on steeper slopes and start exploring freestyle 🏂💨.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      🔥 Advanced
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For experienced riders looking to push their limits.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium">On the agenda:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span>⛷️</span>
                        <span>Advanced carving and turning techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🤸‍♂️</span>
                        <span>Freestyle jumps and tricks (grabs, rotations…)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🏔️</span>
                        <span>Off-piste/backcountry techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>⚠️</span>
                        <span>Mountain safety and avalanche awareness ❄️</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-orange-700">
                        🎯 Goal: Master advanced techniques and fully enjoy snowboarding in all its dimensions 🌟.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Avis Clients
                </h2>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500 drop-shadow-md" />
                ))}
                <span className="ml-2 text-3xl font-bold text-gray-900">4.97</span>
                <span className="text-lg text-gray-600 font-medium ml-2">(65 avis)</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-4 py-2 border border-green-200">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-green-700">90% des commentaires sont 5 étoiles</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Liliana H.', rating: 5, date: '16/02/2026', location: 'Skiing, Val d\'Isère', hours: 3, text: "Myriam is an excellent ski instructor. Despite challenging weather conditions and the lesson having to be cut short due to lift closures, Myriam made every minute count and provided excellent tips to improve my skiing. She was encouraging and fully present throughout and managed to turn difficult weather situation into a genuinely positive and motivating experience. Thank you Myriam!" },
              { name: 'Géraldine G.', rating: 5, date: '16/02/2026', location: 'Skiing, Val d\'Isère', hours: 3, text: "Myriam est très agréable et très professionnelle Ma fille a beaucoup apprécié sa première leçon de ski en sa compagnie Merci" },
              { name: 'Samantha A.', rating: 5, date: '09/02/2026', location: 'Skiing, Val d\'Isère', hours: 12, text: "I wanted to build my confidence and Myriam provided excellent pre lesson motivation and demonstrated a good understanding of what I was trying to achieve. The lessons were informative and focussed on improving my technique to build confidence. A minor issues was sometimes the language barrier prevented more detailed technical discussions but this did not prevent me meeting my goals. A big advantage was Myriams knowledge of the best areas in the mountain and the snow conditions." },
              { name: 'Denise E.', rating: 5, date: '04/02/2026', location: 'Skiing, Les Arcs 1800', hours: 8, text: "Very good! Lots of experience and a very good tutor for a intermediate skier." },
              { name: 'Naz Y.', rating: 5, date: '02/02/2026', location: 'Skiing, Val d\'Isère', hours: 25, text: "Our two kids loved to ski with Myriam for the whole week. She is a great instructor and very good with kids." },
              { name: 'Harry L.', rating: 5, date: '12/04/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Hi Myriam. I just wanted to thank you so much for looking after the children, Arthur yesterday and both Florence and Arthur today. They had the best time and you were so great with Florence, especially after her big accident on the slopes yesterday. She needed a big confidence boost and you gave it to her so THANK YOU!" },
              { name: 'Ben H.', rating: 5, date: '21/03/2025', location: 'Skiing, Tignes', hours: 3, text: "Myriam was super! She listened, pushed me when right and was kind, and understanding of my nerves. Lots of local information made my experience with her 10/10." },
              { name: 'Rachel B.', rating: 5, date: '18/03/2025', location: 'Skiing, Tignes', hours: 3, text: "Myriam was a great instructor. She was really patient and explained everything really well. Highly recommend!" },
              { name: 'Stephanie M.', rating: 5, date: '07/03/2025', location: 'Skiing, Val d\'Isère', hours: 2, text: "Une super prof, très pédagogue et attentionnée, encore merci et à l'année prochaine !" },
              { name: 'Faris A.', rating: 5, date: '05/03/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Amazing Ski Instructor – Thank You, Myriam! I had the best experience learning from Myriam in Val d'Isère! She's not just an incredible ski instructor—she's warm, patient, and truly knows how to bring out the best in you on the slopes. Before my lessons with her, black slopes felt intimidating, but thanks to her clear guidance and expert coaching, I was able to tackle them with confidence and ease. She breaks everything down in a way that just clicks, making even the toughest techniques feel doable. She's also great at pushing you just enough to improve without ever making you feel overwhelmed. Beyond the technical skills, Myriam made every lesson fun and engaging. She knows the best spots on the mountain and made sure I experienced some amazing runs. Her energy and encouragement made such a difference, and I can honestly say my skiing has improved exponentially because of her. If you're looking for an instructor who is not only skilled but also makes learning enjoyable, Myriam is the one! I can't thank her enough for such an incredible experience." },
              { name: 'David Y.', rating: 5, date: '04/03/2025', location: 'Off-piste Skiing, Val d\'Isère', hours: 8, text: "We scheduled Myriam for two half day off piste sessions in February. She was fantastic in navigating different skiing abilities in our family and extremely knowledgeable. Myriam is patient and friendly while offering excellent technical instruction. We sent four teenagers with her on the second day and they each enjoyed one of their best ski days ever because of Myriam's guidance. Whether you are an expert or intermediate skier, I can strongly recommend Myriam and booking with Maison Sport - a flawless process!" },
              { name: 'Serra K.', rating: 5, date: '03/03/2025', location: 'Skiing, Val d\'Isère', hours: 2, text: "Hi, Myriam was a really nice instructor, to whom we told our needs in advance and she adapted the session to our needs very very well." },
              { name: 'Stephanie M.', rating: 5, date: '02/03/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "Merci Myriam M" },
              { name: 'Carwyn D.', rating: 5, date: '28/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was great at making sure I was technically correct with my turns, first day skiing in 20 years and on our second day I was onto the black runs." },
              { name: 'Neil H.', rating: 5, date: '23/02/2025', location: 'Off-piste Skiing, Val d\'Isère', hours: 12, text: "Myriam is an extremely friendly and very nice person, who was flexible in approach, and was very insightful in terms of technical tips on skiing skills, in our case, in guided off-piste sessions. I would certainly recommend her." },
              { name: 'Jennifer T.', rating: 5, date: '17/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam gave my kids and I a great lesson for an afternoon. She was able to provide specific feedback to each of us and technical instruction to help us improve depending on what we needed to practice. We have hired instructors in past years and my kids and I think she is the best one." },
              { name: 'Sophie W.', rating: 5, date: '17/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was a fantastic instructor who tailored the technical instruction perfectly for the different skill levels of our lesson. Myriam really understood our strengths and development areas and paced the session perfectly throughout. We both improved significantly over the session. We would definitely book Myriam again in the future and really enjoyed our lesson. Thank you!" },
              { name: 'Olivia H.', rating: 5, date: '08/02/2025', location: 'Skiing, Val d\'Isère', hours: 6, text: "Myriam was fantastic! she knows the area very well and took us to places that were less crowded and challenged me when I needed an extra push. highly recommend." },
              { name: 'Naomi H.', rating: 5, date: '08/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was great! Made first day in Val d'Isère easy. Couldn't have done it without her. She made it fun for the kids; gave good pointers along the way; covered a lot of territory and didn't mind we didn't want to have many breaks! She was patient and kind; - absolutely lovely person. An amazing skier! I'd definitely recommend her." },
              { name: 'Adam W.', rating: 5, date: '07/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was very flexible with timings of lesson which ended up being very important with cancelled flights. She is very friendly and recommended great slopes for my ability. She was very good at putting things simply for me to understand and left me with things to work on for the rest of my ski holiday. Thanks Myriam!" },
              { name: 'Aidan O.', rating: 5, date: '07/02/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "Excellent lesson and brought me around me to several areas of resort to experience different challanges" },
              { name: 'Reuben H.', rating: 5, date: '07/02/2025', location: 'Skiing, Tignes', hours: 3, text: "Myriam was friendly and noticed straight away what i required for improvement. Also very informative on the surrounding ski and mountain areas. A great lesson." },
              { name: 'Fi B.', rating: 5, date: '06/02/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "I really enjoyed my lesson with Myriam! She was able to instil a confidence in my skiing which I am very thankful for! After my lesson, my husband changed my skis (25 years old) to enhance my new skiing abilities! When I come back to Val D'Isere I will definitely book you again (if you'll have me). Thank you Myriam." },
              { name: 'Sophie B.', rating: 5, date: '04/02/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "Myriam was friendly and really put me at ease in my lesson. She was easy to follow and helped build my confidence and set me up for a great week of skiing! I really recommend her" },
              { name: 'Lee P.', rating: 5, date: '05/01/2025', location: 'Skiing, Val d\'Isère', hours: 8, text: "Myriam has great technical knowledge and experience. Definitely improved my skiing technique at my pace." },
              { name: 'Louis B.', rating: 5, date: '26/01/2026', location: 'Ski, Tignes', hours: 4, text: "Après un seul après midi ma copine qui a été accompagnée de Myriam n'avait que des bonnes choses a dire à propos de Myriam, et pouvait descendre des pistes bleues. Je recommande vivement les services de Myriam." },
              { name: 'Benny A.', rating: 5, date: '26/01/2026', location: 'Snowboard, Les Arcs', hours: 4, text: "I highly recommend taking Myriam as an instructor. She proved to be very patient and was very helpful in creating confidence on the slopes." },
              { name: 'Gilly W.', rating: 5, date: '21/01/2026', location: 'Ski, Les Arcs 1600', hours: 6, text: "Highly recommend Myriam! Excellent in every way. She gave me plenty of simple, useful tips to improve my technique. I really appreciated that she showed me plenty of different slopes and lifts, so that we would have a fantastic holiday. Such a nice person, too - I felt really comfortable with her. Only positive things to say and I would absolutely book another session with Myriam, if I return to Les Arcs." },
              { name: 'Charlie B.', rating: 5, date: '18/01/2026', location: 'Ski, Les Arcs', hours: 6, text: "We had a really successful day with Myriam. We are a family of four from Australia & Myriam gave us a group lesson for the first day of our skiing holiday. The two kids (10 & 12) hadn't really skied before & the adults are intermediate and in need of some tips to get us started for the trip. Myriam did a fantastic job getting the kids up and going very quickly within one day, skiing down a blue run by the end of day one. We were very impressed. Myriam's communication was ever so slightly unclear at times but her ability to teach the kids so quickly easily outshone any minor issues!" },
              { name: 'Charles C.', rating: 5, date: '13/01/2026', location: 'Ski, Tignes', hours: 6, text: "Myriam pushed us to our limits with great feedback on how to improve our technique. Where one technique may not have worked, she had another method to help us. A very nice instructor that we both recommend!!" },
              { name: 'Scout S.', rating: 5, date: '07/01/2026', location: 'Ski, Val d\'Isère', hours: 36, text: "I booked Myriam for my clients & they said she was a fantastic instructor." },
              { name: 'Nadia B.', rating: 5, date: '25/12/2025', location: 'Ski, Les Arcs 1950', hours: 2, text: "Merci beaucoup Myriam, ces 2 heures de cours m'ont beaucoup aidée à me concentrer sur les bonnes techniques et ont été faciles à appliquer par la suite." },
              { name: 'Julien M.', rating: 5, date: '25/12/2025', location: 'Ski, Les Arcs 1600', hours: 2, text: "Séance au top! Myriam a vraiment adapté la séance à mon niveau et de très bon conseil. Je recommande fortement!! Excellente monitrice!" },
              { name: 'Nicola M.', rating: 5, date: '10/12/2025', location: 'Ski, Tignes', hours: 3, text: "We had a super lesson with Myriam, she was extremely friendly and helpful from the first text message that she sent to me. She was able to look at how we skied and give us clear instruction of what we were doing wrong and what changes we needed make to improve our technique. By the end of the day I was skiing with much more confidence. Myriam was also a great ski guide, very familiar with all the ski routes/pistes and local restaurants - also extremely knowledgeable on local area and it's history. I'm hoping we return to Tignes again soon and would book her again for more lessons." },
              { name: 'Xavi R.', rating: 5, date: '09/12/2025', location: 'Ski, Tignes', hours: 4, text: "The lesson was great! I couldn't have asked for a better teacher. Maryam was super friendly and knowledgeable. Communication was smooth and Maryam was super flexible. Looking forward to my next lesson with her!" },
              { name: 'Hannah M.', rating: 5, date: '17/04/2025', location: 'Ski, Tignes', hours: 8, text: "Myriam was absolutely fantastic - we could not have asked for a better instructor to teach our 6yo, 3yo and myself. The lesson was fun, with positive & constructive feedback. Myriam was so knowledgeable and patient with our children and managed to get our 6yo confidently down blue runs by the end of the lesson. Would highly recommend for skiers of all abilities. Thank you!!" },
              { name: 'Ami B.', rating: 5, date: '16/04/2025', location: 'Ski, Tignes', hours: 6, text: "My partner and I have both been skiing before but we're a bit out of practice so decided to get a couple of lessons. Myriam was a brilliant teacher with really constructive feedback on our techniques and we both have taken away some tips we plan to apply. Myriam has fantastic knowledge of the mountains and it was definitely the best way to explore them with Myriam as our guide. We loved our experience and we would definitely recommend booking lessons with her." },
              { name: 'Kate J.', rating: 5, date: '13/04/2025', location: 'Ski, Val d\'Isère', hours: 2, text: "Myriam was the best instructor I have had. I have skied a number of times but am naturally nervous and Myriam gave me confidence and taught me techniques to help with that. I will definitely ask for Myriam again!" },
              { name: 'Joe S.', rating: 5, date: '26/03/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam is a great teacher. My skiing improved immeasurably after a three-hour private lesson with her. Money well spent. I had a great trip, and I will definitely be going back to Myriam when I come next year." },
              { name: 'Zoe K.', rating: 5, date: '07/04/2025', location: 'Ski, Tignes', hours: 10, text: "Myriam was a fantastic instructor for our 4-year-old son's first time on skis. She was warm, patient, and made learning fun from the start. He quickly gained confidence and couldn't wait to get back on the slopes each day. We're so grateful for her gentle, encouraging approach — a perfect introduction to skiing!" },
              { name: 'Henry C.', rating: 5, date: '26/03/2025', location: 'Ski, Tignes', hours: 4, text: "The three of us had an excellent lesson with Myriam. We came away from the lesson very happy and with a lot of improvements. Would highly recommend Myriam. 5 stars." },
              { name: 'Naz I.', rating: 5, date: '24/03/2025', location: 'Ski, Tignes', hours: 6, text: "I picked Myriam due to her reviews of patience and technical reviews- both of which are true, plus I wanted a female view on moving weight forward. I message Myriam before hand and spent two 3hr lessons with her. She was fun and recognised I needed my confidence building as well. Loved my time with her and will see her again on my next trip. Thank you Myriam 💕" },
              { name: 'Hana W.', rating: 5, date: '15/01/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "We were lucky to have Myriam as our instructor in Val d'Isère. She was amazing at helping our family tackle red runs with confidence. Myriam kept things fun with lots of laughs, and her patience made all the difference. By the end of our lesson, we felt like proper skiers! Highly recommend her if you're looking to improve while having a brilliant time!" },
              { name: 'Marina B.', rating: 5, date: '25/03/2025', location: 'Ski, Tignes', hours: 4, text: "Had 3 fantastic lessons with Myriam in Tignes this March – we couldn't have asked for a better refresher! She was so much fun, super encouraging, and got our confidence back in no time. Myriam's tips improved our technique massively. 5 stars well deserved" },
              { name: 'Shareena P.', rating: 5, date: '10/01/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "We had Myriam as our kids' ski instructor this February, and she was fantastic! She was super patient, kind, and kept our little ones smiling and excited. They learned so much and can't wait to ski again!" },
              { name: 'Lee P.', rating: 5, date: '05/01/2025', location: 'Ski, Val d\'Isère', hours: 8, text: "Myriam has great technical knowledge and experience. Definitely improved my skiing technique at my pace." },
              { name: 'David Y.', rating: 5, date: '04/03/2025', location: 'Ski hors-piste, Val d\'Isère', hours: 8, text: "We scheduled Myriam for two half day off piste sessions in February. She was fantastic in navigating different skiing abilities in our family and extremely knowledgeable. Myriam is patient and friendly while offering excellent technical instruction. We sent four teenagers with her on the second day and they each enjoyed one of their best ski days ever because of Myriam's guidance. Whether you are an expert or intermediate skier, I can strongly recommend Myriam and booking with Maison Sport - a flawless process!" },
              { name: 'Carwyn D.', rating: 4.5, date: '28/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was great at making sure I was technically correct with my turns, first day skiing in 20 years and on our second day I was onto the black runs." },
              { name: 'Jennifer T.', rating: 5, date: '17/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam gave my kids and I a great lesson for an afternoon. She was able to provide specific feedback to each of us and technical instruction to help us improve depending on what we needed to practice. We have hired instructors in past years and my kids and I think she is the best one." },
              { name: 'Neil H.', rating: 4.5, date: '23/02/2025', location: 'Ski hors-piste, Val d\'Isère', hours: 12, text: "Myriam is an extremely friendly and very nice person, who was flexible in approach, and was very insightful in terms of technical tips on skiing skills, in our case, in guided off-piste sessions. I would certainly recommend her." },
              { name: 'Sophie W.', rating: 5, date: '17/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was a fantastic instructor who tailored the technical instruction perfectly for the different skill levels of our lesson. Myriam really understood our strengths and development areas and paced the session perfectly throughout. We both improved significantly over the session. We would definitely book Myriam again in the future and really enjoyed our lesson. Thank you!" },
              { name: 'Olivia H.', rating: 5, date: '08/02/2025', location: 'Ski, Val d\'Isère', hours: 6, text: "Myriam was fantastic! she knows the area very well and took us to places that were less crowded and challenged me when I needed an extra push. highly recommend." },
              { name: 'Adam W.', rating: 5, date: '07/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was very flexible with timings of lesson which ended up being very important with cancelled flights. She is very friendly and recommended great slopes for my ability. She was very good at putting things simply for me to understand and left me with things to work on for the rest of my ski holiday. Thanks Myriam!" },
              { name: 'Naomi H.', rating: 5, date: '08/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was great! Made first day in Val d'Isère easy. Couldn't have done it without her. She made it fun for the kids; gave good pointers along the way; covered a lot of territory and didn't mind we didn't want to have many breaks! She was patient and kind; - absolutely lovely person. An amazing skier! I'd definitely recommend her." },
              { name: 'Reuben H.', rating: 5, date: '07/02/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam was friendly and noticed straight away what i required for improvement. Also very informative on the surrounding ski and mountain areas. A great lesson." },
              { name: 'Faris A.', rating: 5, date: '05/03/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Amazing Ski Instructor – Thank You, Myriam! I had the best experience learning from Myriam in Val d'Isère! She's not just an incredible ski instructor—she's warm, patient, and truly knows how to bring out the best in you on the slopes. Before my lessons with her, black slopes felt intimidating, but thanks to her clear guidance and expert coaching, I was able to tackle them with confidence and ease. She breaks everything down in a way that just clicks, making even the toughest techniques feel doable. She's also great at pushing you just enough to improve without ever making you feel overwhelmed. Beyond the technical skills, Myriam made every lesson fun and engaging. She knows the best spots on the mountain and made sure I experienced some amazing runs. Her energy and encouragement made such a difference, and I can honestly say my skiing has improved exponentially because of her. If you're looking for an instructor who is not only skilled but also makes learning enjoyable, Myriam is the one! I can't thank her enough for such an incredible experience." },
              { name: 'Stephanie M.', rating: 5, date: '07/03/2025', location: 'Ski, Val d\'Isère', hours: 2, text: "Une super prof, très pédagogue et attentionnée, encore merci et à l'année prochaine !" },
              { name: 'Ben H.', rating: 5, date: '21/03/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam was super! She listened, pushed me when right and was kind, and understanding of my nerves. Lots of local information made my experience with her 10/10." },
              { name: 'Rachel B.', rating: 5, date: '18/03/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam was a great instructor. She was really patient and explained everything really well. Highly recommend!" },
              { name: 'Serra K.', rating: 5, date: '03/03/2025', location: 'Ski, Val d\'Isère', hours: 2, text: "Hi, Myriam was a really nice instructor, to whom we told our needs in advance and she adapted the session to our needs very very well." },
              { name: 'Fi B.', rating: 5, date: '06/02/2025', location: 'Ski, Val d\'Isère', hours: 3, text: "I really enjoyed my lesson with Myriam! She was able to instil a confidence in my skiing which I am very thankful for! After my lesson, my husband changed my skis (25 years old) to enhance my new skiing abilities! When I come back to Val D'Isere I will definitely book you again (if you'll have me). Thank you Myriam." },
              { name: 'Sophie B.', rating: 5, date: '04/02/2025', location: 'Ski, Val d\'Isère', hours: 3, text: "Myriam was friendly and really put me at ease in my lesson. She was easy to follow and helped build my confidence and set me up for a great week of skiing! I really recommend her" },
            ].map((review, idx) => (
              <Card 
                key={idx} 
                className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50 hover:border-blue-200/50 relative overflow-hidden group"
              >
                {/* Card decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-100 to-emerald-100 rounded-tr-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-1">{review.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i <= Math.round(review.rating) ? 'text-yellow-500 fill-yellow-500 drop-shadow-sm' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-1 text-sm font-medium text-gray-700">{review.rating} ⭐</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-3 py-1 border border-blue-200/50">
                        <span className="text-xs font-semibold text-blue-700">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1">
                      <Mountain className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700">{review.location}</span>
                    </div>
                    {review.hours && (
                      <div className="flex items-center gap-1 bg-green-50 rounded-full px-3 py-1">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-700">{review.hours}h</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-3xl text-blue-200 opacity-50">"</div>
                    <p className={`text-gray-700 leading-relaxed pl-6 pr-2 ${isLongReview(review.text) && !expandedReviews[idx] ? 'max-h-32 overflow-hidden' : ''}`}>
                      {review.text}
                    </p>
                    {isLongReview(review.text) && (
                      <button
                        onClick={() => toggleReviewExpansion(idx)}
                        className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-all duration-200 hover:gap-2 group"
                        aria-expanded={expandedReviews[idx]}
                        aria-label={expandedReviews[idx] ? "Lire moins" : "Lire plus"}
                      >
                        {expandedReviews[idx] ? (
                          <>
                            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1" />
                            <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 group-hover:bg-blue-100 transition-colors duration-200">
                              Réduire
                            </span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-1" />
                            <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 group-hover:bg-blue-100 transition-colors duration-200">
                              Lire plus
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30">
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  Note moyenne
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4.97</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500 drop-shadow-md" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">basé sur 65 avis</div>
              </div>
              <div className="border-l-2 border-gray-200 pl-8 text-left">
                <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Appréciations
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Amabilité</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                      <span className="font-bold text-green-600">5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Communication</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '97.8%'}}></div>
                      </div>
                      <span className="font-bold text-green-600">4.89</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ponctualité</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '99.6%'}}></div>
                      </div>
                      <span className="font-bold text-green-600">4.98</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl mb-6 shadow-2xl">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            {currentLang === 'fr' && (
              <>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Réserver vos cours (Hiver 2025-2026)
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Planning détaillé et tarifs pour vos cours particuliers de ski et snowboard
                </p>
              </>
            )}
            {currentLang === 'en' && (
              <>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Book your lessons (Winter 2025-2026)
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Detailed schedule and prices for your private ski and snowboard lessons
                </p>
              </>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                {currentLang === 'fr' && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900">Planning des disponibilités</h3>
                    <p className="text-sm text-gray-600">Sélectionnez votre semaine et réservez en ligne</p>
                  </>
                )}
                {currentLang === 'en' && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900">Availability schedule</h3>
                    <p className="text-sm text-gray-600">Select your week and book online</p>
                  </>
                )}
                </div>
              </div>
              
              {/* Légende des statuts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {currentLang === 'fr' && (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-emerald-700">Disponible</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-700">Partiel</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                      <X className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700">Complet</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Règle spéciale</span>
                    </div>
                  </>
                )}
                {currentLang === 'en' && (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-emerald-700">Available</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-700">Partially booked</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                      <X className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700">Fully booked</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Special offer</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-xl p-4 border border-teal-200">
                  <div className="grid grid-cols-7 gap-4 text-center font-semibold text-gray-800">
                    {currentLang === 'fr' ? (
                      <>
                        <div>Semaine</div>
                        <div>Dates</div>
                        <div>Tarif H</div>
                        <div>Tarif J</div>
                        <div>Remise</div>
                        <div>Créneaux</div>
                        <div>Action</div>
                      </>
                    ) : (
                      <>
                        <div>Week</div>
                        <div>Dates</div>
                        <div>H Rate</div>
                        <div>J Rate</div>
                        <div>Discount</div>
                        <div>Time slots</div>
                        <div>Promotion</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    {w:'49',d:'30/11/2025 - 06/12/2025',h:'€78.00',j:'€495.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'01/12/2025',blocked:'09:00-12:30',availableSlots:['12:30-16:30']},
                        {date:'02/12/2025',blocked:'09:00-11:00',availableSlots:['11:00-16:30']},
                        {date:'04/12/2025',blocked:'11:00-13:00',availableSlots:['09:00-11:00', '13:00-16:30']},
                        {date:'08/12/2025',blocked:'11:00-13:00 et 14:00-16:00',availableSlots:['09:00-11:00', '13:00-14:00', '16:00-16:30']},
                        {date:'13/12/2025',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyAvailableDates:['03/12/2025','05/12/2025','06/12/2025','07/12/2025','09/12/2025','10/12/2025','11/12/2025','12/12/2025','27/12/2025'],
                      dailyFullBlockedDates:['14/12/2025','15/12/2025','16/12/2025','17/12/2025','18/12/2025','19/12/2025'],
                      dailyPartialSlots2:[
                        {date:'21/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'22/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'23/12/2025',blocked:'09:00-14:00',availableSlots:['14:00-16:30']}
                      ],
                      dailyFullBlockedDates2:['24/12/2025','25/12/2025','26/12/2025']
                    },
                    {w:'1',d:'28/12/2025 - 03/01/2026',h:'€115.00',j:'€699.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyFullBlockedDates:['28/12/2025','29/12/2025','30/12/2025','31/12/2025','01/01/2026','02/01/2026','04/01/2026','05/01/2026'],
                      dailyPartialSlots:[
                        {date:'06/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'07/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'08/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'09/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'10/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'13/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'14/01/2026',blocked:'10:30-13:30',availableSlots:['09:00-10:30', '13:30-16:30']},
                        {date:'15/01/2026',blocked:'10:30-13:30',availableSlots:['09:00-10:30', '13:30-16:30']},
                        {date:'16/01/2026',blocked:'10:30-16:30',availableSlots:['09:00-10:30']},
                        {date:'18/01/2026',blocked:'09:00-12:00 et 16:30-18:00',availableSlots:['12:00-16:30']},
                        {date:'19/01/2026',blocked:'09:00-12:00 et 13:00-16:30',availableSlots:['12:00-13:00']},
                        {date:'20/01/2026',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'21/01/2026',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'22/01/2026',blocked:'09:00-13:00 et 13:30-16:30',availableSlots:['13:00-13:30']},
                        {date:'23/01/2026',blocked:'09:00-13:00 et 13:30-16:30',availableSlots:['13:00-13:30']},
                        {date:'25/01/2026',blocked:'13:00-16:30',availableSlots:['09:00-13:00']},
                        {date:'26/01/2026',blocked:'09:00-16:30',availableSlots:[]},
                        {date:'27/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'28/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'29/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'30/01/2026',blocked:'09:00-16:30',availableSlots:[]},
                        {date:'31/01/2026',blocked:'09:00-12:15',availableSlots:['12:15-16:30']}
                      ],
                      dailyAvailableDates:['11/01/2026','17/01/2026','24/01/2026'],
                      dailyFullBlockedDates2:['12/01/2026']
                    },
                    {w:'50',d:'07/12/2025 - 13/12/2025',h:'€79.00',j:'€522.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'08/12/2025',blocked:'11:00-13:00 et 14:00-16:00',availableSlots:['09:00-11:00', '13:00-14:00', '16:00-16:30']},
                        {date:'13/12/2025',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyAvailableDates:['09/12/2025','10/12/2025','11/12/2025','12/12/2025']
                    },
                    {w:'51',d:'14/12/2025 - 20/12/2025',h:'€91.00',j:'€554.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyFullBlockedDates:['14/12/2025','15/12/2025','16/12/2025','17/12/2025','18/12/2025','19/12/2025']
                    },
                    {w:'52',d:'21/12/2025 - 27/12/2025',h:'€101.00',j:'€629.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyPartialSlots:[
                        {date:'21/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'22/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'23/12/2025',blocked:'09:00-14:00',availableSlots:['14:00-16:30']}
                      ],
                      dailyFullBlockedDates:['24/12/2025','25/12/2025','26/12/2025']
                    },
                    {w:'2',d:'04/01/2026 - 10/01/2026',h:'€95.00',j:'€550.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'06/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'07/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'08/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'09/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'10/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyFullBlockedDates:['04/01/2026','05/01/2026']
                    },
                    {w:'3',d:'11/01/2026 - 17/01/2026',h:'€105.00',j:'€566.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',},
                    {w:'4',d:'18/01/2026 - 24/01/2026',h:'€90.00',j:'€550.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',},
                    {w:'5',d:'25/01/2026 - 31/01/2026',h:'€95.00',j:'€660.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30 (26-30/01: 09:00-14:00 indisponible ; 14:00-17:00 disponible)',dailyExtendedMorningBlocks:['26/01/2026','27/01/2026','28/01/2026','29/01/2026','30/01/2026'],},
                    {w:'6',d:'01/02/2026 - 07/02/2026',h:'€96.00',j:'€700.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'01/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'02/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'03/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}]},
                    {w:'7',d:'08/02/2026 - 14/02/2026',h:'€110.00',j:'€750.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyPartialSlots:[
                        {date:'01/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'02/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'03/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'04/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'05/02/2026',blocked:'09:00-13:30',availableSlots:['13:30-16:30']},
                        {date:'10/02/2026',blocked:'09:00-13:30',availableSlots:['13:30-16:30']},
                        {date:'14/02/2026',blocked:'13:00-16:30',availableSlots:['09:00-13:00']}
                      ],
                      dailyAvailableDates:['06/02/2026','07/02/2026','08/02/2026','11/02/2026','12/02/2026','13/02/2026'],
                      dailyFullBlockedDates:['09/02/2026']
                    },
                    {w:'8',d:'15/02/2026 - 21/02/2026',h:'€131.00',j:'€900.00',r:'8%',c:'09:00-13:00 ; 13:00-17:00',rule:true,
                      dailyFullBlockedDates:['15/02/2026','16/02/2026','17/02/2026','18/02/2026','19/02/2026','20/02/2026'],
                      dailyPartialSlots:[
                        {date:'21/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ]
                    },
                    {w:'9',d:'22/02/2026 - 28/02/2026',h:'€120.00',j:'€599.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                    {w:'10',d:'01/03/2026 - 07/03/2026',h:'€105.00',j:'€549.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'01/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ]
                    },
                    {w:'11',d:'08/03/2026 - 14/03/2026',h:'€99.00',j:'€537.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'12',d:'15/03/2026 - 21/03/2026',h:'€94.00',j:'€507.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'13',d:'22/03/2026 - 28/03/2026',h:'€95.00',j:'€491.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'14',d:'29/03/2026 - 04/04/2026',h:'€115.00',j:'€653.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyPartialSlots:[
                        {date:'29/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'30/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'31/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'01/04/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'02/04/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'03/04/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyAvailableDates:['04/04/2026']
                    },
                    {w:'15',d:'05/04/2026 - 11/04/2026',h:'€111.00',j:'€630.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                    {w:'16',d:'12/04/2026 - 18/04/2026',h:'€110.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'17',d:'19/04/2026 - 25/04/2026',h:'€110.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'18',d:'26/04/2026 - 02/05/2026',h:'€99.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'}
                  ].map((row,idx)=> (
                    <div key={idx} className={`p-4 hover:bg-gray-50 transition-colors ${row.reserved ? 'opacity-60' : ''}`}>
                      <div className="grid grid-cols-7 gap-4 items-center">
                        <div className="font-semibold text-gray-900">{row.w}</div>
                        <div className="text-sm text-gray-700">{row.d}</div>
                        <div className="text-sm font-medium text-teal-600">{row.h}</div>
                        <div className="text-sm font-medium text-teal-600">{row.j}</div>
                        <div className="text-sm text-teal-600">{row.r}</div>
                        <div className="text-sm text-gray-700">{row.c}</div>
                        <div>
                          {row.reserved ? (
                            <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed select-none">
                              {currentLang === 'fr' ? 'Complet' : 'Fully booked'}
                            </span>
                          ) : (
                            <a 
                              href="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 transition-all duration-300"
                            >
                              {currentLang === 'fr' ? 'Réserver' : 'Book'}
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Affichage détaillé des disponibilités */}
                      <div className="mt-3 space-y-2">
                        {Array.isArray(row.dailyPartialSlots) && row.dailyPartialSlots.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyPartialSlots.map((slot, slotIdx) => (
                              <div key={slotIdx} className="flex flex-wrap gap-2">
                                {slot.blocked && (
                                  <span title={`${currentLang === 'fr' ? `Indisponible le ${slot.date} (${slot.blocked})` : `Unavailable on ${slot.date} (${slot.blocked})`}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                    <X className="h-3 w-3" />
                                    {slot.date} · {slot.blocked} {currentLang === 'fr' ? 'indisponible' : 'unavailable'}
                                  </span>
                                )}
                                {Array.isArray(slot.availableSlots) && slot.availableSlots.map((availableSlot, availableIdx) => (
                                  <span key={availableIdx} title={`${currentLang === 'fr' ? `Disponible le ${slot.date} (${availableSlot})` : `Available on ${slot.date} (${availableSlot})`}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="h-3 w-3" />
                                    {slot.date} · {availableSlot}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyAvailableDates) && row.dailyAvailableDates.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyAvailableDates.map((dateStr) => (
                              <span key={dateStr} title={`${currentLang === 'fr' ? `Disponible le ${dateStr}` : `Available on ${dateStr}`}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="h-3 w-3" />
                                {dateStr} · {currentLang === 'fr' ? 'Journée complète' : 'All day'}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyFullBlockedDates) && row.dailyFullBlockedDates.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyFullBlockedDates.map((dateStr) => (
                              <span key={dateStr} title={`${currentLang === 'fr' ? `Journée complète indisponible le ${dateStr}` : `Full day unavailable on ${dateStr}`}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                <X className="h-3 w-3" />
                                {dateStr} · {currentLang === 'fr' ? 'Complet' : 'Full'}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyPartialSlots2) && row.dailyPartialSlots2.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyPartialSlots2.map((slot, slotIdx) => (
                              <div key={slotIdx} className="flex flex-wrap gap-2">
                                {slot.blocked && (
                                  <span title={`${currentLang === 'fr' ? `Indisponible le ${slot.date} (${slot.blocked})` : `Unavailable on ${slot.date} (${slot.blocked})`}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                    <X className="h-3 w-3" />
                                    {slot.date} · {slot.blocked} {currentLang === 'fr' ? 'indisponible' : 'unavailable'}
                                  </span>
                                )}
                                {Array.isArray(slot.availableSlots) && slot.availableSlots.map((availableSlot, availableIdx) => (
                                  <span key={availableIdx} title={`${currentLang === 'fr' ? `Disponible le ${slot.date} (${availableSlot})` : `Available on ${slot.date} (${availableSlot})`}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="h-3 w-3" />
                                    {slot.date} · {availableSlot}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyFullBlockedDates2) && row.dailyFullBlockedDates2.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyFullBlockedDates2.map((dateStr) => (
                              <span key={dateStr} title={`Journée complète indisponible le ${dateStr}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                <X className="h-3 w-3" />
                                {dateStr} · Complet
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {row.rule && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <Info className="h-3 w-3" />
                            {currentLang === 'fr' ? 'Règle spéciale de réservation' : 'Special booking rule'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Widget de réservation interactif par date/slot */}
            <div className="mt-12">
              <div className="text-center mb-8">
                {currentLang === 'fr' ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Réserver par date</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Consultez le calendrier interactif pour vérifier les disponibilités en temps réel et réservez directement votre créneau horaire.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Book by date</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Check the interactive calendar to see real-time availability and book your time slot directly.
                    </p>
                  </>
                )}
              </div>
              <BookingWidget 
                bookingUrl="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend"
                currentLang={currentLang}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-40 right-40 w-56 h-56 bg-cyan-300 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-gradient">
              {currentLang === 'fr' ? 'Blog' : 'Blog'}
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              {currentLang === 'fr' ? 'Actus, conseils et bons plans Tignes, Val d\'Isère & Les Arcs' : 'News, tips, and deals in Tignes, Val d\'Isère & Les Arcs'}
            </p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button 
                onClick={() => {
                  // Scroll to articles section or filter articles
                  const element = document.querySelector('#blog-articles');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200 transform hover:scale-110 hover:bg-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="flex items-center gap-2">
                  📰 Articles exclusifs
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </button>
              <button 
                onClick={() => {
                  // Scroll to expert ski section or filter articles
                  const element = document.querySelector('#expert-ski');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 transform hover:scale-110 hover:bg-indigo-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="flex items-center gap-2">
                  🎿 Expert ski
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </button>
              <button 
                onClick={() => {
                  // Scroll to guide section or filter articles
                  const element = document.querySelector('#guide-complet');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200 transform hover:scale-110 hover:bg-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="flex items-center gap-2">
                  🏔️ Guide complet
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </button>
              <button 
                onClick={() => {
                  // Scroll to Paradiski section or filter articles
                  const element = document.querySelector('#paradiski-guide');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium border border-teal-200 transform hover:scale-110 hover:bg-teal-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span className="flex items-center gap-2">
                  ⛷️ Paradiski
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </button>
            </div>
          </div>
          
          {/* Encart Diplôme d'État français */}
          {currentLang === 'fr' && (
          <div className="mb-12">
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 transform hover:scale-[1.02] transition-all duration-500">
              {/* Décoration de fond */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse delay-500"></div>
              </div>
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform hover:rotate-12 transition-all duration-300">
                      <span className="text-5xl">🇫🇷</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Diplôme d'État de Ski Alpin 🇫🇷
                    </h3>
                    <p className="text-2xl text-white/90 mb-6">
                      Une formation d'excellence reconnue mondialement
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        ⭐ Référence mondiale
                      </span>
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        🏆 Niveau technique exceptionnel
                      </span>
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        📚 Formation complète
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      Structure du diplôme
                    </h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Autorité :</strong> École Nationale des Sports de Montagne + Ministère des Sports</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Statut :</strong> Diplôme d'État national</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Durée :</strong> 4 à 6 ans de formation</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Reconnaissance :</strong> Carte ISIA, travail en Europe</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="p-2 bg-yellow-500 rounded-lg">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      Parcours de formation
                    </h4>
                    <div className="space-y-3 text-white/90 mb-4">
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">1.</span>
                        <span>Test technique (slalom géant chronométré)</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">2.</span>
                        <span>Cycle préparatoire</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">3.</span>
                        <span>Eurotest</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">4.</span>
                        <span>Stages pédagogiques et techniques</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">5.</span>
                        <span><strong>Diplôme d'État Ski Alpin</strong></span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/20 space-y-2">
                      <a 
                        href="https://www.ensm.sports.gouv.fr/formation-de-moniteur-de-ski-alpin/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 underline decoration-white/50 hover:decoration-white transform hover:translate-x-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">En savoir plus sur la formation ENSM</span>
                      </a>
                      <a 
                        href="https://www.ensm.sports.gouv.fr/wp-content/uploads/2024/12/D.E-SKI-ALPIN.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 underline decoration-white/50 hover:decoration-white transform hover:translate-x-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Télécharger le cursus complet (PDF)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Philosophie pédagogique française
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                    <div>
                      <p className="font-semibold text-white mb-2">Caractéristiques :</p>
                      <ul className="space-y-2 text-sm">
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Sélection initiale très compétitive (Eurotest)</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Forte dominance du ski de géant</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Progression longue avec alternance stages–enseignements</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Accent sur précision technique et démonstration parfaite</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-2">Objectif :</p>
                      <p className="text-sm">
                        Former un <strong>technicien expert</strong> capable d'enseigner au plus haut niveau, avec une pédagogie structurée nationale et une maîtrise technique exceptionnelle.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">⭐</div>
                    <div className="text-white font-semibold">Référence mondiale</div>
                    <div className="text-white/80 text-sm mt-1">Diplôme le plus sélectif techniquement</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">🏆</div>
                    <div className="text-white font-semibold">Excellence technique</div>
                    <div className="text-white/80 text-sm mt-1">Niveau technique exceptionnel</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">📚</div>
                    <div className="text-white font-semibold">Formation complète</div>
                    <div className="text-white/80 text-sm mt-1">Pédagogie structurée nationale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Encart French State Diploma */}
          {currentLang === 'en' && (
          <div className="mb-12">
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 transform hover:scale-[1.02] transition-all duration-500">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse delay-500"></div>
              </div>
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform hover:rotate-12 transition-all duration-300">
                      <span className="text-5xl">🇫🇷</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      French State Diploma in Alpine Skiing 🇫🇷
                    </h3>
                    <p className="text-2xl text-white/90 mb-6">
                      A globally recognized training program of excellence
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        ⭐ World benchmark
                      </span>
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        🏆 Exceptional technical level
                      </span>
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        📚 Comprehensive training
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      Diploma structure
                    </h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Authority:</strong> National School of Mountain Sports (ENSM) + Ministry of Sports</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Status:</strong> National State Diploma</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Duration:</strong> 4 to 6 years of training</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Recognition:</strong> ISIA card, work in Europe</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="p-2 bg-yellow-500 rounded-lg">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      Training path
                    </h4>
                    <div className="space-y-3 text-white/90 mb-4">
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">1.</span>
                        <span>Technical test (timed giant slalom)</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">2.</span>
                        <span>Preparatory cycle</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">3.</span>
                        <span>Eurotest</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">4.</span>
                        <span>Pedagogical and technical internships</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">5.</span>
                        <span><strong>French State Diploma in Alpine Skiing</strong></span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/20 space-y-2">
                      <a 
                        href="https://www.ensm.sports.gouv.fr/formation-de-moniteur-de-ski-alpin/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 underline decoration-white/50 hover:decoration-white transform hover:translate-x-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Learn more about the ENSM training program</span>
                      </a>
                      <a 
                        href="https://www.ensm.sports.gouv.fr/wp-content/uploads/2024/12/D.E-SKI-ALPIN.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 underline decoration-white/50 hover:decoration-white transform hover:translate-x-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Download the complete curriculum (PDF)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    French educational philosophy
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                    <div>
                      <p className="font-semibold text-white mb-2">Features:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Highly competitive initial training (Eurotest)</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Strong focus on giant slalom skiing</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Long progression with alternating internships and teaching sessions</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Emphasis on technical precision and flawless demonstration</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-2">Objective:</p>
                      <p className="text-sm">
                        To train an <strong>expert technician</strong> capable of teaching at the highest level, using a structured national teaching methodology and exceptional technical mastery.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">⭐</div>
                    <div className="text-white font-semibold">World-renowned</div>
                    <div className="text-white/80 text-sm mt-1">Most technically selective qualification</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">🏆</div>
                    <div className="text-white font-semibold">Technical excellence</div>
                    <div className="text-white/80 text-sm mt-1">Exceptional technical level</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">📚</div>
                    <div className="text-white font-semibold">Comprehensive training</div>
                    <div className="text-white/80 text-sm mt-1">Structured national teaching methodology</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Articles interactifs */}
          <div id="blog-articles" className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">📰 {currentLang === 'fr' ? 'Articles Exclusifs' : 'Exclusive Articles'}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentLang === 'fr' ? 'Découvrez nos derniers articles et actualités sur les stations de ski' : 'Discover our latest articles and news about ski resorts'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader>
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle className="text-xl">{currentLang === 'fr' ? 'Nouveautés Hiver 2025-2026' : 'What\'s New for Winter 2025-2026'}</CardTitle>
                  <CardDescription>{currentLang === 'fr' ? 'Découvrez les dernières améliorations des domaines skiables' : 'Discover the latest improvements to ski areas'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Nouvelles remontées mécaniques, zones freestyle étendues et services améliorés...' : 'New lifts, expanded freestyle zones, and enhanced services...'}</p>
                  <Button 
                    onClick={() => {
                      showArticle('nouveautes');
                    }}
                    className="w-full group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {currentLang === 'fr' ? 'Lire l\'article' : 'Read article'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader>
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle className="text-xl">{currentLang === 'fr' ? 'Meilleures Spots Freeride' : 'Best Freeride Spots'}</CardTitle>
                  <CardDescription>{currentLang === 'fr' ? 'Les secrets des hors-pistes authentiques et sécurisés' : 'The secrets of authentic and safe off-piste skiing'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Explorez les couloirs mythiques et les forêts enneigées avec nos guides experts...' : 'Explore legendary couloirs and snow-covered forests with our expert guides...'}</p>
                  <Button 
                    onClick={() => {
                      showArticle('freeride');
                    }}
                    className="w-full group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {currentLang === 'fr' ? 'Lire l\'article' : 'Read article'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <CardHeader>
                  <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Mountain className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle className="text-xl">{currentLang === 'fr' ? 'Équipement Essentiel' : 'Essential Equipment'}</CardTitle>
                  <CardDescription>{currentLang === 'fr' ? 'Le matériel parfait pour votre séjour au ski' : 'The perfect gear for your ski holiday'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Tests comparatifs des derniers skis, casques et accessoires de la saison...' : 'Comparative reviews of the latest skis, helmets, and accessories for the season...'}</p>
                  <Button 
                    onClick={() => {
                      showArticle('equipement');
                    }}
                    className="w-full group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {currentLang === 'fr' ? 'Lire l\'article' : 'Read article'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Section d'aperçu d'article qui s'affiche au clic */}
            <div id="article-preview" className="hidden mt-8 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 animate-fadeIn">
              <div className="flex justify-between items-start mb-6">
                <h4 id="article-title" className="text-2xl font-bold text-gray-900">Titre de l'article</h4>
                <Button 
                  onClick={() => {
                    hideArticle();
                  }}
                  variant="outline"
                  className="ml-4"
                >
                  Fermer
                </Button>
              </div>
              <div id="article-content" className="prose max-w-none">
                {/* Le contenu de l'article sera inséré ici dynamiquement */}
              </div>
            </div>
          </div>

          <div id="expert-ski" className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">🎿 {currentLang === 'fr' ? 'Expert Ski' : 'Expert Skiing'}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentLang === 'fr' ? 'Techniques avancées et conseils d\'experts pour progresser' : 'Advanced techniques and expert tips to improve your skiing'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="h-6 w-6 text-indigo-600" />
                    {currentLang === 'fr' ? 'Technique du Carving Parfait' : 'Perfect Carving Technique'}
                  </CardTitle>
                  <CardDescription>{currentLang === 'fr' ? 'Maîtrisez les virages coupés comme un champion' : 'Master carved turns like a champion'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Apprenez les secrets du carving moderne : positionnement, angulation et timing...' : 'Learn the secrets of modern carving: positioning, angle, and timing...'}</p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">{currentLang === 'fr' ? 'Avancé' : 'Advanced'}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{currentLang === 'fr' ? 'Pistes noires' : 'Black Runs'}</span>
                  </div>
                  <Button 
                    onClick={() => {
                      showArticle('carving');
                    }}
                    className="group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {currentLang === 'fr' ? 'En savoir plus' : 'Learn more'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    {currentLang === 'fr' ? 'Sécurité sur les Pistes' : 'Ski Safety'}
                  </CardTitle>
                  <CardDescription>{currentLang === 'fr' ? 'Les règles d\'or pour skier en toute sécurité' : 'The golden rules for safe skiing'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentLang === 'fr' ? '10 règles essentielles, gestion des collisions et conduite responsable...' : '10 essential rules, collision avoidance, and responsible skiing...'}</p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{currentLang === 'fr' ? 'Tous niveaux' : 'All Levels'}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{currentLang === 'fr' ? 'Indispensable' : 'Essential'}</span>
                  </div>
                  <Button 
                    onClick={() => {
                      showArticle('securite');
                    }}
                    className="group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {currentLang === 'fr' ? 'En savoir plus' : 'Learn more'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div id="guide-complet" className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">🏔️ {currentLang === 'fr' ? 'Guide Complet' : 'Complete Guide'}</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentLang === 'fr' ? 'Tout ce qu\'il faut savoir pour organiser votre séjour ski' : 'Everything you need to know to plan your ski trip'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => {
                    showArticle('quandPartir');
                  }}
                  className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Quand partir ?' : 'When to go?'}</h4>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Meilleures périodes, tarifs et affluence' : 'Best times, prices, and crowds'}</p>
                </div>
                <div 
                  onClick={() => {
                    showArticle('ouLoger');
                  }}
                  className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Où loger ?' : 'Where to stay?'}</h4>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Hôtels, chalets et appartements' : 'Hotels, chalets, and apartments'}</p>
                </div>
                <div 
                  onClick={() => {
                    showArticle('materiel');
                  }}
                  className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Settings className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Matériel' : 'Equipment'}</h4>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Location, achat et entretien' : 'Rental, purchase, and maintenance'}</p>
                </div>
                <div 
                  onClick={() => {
                    showArticle('applications');
                  }}
                  className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Applications' : 'Apps'}</h4>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Météo, neige et forfaits' : 'Weather, snow conditions, and lift passes'}</p>
                </div>
              </div>
            </div>
          </div>

          <div id="espace-killy-guide" className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">⛷️ Espace Killy</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentLang === 'fr' ? 'Le guide complet du domaine Espace Killy et ses stations' : 'The complete guide to the Espace Killy ski area and its resorts'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div 
                  onClick={() => {
                    showArticle('tignes');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Mountain className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Tignes</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Station moderne, haute altitude, glacier' : 'Modern resort, high altitude, glacier'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎿 Val Claret, Le Lac, Le Bouchet</p>
                      <p>🏔️ Altitude: 1550m - 3450m</p>
                      <p>⭐ Grand Motte Glacier</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('valDisere');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Compass className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Val d'Isère</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Station historique, village authentique' : 'Historic resort, authentic village'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎿 Traditional village</p>
                      <p>🏔️ Altitude: 1850m - 3450m</p>
                      <p>⭐ Bellevarde Face</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('espaceKilly');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Domaine Espace Killy' : 'Espace Killy Ski Area'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Le plus beau domaine skiable du monde' : 'The most beautiful ski area in the world'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎿 {currentLang === 'fr' ? '300 km de pistes' : '300 km of slopes'}</p>
                      <p>🏔️ Altitude: 1550m - 3450m</p>
                      <p>⭐ {currentLang === 'fr' ? '139 pistes, 88 remontées' : '139 slopes, 88 lifts'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div 
                  onClick={() => {
                    showArticle('horairesSaison');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Calendrier de la saison 2025-2026' : '2025-2026 Season Calendar'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Calendrier complet' : 'Complete Calendar'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎂 {currentLang === 'fr' ? 'Tignes : 28 novembre 2025 → 3 mai 2026' : 'Tignes: November 28, 2025 → May 3, 2026'}</p>
                      <p>🎂 {currentLang === 'fr' ? 'Val d\'Isère : 5 décembre 2025 → 3 mai 2026' : 'Val d\'Isère: December 5, 2025 → May 3, 2026'}</p>
                      <p>⭐ {currentLang === 'fr' ? 'Haute saison : décembre et février' : 'High Season: December and February'}</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('programmeAnimations');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Programme d\'animations' : 'Entertainment Program'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Agenda des événements' : 'Events Calendar'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎊 {currentLang === 'fr' ? 'Ouvertures : Feu d\'artifice et défilé' : 'Openings: Fireworks and Parade'}</p>
                      <p>🏆 {currentLang === 'fr' ? 'Coupe du monde : 5-10 janvier' : 'World Cup: January 5-10'}</p>
                      <p>⭐ {currentLang === 'fr' ? 'Carnaval et Grande fermeture' : 'Carnival and Grand Closing'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div 
                  onClick={() => {
                    showArticle('applicationsMobile');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Applications mobiles' : 'Mobile Apps'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Applications indispensables' : 'Essential Apps'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>📱 MyTignes: {currentLang === 'fr' ? 'Plan des pistes, Webcam' : 'Piste Map, Webcam'}</p>
                      <p>📲 Val d'Isère: {currentLang === 'fr' ? 'Domaine skiable, Conditions des pistes' : 'Ski Area, Piste Conditions'}</p>
                      <p>⭐ {currentLang === 'fr' ? 'Prévisions neige et géoportail' : 'Snow Forecast and Geoportal'}</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('servicesPratiques');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Info className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Bureaux et remontées mécaniques' : 'Offices and Ski Lifts'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Services utiles' : 'Useful Services'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🏢 {currentLang === 'fr' ? 'Offices de tourisme' : 'Tourist Offices'}</p>
                      <p>🚡 {currentLang === 'fr' ? 'Achat de forfaits de ski en ligne' : 'Online Ski Pass Purchase'}</p>
                      <p>⭐ {currentLang === 'fr' ? 'Informations sur les remontées mécaniques' : 'Ski Lift Information'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="https://www.tignes.net" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
                <span>🏔️</span>
                <span>{currentLang === 'fr' ? 'Site web de Tignes' : 'Website of Tignes'}</span>
              </a>
              <a href="https://www.valdisere.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105">
                <span>🏰️</span>
                <span>{currentLang === 'fr' ? 'Site web de Val d\'Isère' : 'Val d\'Isère website'}</span>
              </a>
              <a href="https://www.espacekilly.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
                <span>🗺️</span>
                <span>{currentLang === 'fr' ? 'Domaine skiable Espace Killy' : 'Espace Killy ski area'}</span>
              </a>
              <a href="https://play.google.com/store/search?q=tignes&c=apps" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105">
                <span>📱</span>
                <span>{currentLang === 'fr' ? 'Applications Tignes' : 'Tignes apps'}</span>
              </a>
              <a href="https://play.google.com/store/search?q=val%20d%27isere&c=apps" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 transform hover:scale-105">
                <span>📲</span>
                <span>{currentLang === 'fr' ? 'Applications Val d\'Isère' : 'Val d\'Isère apps'}</span>
              </a>
            </div>
          </div>

          {/* Paradiski */}
          <div id="paradiski-guide" className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">⛷️ Paradiski</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentLang === 'fr' ? 'Le guide complet du domaine Paradiski et ses stations' : 'The complete guide to the Paradiski area and its resorts'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div 
                  onClick={() => {
                    showArticle('lesArcs');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Mountain className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Les Arcs</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? '4 stations, architecture moderne' : '4 resorts, modern architecture'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎿 Arc 1600, 1800, 1950, 2000</p>
                      <p>🏔️ Altitude: 1200m - 3226m</p>
                      <p>⭐ {currentLang === 'fr' ? 'Architecture contemporaine' : 'Contemporary architecture'}</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('laPlagne');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Compass className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">La Plagne</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? '10 stations, familial' : '10 resorts, family-friendly'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎿 Plagne Centre, Bellecôte, etc.</p>
                      <p>🏔️ Altitude: 1250m - 3250m</p>
                      <p>⭐ {currentLang === 'fr' ? 'Idéal pour familles' : 'Ideal for families'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div 
                  onClick={() => {
                    showArticle('vanoiseExpress');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Vanoise Express</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Liaison magique entre domaines' : 'Magical link between ski areas'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🚡 {currentLang === 'fr' ? '2 cabines en 5 minutes' : '2 gondolas in 5 minutes'}</p>
                      <p>🏔️ Altitude: 1600m - 2500m</p>
                      <p>⭐ {currentLang === 'fr' ? '425 km de pistes au total' : '425 km of slopes in total'}</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('paradiski');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Domaine Paradiski' : 'Paradiski Area'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? '425 km de pistes' : '425 km of slopes'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎿 Les Arcs + La Plagne</p>
                      <p>🏔️ Altitude: 1200m - 3226m</p>
                      <p>⭐ {currentLang === 'fr' ? '130 remontées, 2 funiculaires' : '130 lifts, 2 funiculars'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div 
                  onClick={() => {
                    showArticle('horairesParadiski');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Saison 2025-2026' : '2025-2026 Season'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Calendrier complet' : 'Full calendar'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🎂 {currentLang === 'fr' ? 'Ouverture: 13/12/2025' : 'Opening: 13/12/2025'}</p>
                      <p>🎂 {currentLang === 'fr' ? 'Fermeture: 25/04/2026' : 'Closing: 25/04/2026'}</p>
                      <p>⭐ {currentLang === 'fr' ? 'Haute saison: Février' : 'High season: February'}</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    showArticle('pointsFortsArcs');
                  }}
                  className="group hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{currentLang === 'fr' ? 'Points Forts' : 'Highlights'}</h4>
                    <p className="text-gray-600 mb-4">{currentLang === 'fr' ? 'Atouts majeurs' : 'Strengths Major attractions'}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🏔️ {currentLang === 'fr' ? 'Architecture moderne' : 'Modern architecture'}</p>
                      <p>🎿 {currentLang === 'fr' ? 'Domaine Paradiski' : 'Paradiski area'}</p>
                      <p>⚡ {currentLang === 'fr' ? 'TGV direct à Bourg-Saint-Maurice' : 'Direct TGV train to Bourg-Saint-Maurice'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="https://www.lesarcs.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105">
                <span>⛷️</span>
                <span>{currentLang === 'fr' ? 'Site Les Arcs' : 'Les Arcs resort'}</span>
              </a>
              <a href="https://www.paradiski.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105">
                <span>🗺️</span>
                <span>Paradiski</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-pink-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-red-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{currentLang === 'fr' ? 'Conseils équipement' : 'Equipment Advice'}</h3>
                    <p className="text-gray-600">{currentLang === 'fr' ? 'Sécurité & performance' : 'Safety & Performance'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3">{currentLang === 'fr' ? 'Équipement obligatoire en hors-piste :' : 'Mandatory off-piste equipment:'}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span className="text-gray-700 font-medium">{currentLang === 'fr' ? 'DVA (Détecteur de Victimes d\'Avalanche)' : 'Avalanche transceiver (DVA)'}</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">{currentLang === 'fr' ? 'Pelle et sonde' : 'Shovel and probe'}</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">{currentLang === 'fr' ? 'Casque et dorsale' : 'Helmet and back protector'}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-100">
                      <p className="text-gray-700 mb-2">💡 <strong>{currentLang === 'fr' ? 'Conseils pro :' : 'Pro Tips:'}</strong></p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span className="text-gray-700">{currentLang === 'fr' ? 'Location près des pistes' : 'Rental near the slopes'}</span>
                        </div>
                        <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span className="text-gray-700">{currentLang === 'fr' ? 'Bootfitting pour le confort' : 'Boot fitting for comfort'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{currentLang === 'fr' ? 'Conseils choix des pistes' : 'Skiing Tips'}</h3>
                    <p className="text-gray-600">{currentLang === 'fr' ? 'Optimisez vos descentes' : 'Optimize your runs'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3">{currentLang === 'fr' ? 'Stratégies selon l\'heure :' : 'Strategies by time of day:'}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <Sun className="h-4 w-4 text-indigo-600" />
                        <span className="text-gray-700 font-medium">🌅 {currentLang === 'fr' ? 'Matin' : 'Morning'}</span>
                        <span className="text-gray-600">{currentLang === 'fr' ? 'Pentes ensoleillées, neige dure' : 'Sunny slopes, hard snow'}</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <Cloud className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 font-medium">🌤️ {currentLang === 'fr' ? 'Après-midi' : 'Afternoon'}</span>
                        <span className="text-gray-600">{currentLang === 'fr' ? 'Neiges plus souples, ombragées' : 'Softer, shaded snow'}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <p className="text-gray-700 mb-2">⚠️ <strong>{currentLang === 'fr' ? 'Avant hors-piste :' : 'Before going off-piste:'}</strong></p>
                      <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <ShieldAlert className="h-4 w-4 text-orange-600" />
                        <span className="text-gray-700">{currentLang === 'fr' ? 'Consulter le bulletin d\'avalanche' : 'Check the avalanche bulletin'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-orange-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <ShieldAlert className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{currentLang === 'fr' ? 'Les 10 Règles Essentielles de Sécurité' : 'The 10 Essential Safety Rules'}</h3>
                    <p className="text-gray-600">{currentLang === 'fr' ? 'Le code de conduite sur les pistes' : 'The Code of Conduct on the Slopes'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3 font-semibold">{currentLang === 'fr' ? 'Les règles fondamentales à respecter absolument :' : 'The fundamental rules to absolutely respect:'}</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Respect d\'autrui' : 'Respect for Others'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Ne pas mettre les autres en danger par son comportement ou son matériel' : 'Do not endanger others through your behavior or equipment.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Maîtrise vitesse & comportement' : 'Speed ​​and Behavior Control'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Adapter son comportement à ses capacités, terrain, météo, neige et trafic' : 'Adapt your behavior to your abilities, the terrain, weather, snow conditions, and traffic.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Direction par l\'amont' : 'Uphill Direction'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Choisir sa trajectoire pour préserver la sécurité des personnes en aval' : 'Choose your trajectory to ensure the safety of those below you.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Dépassement' : 'Overtaking'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Dépasser largement par l\'amont/aval, droite/gauche, en anticipant les évolutions' : 'Overtake well uphill/downhill, right/left, anticipating changes in direction.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Croisement & départ' : 'Crossing and Starting Out'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Vérifier amont et aval avant de s\'engager sur une piste' : 'Check uphill and downhill before entering a slope.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Stationnement' : 'Parking'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Éviter passages étroits/sans visibilité, libérer la piste rapidement après chute' : 'Avoid narrow/blind spots, clear the slope quickly after a fall.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">7</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Montée/descente à pied' : 'Walking Uphill/Downhill'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Utiliser le bord de la piste, veiller à ne pas être un danger pour autrui' : 'Use the edge of the slope, be careful not to be a danger to others.'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">8</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Respect balisage & signalisation' : 'Respect for Markings and Signage'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Tenir compte météo, état pistes/neige, respecter balisage et signalisation' : 'Take into account the weather, slope/snow conditions, and respect the markings and signage'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">9</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Assistance' : 'Assistance'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Prêter assistance en cas d\'accident, donner l\'alerte, se mettre à disposition des secours' : 'Provide assistance in case of an accident, raise the alarm, and make yourself available to emergency services'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">10</div>
                        <div>
                          <span className="font-semibold text-gray-900">{currentLang === 'fr' ? 'Identification' : 'Identification'}</span>
                          <p className="text-gray-600 text-sm">{currentLang === 'fr' ? 'Faire connaître son identité auprès des secours et/ou des tiers en cas d\'accident' : 'Provide your identity to emergency services and/or third parties in case of an accident'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-100">
                      <p className="text-gray-700 mb-2">⚠️ <strong>{currentLang === 'fr' ? 'Conseil du moniteur :' : 'Instructor\'s tip:'}</strong></p>
                      <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span className="text-gray-700">{currentLang === 'fr' ? 'Ces règles assurent la sécurité de tous sur les pistes. Respectez-les et profitez pleinement de votre ski !' : 'These rules ensure everyone\'s safety on the slopes. Respect them and fully enjoy your skiing!'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Encart Le Lagon - Centre Aqua-Sportif */}
            <div className="mt-12">
              <div className="group relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Décoration de fond */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                        <span className="text-4xl">🏊</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        📍 {currentLang === 'fr' ? 'Le Lagon Tignes — Centre Aqua-Sportif & Bien-être' : 'Le Lagon Tignes — Aquatic Sports & Wellness Center'} 🏊‍♂️
                      </h3>
                      <p className="text-xl text-white/90 mb-4">
                        {currentLang === 'fr' ? 'Le centre aquatique complet de Tignes Le Lac : bien-être, fitness et récupération après-ski !' : 'The complete aquatic center in Tignes Le Lac: wellness, fitness, and après-ski recovery!'}
                        <br />
                        <span className="text-yellow-300 font-semibold">*({currentLang === 'fr' ? 'Face à la Maison de Tignes - accessible à tous' : 'Opposite the Maison de Tignes - accessible to all'})*</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Horaires */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🕒</span>
                        {currentLang === 'fr' ? 'Horaires (Saison hiver 2025-2026)' : 'Opening Hours (Winter Season 2025-2026)'}
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">📅 {currentLang === 'fr' ? 'Période : 22 novembre 2025 → 3 mai 2026' : 'Dates: November 22, 2025 → May 3, 2026'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">✓</span>
                              <span><strong>{currentLang === 'fr' ? 'Ouvert tous les jours :' : 'Open daily:'}</strong> {currentLang === 'fr' ? '11h00 → 20h30' : '11:00 AM → 8:30 PM'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>{currentLang === 'fr' ? 'Dernière entrée :' : 'Last entry:'}</strong> {currentLang === 'fr' ? '1 heure avant fermeture' : '1 hour before closing'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>{currentLang === 'fr' ? 'Évacuation bassins :' : 'Pools cleared:'}</strong> {currentLang === 'fr' ? '30 min avant fermeture' : '30 minutes before closing'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">💪</span>
                              <span><strong>{currentLang === 'fr' ? 'Espace fitness :' : 'Fitness area:'}</strong> {currentLang === 'fr' ? 'accessible dès 09h00' : 'accessible from 9:00 AM'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white/80 text-sm">
                            <strong>📍 {currentLang === 'fr' ? 'Situé à Tignes Le Lac, face à la Maison de Tignes' : 'Located in Tignes Le Lac, opposite the Maison de Tignes'}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Activités proposées */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🏊</span>
                        {currentLang === 'fr' ? 'Activités proposées' : 'Activities offered'}
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">1️⃣ {currentLang === 'fr' ? 'Espace aquatique' : 'Aquatic area'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">🏊</span>
                              <span><strong>{currentLang === 'fr' ? 'Bassin sportif 25m' : '25m lap pool'}</strong> : {currentLang === 'fr' ? 'nage, entraînement, récupération' : 'swimming, training, relaxation'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">🎢</span>
                              <span><strong>{currentLang === 'fr' ? 'Bassin ludique' : 'Leisure pool'}</strong> : {currentLang === 'fr' ? 'toboggan 3 pistes, cascade, lits à bulles' : '3-lane water slide, waterfall, bubble beds'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-yellow-300">👶</span>
                              <span><strong>{currentLang === 'fr' ? 'Pataugeoire enfants' : 'Children\'s paddling pool'}</strong> : {currentLang === 'fr' ? 'zone peu profonde sécurisée' : 'shallow area secure pool'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">2️⃣ {currentLang === 'fr' ? 'Espace bien-être' : 'Wellness Area'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">🔥</span>
                              <span><strong>{currentLang === 'fr' ? 'Sauna' : 'Sauna'}</strong> et <strong>{currentLang === 'fr' ? 'Hammam' : 'Hammam'}</strong> ({currentLang === 'fr' ? 'selon billet' : 'depending on ticket'})</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-purple-300">💆</span>
                              <span><strong>{currentLang === 'fr' ? 'Zones détente' : 'Relaxation areas'}</strong> : {currentLang === 'fr' ? 'relaxation musculaire après-ski' : 'muscle relaxation after skiing'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">3️⃣ {currentLang === 'fr' ? 'Fitness & musculation' : 'Fitness & Weight Training'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-red-300">💪</span>
                              <span><strong>{currentLang === 'fr' ? 'Salle cardio' : 'Cardio and strength training room'}</strong> {currentLang === 'fr' ? 'et renforcement musculaire' : ''}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-pink-300">🏃</span>
                              <span><strong>{currentLang === 'fr' ? 'Cours collectifs' : 'Group classes'}</strong> : {currentLang === 'fr' ? 'HIIT, Bike, Stretching, CAF' : 'HIIT, Cycling, Stretching, Core & Abs'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pourquoi les skieurs y vont */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎿</span>
{currentLang === 'fr' ? 'Pourquoi beaucoup de skieurs y vont ?' : 'Why do so many skiers go here?'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                      <div>
<p className="font-semibold text-white mb-2">{currentLang === 'fr' ? 'Cas typique à Tignes :' : 'Typical case in Tignes:'}</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-green-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Récupération musculaire' : 'Muscle recovery'}</strong> {currentLang === 'fr' ? 'après ski intense' : 'after intense skiing'}</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-blue-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Travail cardio' : 'Cardio workout'}</strong> {currentLang === 'fr' ? 'hors altitude (bénéfique)' : 'at lower altitudes (beneficial)'}</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-yellow-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Alternative mauvais temps' : 'Alternative for bad weather'}</strong> {currentLang === 'fr' ? 'quand pistes fermées' : 'when the slopes are closed'}</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-purple-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Sortie famille' : 'Family outing'}</strong> {currentLang === 'fr' ? 'après journée sur les pistes' : 'after a day on the slopes'}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
<p className="font-semibold text-white mb-2">🔥 {currentLang === 'fr' ? 'Le combo gagnant :' : 'The winning combination:'}</p>
                        <div className="bg-white/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
<p className="text-lg font-bold text-yellow-300 mb-2">
                            {currentLang === 'fr' ? 'Ski → Sauna → Bassin chaud' : 'Skiing → Sauna → Hot tub'}
                          </p>
<p className="text-white/80 text-sm">
                            {currentLang === 'fr' ? 'Presque un protocole officieux de survie alpine !' : 'Almost an unofficial alpine survival protocol!'}<br/>
                            {currentLang === 'fr' ? 'Récupération, décontraction et bien-être garanti.' : 'Recovery, relaxation, and well-being guaranteed.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conseils pratiques */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
{currentLang === 'fr' ? 'Conseils pratiques' : 'Practical Tips'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-300">⏰</span>
<span className="font-semibold text-white">{currentLang === 'fr' ? 'Pic d\'affluence' : 'Peak Hours'}</span>
                        </div>
                        <p className="text-sm text-white/80">
<strong>{currentLang === 'fr' ? '16h30–18h30' : '4:30 PM–6:30 PM'}</strong> ({currentLang === 'fr' ? 'retour des pistes' : 'when skiers return'})<br/>
                          {currentLang === 'fr' ? 'Éviter si possible pour plus de confort' : 'Avoid if possible for a more comfortable experience'}
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-300">✨</span>
<span className="font-semibold text-white">{currentLang === 'fr' ? 'Meilleur créneau' : 'Best Time'}</span>
                        </div>
                        <p className="text-sm text-white/80">
<strong>{currentLang === 'fr' ? '11h–14h' : '11 AM–2 PM'}</strong> : {currentLang === 'fr' ? 'plus calme,' : 'quieter,'}<br/>
                          {currentLang === 'fr' ? 'bassins disponibles, ambiance détendue' : 'pools available, relaxed atmosphere'}
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-300">🎒</span>
<span className="font-semibold text-white">{currentLang === 'fr' ? 'Équipement requis' : 'Required Equipment'}</span>
                        </div>
                        <p className="text-sm text-white/80">
<strong>{currentLang === 'fr' ? 'Bonnet + claquettes' : 'Swim cap and flip-flops'}</strong> :<br/>
                          {currentLang === 'fr' ? 'obligatoires selon périodes' : 'required depending on the season'}<br/>
                          ({currentLang === 'fr' ? 'prévoir serviette aussi' : 'bring a towel too'})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lien utile */}
                  <div className="mt-6 text-center">
                    <a 
                      href="https://www.tignes.net/activites/ete/lagon" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">🏊</span>
                      <span>{currentLang === 'fr' ? 'Voir le site officiel du Lagon' : 'See the official Lagoon website'}</span>
                      <span className="text-sm">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section séparée - Sports Complex Val-d'Isère */}
          </div>
      </section>

      {/* Section Sports Complex Val-d'Isère */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto max-w-6xl">
          <div className="group relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Décoration de fond */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                    <span className="text-4xl">🏊‍♂️</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    📍 {currentLang === 'fr' ? 'Sports Complex Val-d\'Isère — Centre Aqua-Sportif & Bien-être' : 'Val-d\'Isère Sports Complex — Aquatic Sports & Wellness Center'} 🏋️‍♀️
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    {currentLang === 'fr' ? 'Un grand complexe aquatique, sportif et bien-être idéal après les pistes !' : 'A large aquatic, sports, and wellness complex, ideal after a day on slopes!'}
                    <br />
                    <span className="text-yellow-300 font-semibold">*({currentLang === 'fr' ? '370 rue de la Face, Val-d\'Isère - Alpes, France' : '370 rue de la Face, Val-d\'Isère - Alps, France'})*</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Horaires */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🕒</span>
                    {currentLang === 'fr' ? 'Horaires hiver (1er janvier → 3 mai 2026)' : 'Winter Hours (January 1st → May 3rd, 2026)'}
                  </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">✔️ {currentLang === 'fr' ? 'Ouverture quotidienne :' : 'Daily Opening Hours:'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Lundi' : 'Monday'}:</strong> {currentLang === 'fr' ? '10h00 → 21h00' : '10:00 AM → 9:00 PM'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Mardi' : 'Tuesday'}:</strong> {currentLang === 'fr' ? '07h30 → 21h00' : '7:30 AM → 9:00 PM'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Mercredi' : 'Wednesday'}:</strong> {currentLang === 'fr' ? '10h00 → 22h00 (nocturne)' : '10:00 AM → 10:00 PM (late opening)'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Jeudi' : 'Thursday'}:</strong> {currentLang === 'fr' ? '10h00 → 21h00' : '10:00 AM → 9:00 PM'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Vendredi' : 'Friday'}:</strong> {currentLang === 'fr' ? '10h00 → 21h00' : '10:00 AM → 9:00 PM'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Samedi' : 'Saturday'}:</strong> {currentLang === 'fr' ? '10h00 → 21h00' : '10:00 AM → 9:00 PM'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>{currentLang === 'fr' ? 'Dimanche' : 'Sunday'}:</strong> {currentLang === 'fr' ? '07h30 → 21h00' : '7:30 AM → 9:00 PM'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>{currentLang === 'fr' ? 'Évacuation de l\'eau' : 'Water Drainage'}:</strong> {currentLang === 'fr' ? '30 min avant fermeture' : '30 minutes prior Closing time'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>{currentLang === 'fr' ? 'Caisses ferment' : 'Ticket office closes'}:</strong> {currentLang === 'fr' ? '1h avant fermeture' : '1 hour before closing time'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">💪</span>
                              <span><strong>{currentLang === 'fr' ? 'Bassin sportif & fitness' : 'Sports & Fitness Pool'}:</strong> {currentLang === 'fr' ? 'dès 7h30 (mar & dim)' : 'from 7:30 am (Tue & Sun)'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activités proposées */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🏊‍♂️</span>
  {currentLang === 'fr' ? 'Activités proposées' : 'Activities offered'}
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">{currentLang === 'fr' ? 'Espace aquatique' : 'Aquatic Area'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">🏊</span>
                              <span><strong>{currentLang === 'fr' ? 'Piscine sportive 25m' : '25m Sports Pool'}:</strong> {currentLang === 'fr' ? 'natation et entraînement' : 'swimming and training'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">🌊</span>
                              <span><strong>{currentLang === 'fr' ? 'Grand bassin ludique (~416m²)' : 'Large Leisure Pool (~416m²)'}:</strong> {currentLang === 'fr' ? 'jets massants, rivière à contre-courant' : 'massage jets, counter-current river'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-yellow-300">👶</span>
                              <span><strong>{currentLang === 'fr' ? 'Pataugeoire & banquettes bulles' : 'Paddling Pool & Bubble Benches'}:</strong> {currentLang === 'fr' ? 'espace familial' : 'family area'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">🧖‍♀️ {currentLang === 'fr' ? 'Bien-être / relaxation' : 'Wellness / Relaxation'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">🔥</span>
                              <span><strong>{currentLang === 'fr' ? 'Sauna' : 'Sauna'}</strong> et <strong>{currentLang === 'fr' ? 'Hammam' : 'Hammam'}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-purple-300">💆</span>
                              <span><strong>{currentLang === 'fr' ? 'Jacuzzi et zones détente' : 'Jacuzzi and relaxation areas'}:</strong> {currentLang === 'fr' ? 'récupération musculaire' : 'muscle recovery'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">🏋️ {currentLang === 'fr' ? 'Fitness & sport' : 'Fitness & Sport'}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-red-300">💪</span>
                              <span><strong>{currentLang === 'fr' ? 'Salle cardio & musculation' : 'Cardio & Weight Training Room'}:</strong> {currentLang === 'fr' ? 'équipement complet' : 'fully equipped'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-pink-300">🏃</span>
                              <span><strong>{currentLang === 'fr' ? 'Cours collectifs' : 'Group Classes'}:</strong> {currentLang === 'fr' ? 'selon saison' : 'depending on the season'}</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-cyan-300">🎾</span>
                              <span><strong>{currentLang === 'fr' ? 'Sports indoor' : 'Indoor Sports'}:</strong> {currentLang === 'fr' ? 'badminton, squash, escalade...' : 'badminton, squash, climbing...'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pourquoi les skieurs y vont */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎿</span>
{currentLang === 'fr' ? 'Pourquoi y aller à Val d\'Isère ?' : 'Why go to Val d\'Isère?'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                      <div>
<p className="font-semibold text-white mb-2">{currentLang === 'fr' ? 'Souvent choisi par les skieurs pour :' : 'Often chosen by skiers for:'}</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-green-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Détente musculaire' : 'Muscle relaxation'}</strong> {currentLang === 'fr' ? 'après les pistes' : 'after the slopes'}</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-blue-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Natation / récupération cardio' : 'Swimming / cardio recovery'}</strong> {currentLang === 'fr' ? 'hors altitude' : 'at altitude'}</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-yellow-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Activités indoor' : 'Indoor activities'}</strong> {currentLang === 'fr' ? 'quand il fait mauvais' : 'when the weather is bad'}</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-purple-300 mt-1">✓</span>
<span><strong>{currentLang === 'fr' ? 'Espace bien-être complet' : 'Complete wellness area'}</strong> ({currentLang === 'fr' ? 'sauna, hammam...' : 'sauna, hammam...'})</span>
                          </li>
                        </ul>
<p className="font-semibold text-white mb-2">🏆 {currentLang === 'fr' ? 'L\'équivalent du Lagon Tignes :' : 'The equivalent of the Tignes Lagoon:'}</p>
                            <div className="bg-white/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
                              <p className="text-lg font-bold text-yellow-300 mb-2">
                                <strong>{currentLang === 'fr' ? 'Plus grand et plus complet !' : 'Bigger and more complete!'}</strong>
                              </p>
                              <p className="text-white/80 text-sm">
                                {currentLang === 'fr' ? 'Piscine + fitness + bien-être après le ski' : 'Swimming pool + fitness + wellness after skiing'}<br/>
                                {currentLang === 'fr' ? 'Le combo parfait pour la récupération à Val d\'Isère !' : 'The perfect combination for recovery in Val d\'Isère!'}
                              </p>
                            </div>
                          </div>

                  {/* Espace enfants */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">👶</span>
{currentLang === 'fr' ? 'Espace enfants et animations' : 'Kids\' area and entertainment'}
                    </h4>
                    <div className="text-white/90">
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <p className="text-sm">
<strong>🎈 {currentLang === 'fr' ? 'Espace enfants avec activités adaptées' : 'Kids\' area with adapted activities'}</strong> {currentLang === 'fr' ? 'et animations ponctuelles pour toute la famille !' : 'and occasional entertainment for the whole family!'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lien utile */}
                  <div className="mt-6 text-center">
                    <a 
                      href="https://www.valdisere.com/bien-etre/centre-aquasportif/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">🏊‍♂️</span>
<span>{currentLang === 'fr' ? 'Voir le site officiel du Sports Complex' : 'See the official Sports Complex website'}</span>
                      <span className="text-sm">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Bars & Vie nocturne Tignes */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Décoration de fond */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                    <span className="text-4xl">🍹</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {currentLang === 'fr' 
                      ? 'Bars et vie nocturne à Tignes 🎿🍹'
                      : 'Bars & Nightlife in Tignes 🎿🍹'
                    }
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    {currentLang === 'fr' 
                      ? 'Une sélection de bars branchés et animés, parfaits pour l\'après-ski, un verre entre amis ou pour faire la fête !'
                      : 'A selection of trendy and lively bars, perfect for après-ski, a drink with friends or for partying!'
                    }
                  </p>
                  <p className="text-indigo-300 mt-1">🎶</p>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">⭐</span>
                        <div>
                          <strong className="text-white">Le Studio</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Bar très apprécié • Ambiance festive en soirée • 4,7/5'
                              : 'Very popular bar • Festive evening atmosphere • 4.7/5'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-300 mt-1">🍺</span>
                        <div>
                          <strong className="text-white">Bar intérieur</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Ambiance conviviale • Belle carte des boissons • Après-ski animé • 4,6/5'
                              : 'Friendly atmosphere • Great drink menu • Lively après-ski • 4.6/5'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-pink-300 mt-1">🎯</span>
                        <div>
                          <strong className="text-white">Ranga's Bar</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Bar très populaire • Happy Hour • Diffusion de matchs • Bonne ambiance • 4,9/5'
                              : 'Very popular bar • Happy Hour • Sports broadcasts • Great atmosphere • 4.9/5'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-300 mt-1">🔥</span>
                        <div>
                          <strong className="text-white">Arobaze</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Ambiance décontractée • Cocktails • Au cœur de Val Claret • 4,4/5'
                              : 'Relaxed atmosphere • Cocktails • In the heart of Val Claret • 4.4/5'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-pink-300 mt-1">🥃</span>
                        <div>
                          <strong className="text-white">Granite-bar</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Bar à cocktails cosy • Branché • Happy Hour populaire • 4,5/5'
                              : 'Cosy cocktail bar • Trendy • Popular Happy Hour • 4.5/5'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-300 mt-1">🍷</span>
                        <div>
                          <strong className="text-white">Le Caveau</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Petit bar sympa • Belle carte des boissons • 4,6/5'
                              : 'Nice little bar • Great drink menu • 4.6/5'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                      </div>

                    {/* Spots après-ski */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🍻</span>
                        {currentLang === 'fr' 
                          ? 'Val Claret - Après-ski & Music Bars 🔥'
                          : 'Val Claret - Après-Ski & Music Bars 🔥'
                        }
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-orange-300 mt-1">🎿</span>
                            <div>
                              <strong className="text-white">The Corridor | Bar & Restaurant</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Après-ski classique • Bières pression • Snacks • Musique • 4,7/5'
                                : 'Classic après-ski • Draft beers • Snacks • Music • 4.7/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-red-300 mt-1">🎉</span>
                            <div>
                              <strong className="text-white">Cocorico Après Ski</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Concept après-ski original • Terrasse • Piste de danse • 4,1/5'
                                : 'Original après-ski concept • Terrace • Dance floor • 4.1/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-cyan-300 mt-1">🍻</span>
                            <div>
                              <strong className="text-white">The Whitney Bar</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Bar convivial • Ouvert en début et fin de soirée • Bonne ambiance • 4,5/5'
                                : 'Friendly bar • Open early and late evening • Good atmosphere • 4.5/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-green-300 mt-1">🍀</span>
                            <div>
                              <strong className="text-white">Tom Crean's Pub</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Pub irlandais • Ambiance décontractée • Bières • 4,1/5'
                                : 'Irish pub • Relaxed atmosphere • Beers • 4.1/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-blue-300 mt-1">🌟</span>
                            <div>
                              <strong className="text-white">L'Embuscade Tignes</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Bar animé • Clientèle locale • Soirées • 4,5/5'
                                : 'Lively bar • Local clientele • Parties • 4.5/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-cyan-300 mt-1">🍽</span>
                            <div>
                              <strong className="text-white">Loop Bar & Restaurant</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Bon endroit • Boissons et restauration • 4,2/5'
                                : 'Good place • Drinks and dining • 4.2/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-300 mt-1">🎶</span>
                            <div>
                              <strong className="text-white">247 Bar – The Twenty Four Seven</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Bar dansant avec DJ en soirée • Ambiance nocturne'
                                : 'Dancing bar with evening DJ • Nighttime atmosphere'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clubs */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🕺</span>
                        {currentLang === 'fr' 
                          ? 'Val Claret - Clubs 🔥'
                          : 'Val Claret - Clubs 🔥'
                        }
                      </h4>
                      <div className="space-y-3 mb-4">
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-pink-300 mt-1">🎧</span>
                            <div>
                              <strong className="text-white">Avant Garde Tignes</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Boîte de nuit • Ouvert tard • Musique variée • 3,8/5'
                                : 'Nightclub • Open late • Varied music • 3.8/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-purple-300 mt-1">💃</span>
                            <div>
                              <strong className="text-white">Blue Girl Nightclub</strong>
                              <p className="text-white/80 text-xs">
                              {currentLang === 'fr' 
                                ? 'Club populaire • Tôt le matin • Danse • 3,3/5'
                                : 'Popular club • Early morning • Dancing • 3.3/5'
                              }
                            </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-white/90 text-sm">
                          <strong className="text-white">
                            {currentLang === 'fr' 
                              ? '💡 Conseils pour les soirées à Val Claret :'
                              : '💡 Tips for nights out in Val Claret:'
                            }
                          </strong>{' '}
                          {currentLang === 'fr' 
                            ? "L'ambiance commence souvent par l'après-ski vers 15h-17h, puis se transforme en une soirée musicale (bars et clubs), et beaucoup se retrouvent en boîte après 23h."
                            : "The atmosphere often starts with après-ski around 3-5 PM, then turns into a musical evening (bars and clubs), and many end up in clubs after 11 PM."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline et badges */}
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-center">
                      {currentLang === 'fr' 
                        ? '🌙 Timeline d\'une nuit typique à Val Claret'
                        : '🌙 Typical Night Timeline in Val Claret'
                      }
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">15h-17h</div>
                        </div>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Début de l\'après-ski'
                            : 'Après-ski starts'
                          }
                        </p>
                        <p className="text-yellow-300 text-xs font-semibold">The Corridor • Cocorico</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">18h-20h</div>
                        </div>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Happy hour et dîner'
                            : 'Happy hour and dinner'
                          }
                        </p>
                        <p className="text-blue-300 text-xs font-semibold">
                          {currentLang === 'fr' 
                            ? 'The Studio • Bar intérieur'
                            : 'The Studio • Indoor bar'
                          }
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">21h-23h</div>
                        </div>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Bars animés'
                            : 'Lively bars'
                          }
                        </p>
                        <p className="text-purple-300 text-xs font-semibold">Ranga's • Arobaze</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-red-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">23h+</div>
                        </div>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Soirée en boîte'
                            : 'Club time'
                          }
                        </p>
                        <p className="text-red-300 text-xs font-semibold">Avant Garde • Blue Girl</p>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 text-center">
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                        {currentLang === 'fr' 
                          ? '🎯 Ambiance plus locale et authentique que Val d\'Isère'
                          : '🎯 More local and authentic atmosphere than Val d\'Isère'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </section>

      {/* Tignes Other Villages Nightlife */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tignes Le Lac */}
            <div className="group relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="relative z-10 p-6">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🍻</span>
                  {currentLang === 'fr' 
                    ? 'Tignes Le Lac (plus central, ambiance mixte)'
                    : 'Tignes Le Lac (more central, mixed atmosphere)'
                  }
                </h4>
                <p className="text-white/90 text-sm mb-4">
                  {currentLang === 'fr' 
                    ? 'Ambiance animée mais un peu moins "club" que Val Claret'
                    : 'Lively atmosphere but a little less "club-like" than Val Claret'
                  }
                </p>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-300 mt-1">🌟</span>
                      <div>
                        <strong className="text-white">L'Embuscade Tignes Le Lac</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Bonne ambiance, populaire'
                            : 'Good atmosphere, popular'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-green-300 mt-1">🎓</span>
                      <div>
                        <strong className="text-white">Jam Bar</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Soirées étudiantes / saisonniers'
                            : 'Student/seasonal worker nights'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-300 mt-1">🎵</span>
                      <div>
                        <strong className="text-white">The Marmot Arms</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Pub chaleureux avec musique live selon périodes'
                            : 'Cozy pub with live music depending on season'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tignes Lavachet */}
            <div className="group relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="relative z-10 p-6">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">😌</span>
                  {currentLang === 'fr' 
                    ? 'Tignes Lavachet (plus local & détendu)'
                    : 'Tignes Lavachet (more local & relaxed)'
                  }
                </h4>
                <p className="text-white/90 text-sm mb-4">
                  {currentLang === 'fr' 
                    ? 'Plus petit, ambiance conviviale'
                    : 'Smaller, friendly atmosphere'
                  }
                </p>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-300 mt-1">🔥</span>
                      <div>
                        <strong className="text-white">Le Brasero</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Bar-restaurant chaleureux'
                            : 'Cozy bar-restaurant'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-1">⭐</span>
                      <div>
                        <strong className="text-white">TC's Bar</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Petit bar apprécié des saisonniers'
                            : 'Small bar popular with seasonal workers'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tignes Les Brévières */}
            <div className="group relative bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="relative z-10 p-6">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏔️</span>
                  {currentLang === 'fr' 
                    ? 'Tignes Les Brévières (village + authentique)'
                    : 'Tignes Les Brévières (village + more authentic)'
                  }
                </h4>
                <p className="text-white/90 text-sm mb-4">
                  {currentLang === 'fr' 
                    ? 'Ambiance plus cosy, moins clubbing'
                    : 'Cozier atmosphere, less clubbing'
                  }
                </p>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-300 mt-1">🎵</span>
                      <div>
                        <strong className="text-white">The Underground Bar</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Bonne ambiance et musique'
                            : 'Good atmosphere and music'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <span className="text-red-300 mt-1">🐂</span>
                      <div>
                        <strong className="text-white">Black Bull Pub</strong>
                        <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Pub convivial après-ski'
                            : 'Friendly après-ski pub'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé rapide */}
          <div className="mt-8 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h4 className="text-xl font-bold text-white mb-4 text-center bg-white/20 inline-block px-4 py-2 rounded-lg">
              🎉 {currentLang === 'fr' ? 'Résumé rapide' : 'Quick summary'}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors duration-200">
                <span className="text-3xl mb-3 block">🔥</span>
                <strong className="text-white text-base">
                  {currentLang === 'fr' ? 'Fête forte' : 'Big party'}
                </strong>
                <p className="text-gray-200 text-sm mt-2 font-semibold">→ Val Claret</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors duration-200">
                <span className="text-3xl mb-3 block">🍻</span>
                <strong className="text-white text-base">
                  {currentLang === 'fr' ? 'Après-ski terrasse' : 'Après-ski terrace'}
                </strong>
                <p className="text-gray-200 text-sm mt-2 font-semibold">→ Cocorico</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors duration-200">
                <span className="text-3xl mb-3 block">🍸</span>
                <strong className="text-white text-base">
                  {currentLang === 'fr' ? 'Bar cocktails' : 'Cocktail bar'}
                </strong>
                <p className="text-gray-200 text-sm mt-2 font-semibold">→ Granite Bar</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors duration-200">
                <span className="text-3xl mb-3 block">🕺</span>
                <strong className="text-white text-base">
                  {currentLang === 'fr' ? 'Club tardif' : 'Late club'}
                </strong>
                <p className="text-gray-200 text-sm mt-2 font-semibold">→ Avant Garde</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-200">
                😌 {currentLang === 'fr' 
                  ? 'Ambiance plus détendue et locale → Lavachet ou Les Brévières'
                  : 'More relaxed and local atmosphere → Lavachet or Les Brévières'
                }
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Nightlife & Après-Ski Section - Val d'Isère */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Décoration de fond */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                    <span className="text-4xl">🍸</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {currentLang === 'fr' ? 'Vie nocturne et après-ski à Val d\'Isère 🎿🍸' : 'Nightlife & Après-Ski in Val d\'Isère 🎿🍸'}
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    {currentLang === 'fr' 
                      ? 'Découvrez les meilleurs bars et clubs pour des soirées inoubliables au cœur des Alpes 🎿🍸\n*(Ambiance souvent plus festive et internationale qu\'à Tignes)*'
                      : 'Discover the best bars and clubs for unforgettable nights out in the heart of the Alps 🎿🍸\n*(Often a more festive and "international" atmosphere than in Tignes)*'
                    }
                  </p>
                  <p className="text-indigo-300 mt-1">
                    {currentLang === 'fr' 
                      ? '*(Ambiance souvent plus festive et internationale qu\'à Tignes)*'
                      : '*(Often a more festive and "international" atmosphere than in Tignes)*'
                    }
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Bars & Apéro animés */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍸</span>
                    {currentLang === 'fr' ? 'Bars animés et après-ski' : 'Lively Bars & Après-Ski'}
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">⭐</span>
                        <div>
                          <strong className="text-white">Cocorico</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Icône • Terrasse • DJ en live • Ambiance festive'
                            : 'Iconic • Terrace • Live DJ • Festive atmosphere'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-pink-300 mt-1">🎭</span>
                        <div>
                          <strong className="text-white">La Folie Douce</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Légendaire • Spectacles • Champagne • Au pied des pistes'
                            : 'Legendary • Shows • Champagne • At the foot of the slopes'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-300 mt-1">🍹</span>
                        <div>
                          <strong className="text-white">Dick's Tea Bar</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Institution • Bar + Club • Très animé'
                            : 'Institution • Bar + Club • Very lively'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spots premium */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍻</span>
                    {currentLang === 'fr' ? 'Lieux conviviaux et haut de gamme' : 'Friendly & Upscale Places'}
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-300 mt-1">🎸</span>
                        <div>
                          <strong className="text-white">Le Petit Danois</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Pub populaire • Musique live • International'
                            : 'Popular pub • Live music • International'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-300 mt-1">🍺</span>
                        <div>
                          <strong className="text-white">The Underground Bar</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Détendu • DJ en soirée • Ambiance chill'
                            : 'Relaxed • Evening DJ • Chill atmosphere'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-300 mt-1">🥃</span>
                        <div>
                          <strong className="text-white">The M Bar</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Cocktails • Cadre cosy • Moderne'
                            : 'Cocktails • Cosy setting • Modern'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clubs */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🕺</span>
                    {currentLang === 'fr' ? 'Clubs / Soirée tardive' : 'Clubs / Late Night'}
                  </h4>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">🕺</span>
                        <div>
                          <strong className="text-white">Doudoune Club</strong>
                          <p className="text-white/80 text-xs">
                          {currentLang === 'fr' 
                            ? 'Légendaire • DJ internationaux • Premium'
                            : 'Legendary • International DJs • Premium'
                          }
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white/90 text-sm">
                      <strong className="text-white">
                        {currentLang === 'fr' 
                          ? '💡 Bons plans Val d\'Isère Nightlife :'
                          : '💡 Val d\'Isère Nightlife Tips:'
                        }
                      </strong> 
                      {currentLang === 'fr' 
                        ? ' Ambiance huppée, clientèle internationale, après-ski à partir de 15h30, bars animés de 21h à 23h, clubs à partir de 23h30.'
                        : ' Upscale atmosphere, international clientele, après-ski from 3:30 PM, lively bars from 9-11 PM, clubs from 11:30 PM.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline et badges */}
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-center">
                    {currentLang === 'fr' 
                      ? '🌙 Chronologie de la vie nocturne Premium de Val d\'Isère'
                      : '🌙 Val d\'Isère Premium Nightlife Timeline'
                    }
                  </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '15h30 - 16h' : '3:30 PM - 4:00 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Après-ski Premium' : 'Premium Après-Ski'}</p>
                    <p className="text-yellow-300 text-xs font-semibold">{currentLang === 'fr' ? 'Cocorico • Folie Douce' : 'Cocorico • La Folie Douce'}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '19h30 - 21h' : '7:30 PM - 9:00 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">
                      {currentLang === 'fr' ? 'Dîner chic' : 'Fine dining'}
                    </p>
                    <p className="text-pink-300 text-xs font-semibold">{currentLang === 'fr' ? 'Restaurants haut de gamme' : 'Upscale Restaurants'}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '21h00 - 23h00' : '9:00 PM - 11:00 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">
                      {currentLang === 'fr' ? 'Bars animés' : 'Lively bars'}
                    </p>
                    <p className="text-purple-300 text-xs font-semibold">{currentLang === 'fr' ? 'Dick\'s • Petit Danois' : 'Dick\'s • Le Petit Danois'}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">23h30+</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Temps du club' : 'Club Time'}</p>
                    <p className="text-red-300 text-xs font-semibold">{currentLang === 'fr' ? 'Club Doudoune' : 'Doudoune Club'}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 text-center">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    {currentLang === 'fr' 
                      ? '🎯 Ambiance de fête haut de gamme • Clientèle internationale • Plus haut de gamme que Tignes'
                      : '🎯 High-end party atmosphere • International clientele • More upscale than Tignes'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nightlife & Après-Ski Section - Les Arcs */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Décoration de fond */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                    <span className="text-4xl">🎿</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {currentLang === 'fr' 
                      ? 'Vie nocturne et après-ski aux Arcs 🎿🍹'
                      : 'Nightlife & Après-Ski in Les Arcs 🎿🍹'
                    }
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    {currentLang === 'fr' 
                      ? 'Une sélection de bars branchés et animés aux Arcs (Savoie) — parfaits pour l\'après-ski, un verre entre amis ou faire la fête ! 🍸'
                      : 'A selection of trendy and lively bars in Les Arcs (Savoie) — perfect for après-ski, a drink with friends, or partying! 🍸'
                    }
                    <br />
                    <span className="text-yellow-300 font-semibold">
                      {currentLang === 'fr' 
                        ? '(L\'ambiance varie selon le village : Arc 1800 = très festif, Arc 1950 = chic et cosy, Arc 2000 = plus sportif, Arc 1600 = plus décontracté)'
                        : '(The atmosphere varies by village: Arc 1800 = very festive, Arc 1950 = chic and cozy, Arc 2000 = more sporty, Arc 1600 = more relaxed)'
                      }
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Bars & Apéro animés */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍸</span>
                    {currentLang === 'fr' 
                      ? 'Bars animés et happy hours'
                      : 'Lively Bars & Happy Hours'
                    }
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">⭐</span>
                        <div>
                          <strong className="text-white">Red Hot Saloon</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Une institution après-ski aux Arcs 1800. Terrasse ensoleillée, DJ, ambiance festive dès 16h.'
                              : 'An après-ski institution in Arcs 1800. Sunny terrace, DJ, festive atmosphere from 4 PM.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-pink-300 mt-1">🎭</span>
                        <div>
                          <strong className="text-white">Chez Boubou</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Bar animé, cocktails, bonne musique et clientèle internationale.'
                              : 'Lively bar, cocktails, good music and international clientele.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-300 mt-1">🍹</span>
                        <div>
                          <strong className="text-white">The George</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Pub élégant et convivial, idéal pour commencer la soirée dans une ambiance chic.'
                              : 'Elegant and friendly pub, ideal for starting the evening in a chic atmosphere.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-300 mt-1">🍺</span>
                        <div>
                          <strong className="text-white">O'Chaud</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Ambiance chaleureuse, idéal pour un apéritif décontracté avant de sortir.'
                              : 'Warm atmosphere, ideal for a relaxed drink before going out.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-300 mt-1">🍹</span>
                        <div>
                          <strong className="text-white">L'Aiguille Grive Bar</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Terrasse agréable et ambiance conviviale, superbe endroit pour admirer le coucher du soleil.'
                              : 'Pleasant terrace and friendly atmosphere, superb spot to watch the sunset.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spots après-ski & lieux conviviaux */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍻</span>
                    {currentLang === 'fr' 
                      ? 'Spots après-ski & lieux conviviaux'
                      : 'Après-Ski Spots & Friendly Places'
                    }
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-green-300 mt-1">🌴</span>
                        <div>
                          <strong className="text-white">Jungle Café</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Ambiance festive avec DJ et piste de danse, très populaire en saison.'
                              : 'Festive atmosphere with DJ and dance floor, very popular in season.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-300 mt-1">🐑</span>
                        <div>
                          <strong className="text-white">Black Sheep Pub</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Pub animé avec retransmission de matchs, bières pression et une ambiance internationale.'
                              : 'Lively pub with sports broadcasts, draft beers and international atmosphere.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-300 mt-1">🏔</span>
                        <div>
                          <strong className="text-white">La Cabane des Neiges</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Lieu convivial à proximité des pistes, parfait après une longue journée de ski.'
                              : 'Friendly place near the slopes, perfect after a long day of skiing.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-300 mt-1">🍺</span>
                        <div>
                          <strong className="text-white">Les Belles Pintes</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Bar à bières convivial, ambiance décontractée mais animée en soirée.'
                              : 'Friendly beer bar, relaxed but lively atmosphere in the evening.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clubs / Soirée tardive */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🕺</span>
                    {currentLang === 'fr' 
                      ? 'Clubs / Soirées tardives'
                      : 'Clubs / Late Night'
                    }
                  </h4>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">🎪</span>
                        <div>
                          <strong className="text-white">Le Carré</strong>
                          <p className="text-white/80 text-xs">
                            {currentLang === 'fr' 
                              ? 'Le club incontournable des Arcs 1800 pour danser jusqu\'au bout de la nuit.'
                              : 'The must-visit club in Arcs 1800 for dancing until dawn.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white/90 text-sm">
                      <strong className="text-white">
                        {currentLang === 'fr' 
                          ? '💡 Conseils pour les sorties nocturnes aux Arcs :'
                          : '💡 Les Arcs Nightlife Tips:'
                        }
                      </strong> 
                      {currentLang === 'fr' 
                        ? ' L\'après-ski commence vers 15h30-16h (terrasses ensoleillées). DJ sets vers 17h-19h. Dîner suivi de bars animés vers 21h-23h. Les clubs ouvrent après 23h30/minuit en haute saison.'
                        : ' Après-ski starts around 3:30-4 PM (sunny terraces). DJ sets from 5-7 PM. Dinner followed by lively bars from 9-11 PM. Clubs open after 11:30 PM/midnight in high season.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline et badges */}
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-center">
                    {currentLang === 'fr' 
                      ? '🌙 Déroulement d\'une soirée type aux Arcs'
                      : '🌙 Typical Evening Flow in Les Arcs'
                    }
                  </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '15h30-16h' : '3:30-4 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Après-ski animé' : 'Lively Après-Ski'}</p>
                    <p className="text-green-300 text-xs font-semibold">Red Hot Saloon • Jungle Café</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '17h-19h' : '5-7 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Dîner chic' : 'Elegant Dinner'}</p>
                    <p className="text-blue-300 text-xs font-semibold">Le George • Chez Boubou</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '19h-21h' : '7-9 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Bars animés' : 'Lively Bars'}</p>
                    <p className="text-purple-300 text-xs font-semibold">Black Sheep Pub • Les Belles Pintes</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{currentLang === 'fr' ? '21h-23h' : '9-11 PM'}</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Soirée en club' : 'Club Party'}</p>
                    <p className="text-red-300 text-xs font-semibold">Le Carré</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">23h30+</div>
                    </div>
                    <p className="text-white/80 text-xs">{currentLang === 'fr' ? 'Club tardif' : 'Late Club'}</p>
                    <p className="text-orange-300 text-xs font-semibold">La Folie Douce</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 text-center">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    {currentLang === 'fr' 
                      ? '🎯 Ambiance festive • Mix international • Plus accessible que Val d\'Isère'
                      : '🎯 Festive atmosphere • International mix • More accessible than Val d\'Isère'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="weather" className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-sky-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl mb-6 shadow-2xl">
              <CloudSun className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              {currentLang === 'fr' ? 'Météo (Prévisions à 7 jours)' : 'Weather (7-Day Forecast)'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentLang === 'fr' ? 'Prévisions détaillées et en temps réel pour Tignes, Val d\'Isère et Les Arcs' : 'Real-time and detailed forecast for Tignes, Val d\'Isère, and Les Arcs'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Tignes</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Station d\'altitude' : 'High-altitude resort'}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 mb-6 transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">{currentLang === 'fr' ? 'Température actuelle ' : 'Current temperature '}</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    {weather.tignes?.current?.temperature_2m ?? '--'}°C
                  </span>
                </div>
              </div>
              {renderForecast(weather.tignes, 'tignes')}
            </div>
            
            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Val d'Isère</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Station historique' : 'Historic resort'}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">{currentLang === 'fr' ? 'Température actuelle ' : 'Current temperature '}</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {weather.val?.current?.temperature_2m ?? '--'}°C
                  </span>
                </div>
              </div>
              {renderForecast(weather.val, 'val')}
            </div>

            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Les Arcs</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Domaine Paradiski' : 'Paradiski Area'}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">{currentLang === 'fr' ? 'Température actuelle ' : 'Current temperature '}</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {weather.arcs?.current?.temperature_2m ?? '--'}°C
                  </span>
                </div>
              </div>
              {renderForecast(weather.arcs, 'arcs')}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <Cloud className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">{currentLang === 'fr' ? 'Source : Open-Meteo (libre) – peut être migrée en API serveur' : 'Source: Open-Meteo (free) – can be migrated to a server API'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Avalanche Section */}
      <section id="avalanche" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl mb-6 shadow-2xl">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              {currentLang === 'fr' ? 'Risques d\'avalanche & Sécurité' : 'Avalanche Risks & Safety'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentLang === 'fr' ? 'Informations essentielles pour pratiquer en toute sécurité dans l\'Espace Killy' : 'Essential information for safe skiing in the Espace Killy'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentLang === 'fr' ? 'Bulletin d\'avalanche' : 'Avalanche bulletin'}</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Sources officielles et fiables' : 'Official and reliable sources'}</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { href: "https://meteofrance.com/previsions-meteo-france/val-d-isere/73150", title: "METEO FRANCE", desc: currentLang === 'fr' ? "Météo Val d'Isère" : "Val d'Isère weather" },
                  { href: "https://meteofrance.com/meteo-montagne/tignes/732961", title: "METEO FRANCE", desc: currentLang === 'fr' ? "Météo Tignes" : "Tignes weather" },
                  { href: "https://www.anena.org/", title: "ANENA", desc: currentLang === 'fr' ? "Association Nationale pour l'Étude de la Neige et des Avalanches" : "National Association for the Study of Snow and Avalanches" },
                  { href: "https://www.avalanches.org/", title: "European Avalanche Services", desc: "Alps" }
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all duration-300 group transform hover:scale-105 hover:translate-x-1">
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-orange-600">{link.title}</div>
                      <div className="text-sm text-gray-600">{link.desc}</div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <CloudSnow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentLang === 'fr' ? 'Météo & Enneigement' : 'Weather & Snow Conditions'}</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Conditions en temps réel' : 'Real-time conditions'}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    Val d'Isère
                  </h4>
                  <div className="space-y-2">
                    {[
                      { href: "https://www.valdisere.com/live/enneigement/", title: currentLang === 'fr' ? "État des pistes et enneigement en direct" : "Live piste conditions and snow conditions" },
                      { href: "https://www.valdisere.com/live/meteo-a-val-disere/", title: currentLang === 'fr' ? "Météo & ouverture du col de l'Iseran" : "Weather & opening of the Col de l'Iseran" },
                      { href: "https://valdisere.roundshot.com/", title: currentLang === 'fr' ? "Webcams en direct" : "Live webcams" }
                    ].map((link, i) => (
                      <a key={i} href={link.href} target="_blank" rel="noreferrer"
                         className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group transform hover:scale-105 hover:translate-x-1">
                        <span className="text-gray-700 group-hover:text-blue-600">{link.title}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    Tignes
                  </h4>
                  <a href="https://www.snowtrex.fr/france/val_disere/meteo.html" target="_blank" rel="noreferrer"
                     className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg hover:from-orange-100 hover:to-amber-100 transition-all duration-300 group transform hover:scale-105 hover:translate-x-1">
                    <span className="text-gray-700 group-hover:text-orange-600">{currentLang === 'fr' ? 'Météo et prévisions neige' : 'Weather and snow forecast'}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    Les Arcs
                  </h4>
                  <div className="space-y-2">
                    {[
                      { href: "https://www.lesarcs.com/lenneigement", title: currentLang === 'fr' ? "État des pistes et enneigement en direct" : "Live piste conditions and snow conditions" },
                      { href: "https://www.lesarcs.com/ouverture-des-pistes-et-remontees", title: currentLang === 'fr' ? "Ouverture des pistes et remontées" : "Piste and lift openings" },
                      { href: "https://www.lesarcs.com/infos-live/meteo", title: currentLang === 'fr' ? "Météo en direct" : "Live weather" }
                    ].map((link, i) => (
                      <a key={i} href={link.href} target="_blank" rel="noreferrer"
                         className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group transform hover:scale-105 hover:translate-x-1">
                        <span className="text-gray-700 group-hover:text-purple-600">{link.title}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentLang === 'fr' ? 'Équipement de sécurité' : 'Safety equipment'}</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Le matériel indispensable' : 'Essential equipment'}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500 transform hover:scale-105 transition-all duration-200">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {currentLang === 'fr' ? 'Équipement obligatoire hors-piste' : 'Mandatory off-piste equipment'}
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[currentLang === 'fr' ? "Détecteur de Victimes d'Avalanches (DVA)" : "Avalanche transceiver (DVA)", currentLang === 'fr' ? "Pelle" : "Shovel", currentLang === 'fr' ? "Sonde" : "Probe"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 transform hover:scale-105 transition-all duration-200">
                  <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {currentLang === 'fr' ? 'Équipement recommandé' : 'Recommended equipment'}
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[currentLang === 'fr' ? "Sac airbag" : "Bag Airbag", currentLang === 'fr' ? "Casque" : "Helmet", currentLang === 'fr' ? "Gilet airbag" : "Airbag vest", currentLang === 'fr' ? "Kit de premiers secours" : "First aid kit", currentLang === 'fr' ? "Téléphone portable chargé" : "Charged mobile phone"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-200">
                  <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">{currentLang === 'fr' ? 'Initiation à la recherche de victimes d\'avalanche disponible avec votre monitrice' : 'Avalanche victim searcityraining available with your instructor'}</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentLang === 'fr' ? 'Conseils de sécurité' : 'Safety tips'}</h3>
                  <p className="text-sm text-gray-600">{currentLang === 'fr' ? 'Les règles d\'or' : 'Golden rules'}</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  currentLang === 'fr' ? "Consultez toujours le bulletin d'avalanche avant de partir" : "Always check the avalanche bulletin before setting out",
                  currentLang === 'fr' ? "Ne partez jamais seul en hors-piste" : "Never go off-piste alone",
                  currentLang === 'fr' ? "Informez quelqu'un de votre itinéraire et de votre heure de retour" : "Inform someone of your route and expected return time",
                  currentLang === 'fr' ? "Respectez les zones sécurisées et la signalisation des pistes" : "Respect designated safe zones and trail markings",
                  currentLang === 'fr' ? "Adaptez votre itinéraire en fonction des conditions météorologiques" : "Adapt your route according to weather conditions",
                  currentLang === 'fr' ? "En cas d'accident, composez le 112 (numéro d'urgence européen)" : "In case of an accident, dial 112 (European emergency number)"
                ].map((conseil, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg transform hover:scale-105 hover:translate-x-1 transition-all duration-200">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-gray-700">{conseil}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500 shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <p className="text-yellow-800 font-medium">
                    {currentLang === 'fr' ? 'La sécurité en montagne est l\'affaire de tous. En cas de doute, renoncez ou faites appel à un professionnel.' : 'Mountain safety is everyone\'s responsibility. If in doubt, turn back or seek professional help.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-rose-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-2xl">
              <ImagePlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              {currentLang === 'fr' ? 'Galerie' : 'Gallery'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentLang === 'fr' ? 'Découvrez les paysages enneigés spectaculaires de Tignes et Val d\'Isère' : 'Discover the spectacular snowy landscapes of Tignes and Val d\'Isère'}
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/80 backdrop-blur-sm border border-white/20">
            {/* Images du carrousel */}
            <div className="relative h-[500px]">
              {Array.from({ length: totalImages }).map((_, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 motion-reduce:transition-none ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <img 
                    src={getCarouselImage(index)} 
                    alt={galleryAltTexts[index] || `Paysage enneigé ${index + 1}`}
                    className="w-full h-full object-cover"
                    decoding="async"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              ))}
              
              {/* Boutons de navigation modernisés */}
              <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                aria-label="Image précédente"
              >
                <ChevronDown className="h-6 w-6 rotate-90" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                aria-label="Image suivante"
              >
                <ChevronDown className="h-6 w-6 -rotate-90" />
              </button>
              
              {/* Indicateurs de diapositives modernisés */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                {Array.from({ length: totalImages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8 shadow-lg' : 'bg-white/50 hover:bg-white/70'}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Légende modernisée */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 text-center backdrop-blur-sm">
              <p className="text-gray-800 font-medium text-lg mb-2">
                {currentSlide === 0 && "Vue imprenable sur les montagnes enneigées de Tignes"}
                {currentSlide === 1 && "Paysage hivernal époustouflant dans les Alpes"}
                {currentSlide === 2 && "Pentes enneigées parfaites pour le ski et le snowboard"}
                {currentSlide === 3 && "Forêt enneigée sous un ciel bleu éclatant"}
                {currentSlide === 4 && "Panorama montagneux sous la neige"}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalImages }).map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-purple-600' : 'bg-purple-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {currentSlide + 1} / {totalImages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Cancellation Policy Section */}
      <section id="cancellation" className="pull0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-6 shadow-2xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              {currentLang === 'fr' ? 'Annulation Flexible' : 'Flexible Cancellation'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentLang === 'fr' ? 'Protection contre les annulations clients, inspirée des politiques Maison Sport' : 'Customer cancellation protection, inspired by Maison Sport policies'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{currentLang === 'fr' ? '21+ jours' : '21+ days'}</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <p className="text-green-700 font-semibold text-lg">{currentLang === 'fr' ? 'Remboursement 95%' : '95% Refund'}</p>
                  <p className="text-gray-600">{currentLang === 'fr' ? 'Pas de paiement pour le moniteur' : 'No payment for instructor'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{currentLang === 'fr' ? '14–20 jours' : '14–20 days'}</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
                  <p className="text-amber-700 font-semibold text-lg">{currentLang === 'fr' ? 'Remboursé 50%' : '50% Refunded'}</p>
                  <p className="text-gray-600">{currentLang === 'fr' ? 'Si non rebooké: paiement 50%' : 'If not rebooked: 50% payment'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <X className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{currentLang === 'fr' ? '≤13 jours' : '≤13 days'}</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4">
                  <p className="text-red-700 font-semibold text-lg">{currentLang === 'fr' ? 'Pas de remboursement' : 'No refund'}</p>
                  <p className="text-gray-600">{currentLang === 'fr' ? 'Si non rebooké: paiement 100%' : 'If not rebooked: 100% payment'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200">
              <Sparkles className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">{currentLang === 'fr' ? 'Calendrier rouvert automatiquement en cas d\'annulation' : 'Calendar automatically reopened in case of cancellation'}</span>
            </div>
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">{currentLang === 'fr' ? 'Nous contacter' : 'Contact Me'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-6 shadow-2xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentLang === 'fr' ? 'Email' : 'Email'}</h3>
              <a href={`mailto:${t.contact.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl hover:from-indigo-100 hover:to-blue-100 transition-all duration-300 group">
                <span className="text-gray-700 group-hover:text-indigo-600 font-medium">{t.contact.email}</span>
                <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentLang === 'fr' ? 'Téléphone' : 'Phone'}</h3>
              <div className="space-y-3">
                <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                  <span className="text-gray-700 group-hover:text-green-600 font-medium">{t.contact.phone}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={`https://wa.me/${t.contact.phone.replace(/\s/g,'')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700 group-hover:text-green-600 font-medium">WhatsApp</span>
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentLang === 'fr' ? 'Adresse' : 'Address'}</h3>
              <a 
                href="https://www.google.com/maps/search/Val+d%27Isère,+France" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group"
              >
                <span className="text-gray-700 group-hover:text-purple-600 font-medium">{t.contact.address}</span>
                <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
    </a>
  </div>
</div>

<div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                {currentLang === 'fr' ? 'QR Code de contact' : 'Contact QR Code'}
              </h3>
              <div className="relative group">
                <img 
                  src={QRCode} 
                  alt="QR Code de contact" 
                  className="w-64 h-64 object-contain rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
              <p className="text-center text-gray-600 mt-4">{currentLang === 'fr' ? 'Scannez pour me contacter directement' : 'Scan to contact me directly'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={Logo} alt="Tignes logo" className="h-10 w-10 object-contain" loading="lazy" decoding="async" />
            <span className="text-lg font-semibold">{t.title}</span>
          </div>
          <p className="text-gray-400">{t.subtitle}</p>
          <p className="text-gray-500 text-sm mt-4">
            © 2025 {t.title}. {currentLang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>

      {/* Assistant RAG */}
      <RAGAssistant 
        isOpen={isRAGOpen} 
        onClose={() => setIsRAGOpen(false)} 
      />
    </div>
  )
}

export default App

