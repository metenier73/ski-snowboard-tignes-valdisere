import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { searchEngine, searchUtils } from '@/services/rag/searchEngine.js';
import { ragUtils } from '@/services/rag/ragService.js';
import {
  Search as SearchIcon,
  Sparkles,
  BookOpen,
  Filter,
  Loader2,
} from 'lucide-react';

/**
 * Composant de recherche RAG
 * - Permet de rechercher dans la base de connaissances
 * - Affiche des suggestions et catégories
 * - Appelle onResultClick(result) quand un résultat est sélectionné
 */
const RAGSearch = ({ onResultClick, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  // Color coding for categories
  const categoryBadgeClass = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('station')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (c.includes('sécurité') || c.includes('securite')) return 'bg-red-100 text-red-700 border-red-200';
    if (c.includes('tarif') || c.includes('prix')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (c.includes('cours') || c.includes('lesson')) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (c.includes('météo') || c.includes('meteo') || c.includes('weather')) return 'bg-sky-100 text-sky-700 border-sky-200';
    if (c.includes('équipement') || c.includes('equipement')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Catégories disponibles depuis la base de connaissances (dérivées des résultats)
  const categories = useMemo(() => {
    const setCats = new Set(results.map(r => r.category));
    return Array.from(setCats).filter(Boolean);
  }, [results]);

  const runSearch = async (q) => {
    setIsSearching(true);
    try {
      const data = searchEngine.searchWithSuggestions(q || '', 8);
      let filtered = data.results;
      if (activeCategory) {
        filtered = filtered.filter(r => r.category === activeCategory);
      }
      setResults(filtered);
      setSuggestions(data.suggestions || []);
    } finally {
      setIsSearching(false);
    }
  };

  // Auto-complétion avec léger debounce
  useEffect(() => {
    const id = setTimeout(() => {
      if (query && query.length >= 2) {
        setAutocomplete(searchUtils.autocomplete(query, 8));
      } else {
        setAutocomplete([]);
      }
    }, 150);
    return () => clearTimeout(id);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const handlePickSuggestion = (text) => {
    setQuery(text);
    runSearch(text);
  };

  const handlePickCategory = (cat) => {
    setActiveCategory(prev => (prev === cat ? '' : cat));
  };

  useEffect(() => {
    // Recherche initiale avec question populaire pour montrer l'UI
    const prime = async () => {
      const popular = ragUtils.getSuggestedQuestions()[0];
      await runSearch(popular);
    };
    prime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Refiltre quand la catégorie change
    if (query) {
      runSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Card className="w-full h-full shadow-none border border-gray-200">
        <CardHeader className="pb-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600/10 rounded-full">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Recherche de connaissances</CardTitle>
                <p className="text-gray-500 text-xs">Explorez les infos Ski & Snowboard</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (ex: tarifs, cours, équipement, météo...)"
                className="pl-9"
              />
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSearching}>
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
            </Button>
          </form>

          {/* Autocomplete */}
          {autocomplete.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {autocomplete.map((s, i) => (
                <button
                  key={i}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => handlePickSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Suggestions :</div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handlePickSuggestion(s)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Catégories */}
          {categories.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Filter className="h-3 w-3" />
                <span>Catégories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={activeCategory === cat ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => handlePickCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Résultats */}
          <div className="mt-4 space-y-2 max-h-[45vh] overflow-y-auto">
            {isSearching && results.length === 0 && (
              <div className="flex items-center text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Recherche en cours...
              </div>
            )}

            {!isSearching && results.length === 0 && (
              <div className="text-sm text-gray-500">Aucun résultat pour cette recherche.</div>
            )}

            {results.map((r) => (
              <div key={r.id} className="p-3 border rounded-lg bg-white hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="pr-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <div className="font-semibold text-base">{r.title}</div>
                      {r.category && (
                        <Badge variant="secondary" className={`text-[10px] border ${categoryBadgeClass(r.category)}`}>{r.category}</Badge>
                      )}
                    </div>
                    <div className="text-[0.95rem] leading-6 text-gray-700 mt-2 line-clamp-3">{r.content?.slice(0, 160)}{r.content && r.content.length > 160 ? '…' : ''}</div>

                    {/* Mots-clés */}
                    {Array.isArray(r.keywords) && r.keywords.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.keywords.slice(0, 6).map((kw, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px]">{kw}</Badge>
                        ))}
                        {r.keywords.length > 6 && (
                          <Badge variant="outline" className="text-[10px]">+{r.keywords.length - 6}</Badge>
                        )}
                      </div>
                    )}

                    {/* Détails de correspondance */}
                    {r.matchDetails && (
                      <div className="mt-2 text-[11px] text-gray-500">
                        <span className="mr-2">titre: {r.matchDetails.titleScore?.toFixed?.(2) ?? r.matchDetails.titleScore}</span>
                        <span className="mr-2">contenu: {r.matchDetails.contentScore?.toFixed?.(2) ?? r.matchDetails.contentScore}</span>
                        <span className="mr-2">mots-clés: {r.matchDetails.keywordScore?.toFixed?.(2) ?? r.matchDetails.keywordScore}</span>
                        <span className="">exact: {r.matchDetails.exactMatch}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" title={`Score: ${r.score?.toFixed?.(2) ?? r.score}`}>Score {r.score?.toFixed?.(1) ?? r.score}</Badge>
                    {onResultClick && (
                      <Button size="sm" variant="outline" onClick={() => onResultClick(r)}>
                        Utiliser
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RAGSearch;
