import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ThumbsUp, 
  ThumbsDown,
  RotateCcw,
  Sparkles,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { ragService, ragUtils } from '@/services/rag/ragService.js';

/**
 * Composant de chat RAG avec interface moderne
 */
const RAGChat = forwardRef(({ className = '', onClose, selectedResult, prefillQuestion }, ref) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Messages d'accueil
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Bonjour ! Je suis votre assistant virtuel spécialisé dans le ski et snowboard à Tignes et Val d\'Isère. Comment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date(),
        isWelcome: true
      }
    ]);
  }, []);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Préremplir depuis la section Aide
  useEffect(() => {
    if (prefillQuestion) {
      setInputValue(prefillQuestion);
      inputRef.current?.focus();
    }
  }, [prefillQuestion]);

  // Préremplir depuis la recherche
  useEffect(() => {
    if (selectedResult) {
      const seed = `En te basant sur "${selectedResult.title}" (catégorie: ${selectedResult.category}), peux-tu m'expliquer brièvement et me proposer quoi demander ensuite ?`;
      setInputValue(seed);
      inputRef.current?.focus();
    }
  }, [selectedResult]);

  // Gestion de l'envoi des messages
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Génération de la réponse RAG
      const response = await ragService.generateResponse(userMessage.content, {
        maxDocuments: 3,
        includeSources: true,
        language: 'fr',
        boostDocumentId: selectedResult?.id || null
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
        suggestions: response.suggestions,
        confidence: response.confidence
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion des suggestions
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  // Gestion des questions suggérées
  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    handleSendMessage();
  };

  // Réinitialisation du chat
  const handleClearChat = () => {
    ragService.clearHistory();
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        content: 'Conversation réinitialisée. Comment puis-je vous aider ?',
        timestamp: new Date()
      }
    ]);
  };

  // Gestion du clavier
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // onKeyDown pour fiabilité (certaines plateformes n'envoient pas onKeyPress)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Questions suggérées
  const suggestedQuestions = [
    "Quels sont vos tarifs pour cette saison ?",
    "Proposez-vous des cours pour débutants ?",
    "Quel équipement me faut-il pour le ski ?",
    "Comment réserver un cours ?",
    "Quelles sont les conditions météo actuelles ?",
    "Proposez-vous des cours de hors-piste ?"
  ];

  return (
    <div className={`w-full h-full ${className}`}>
      <Card className="w-full h-full shadow-none border-0 bg-transparent">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-none pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/20 rounded-full">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Assistant Ski</CardTitle>
                  <p className="text-blue-100 text-xs">Spécialiste Tignes & Val d'Isère</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-white hover:bg-white/20"
                  title="Nouvelle conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                {onClose && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/20"
                    title="Fermer"
                  >
                    <span className="text-lg">×</span>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <div className="p-1 bg-blue-100 rounded-full mt-1">
                          <Bot className="h-3 w-3 text-blue-600" />
                        </div>
                      )}
                      {message.type === 'user' && (
                        <div className="p-1 bg-white/20 rounded-full mt-1">
                          <User className="h-3 w-3" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                        
                        {/* Sources pour les messages du bot */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-2 pt-2 border-top border-gray-200">
                            <div className="text-xs text-gray-500 mb-1">Sources :</div>
                            <div className="flex flex-wrap gap-1">
                              {message.sources.map((source, index) => (
                                <Badge key={index} variant="secondary" className="text-xs" title={source.category}>
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {source.title || source.category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggestions de suivi */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="text-xs text-gray-500 mb-1">Questions suggérées :</div>
                            <div className="space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block text-xs text-blue-600 hover:text-blue-800 hover:underline text-left"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Confiance + Timestamp */}
                        <div className="flex items-center justify-between text-xs opacity-80 mt-1">
                          {typeof message.confidence === 'number' && (
                            <span className="text-gray-500">Confiance ~ {(message.confidence * 100).toFixed(0)}%</span>
                          )}
                          <span>
                            {message.timestamp.toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Indicateur de chargement */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-100 rounded-full">
                        <Bot className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">Je réfléchis...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Questions suggérées rapides */}
              {messages.length <= 1 && (
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-2">Questions populaires :</div>
                  <div className="grid grid-cols-1 gap-1">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
    </div>
  );
});

RAGChat.displayName = 'RAGChat';

export default RAGChat;
