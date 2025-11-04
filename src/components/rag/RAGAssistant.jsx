import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  MessageCircle, 
  Search, 
  Sparkles
} from 'lucide-react';
import RAGChat from './RAGChat.jsx';
// import RAGSearch from './RAGSearch.jsx';

/**
 * Composant principal de l'assistant RAG
 * Combine la recherche et le chat dans une interface unifiée
 */
const RAGAssistant = ({ isOpen, onClose, className = '' }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedResult, setSelectedResult] = useState(null);

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setActiveTab('chat');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-2xl ${className}`}>
      <Card className="w-full h-full shadow-2xl border-l rounded-none">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Assistant RAG Ski & Snowboard</CardTitle>
                <p className="text-blue-100 text-sm">Votre expert en ski à Tignes & Val d'Isère</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <span className="text-2xl">×</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-1 bg-gray-50">
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="chat" className="h-full m-0">
                <div className="h-full">
                  {/* Chat principal */}
                  <RAGChat 
                    className="h-full border-0 shadow-none"
                    onClose={null}
                    selectedResult={selectedResult}
                  />
                </div>
              </TabsContent>

              {/* Recherche désactivée (composant manquant) */}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RAGAssistant;
