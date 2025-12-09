import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import SavedNews from './components/SavedNews/SavedNews';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';
import './App.css';

const newsCards = [
  {
    id: '1',
    keyword: 'Tecnologia',
    title: 'Todo mundo precisa de um “Lugar Especial para Sentar” na natureza',
    description:
      'Desde que li o influente livro de Richard Louv, “O Último Filho na Floresta”, a ideia de ter um “lugar para sentar” especial me pegou de jeito.',
    source: 'treehugger',
    publishedAt: '4 de novembro de 2020',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    keyword: 'Clima',
    title: 'A naturezaza faz de você uma pessoa melhor',
    description:
      'Todos nós sabemos como a natureza nos faz bem. O som dos oceanos, os aromas de uma floresta, a forma como a luz do sol dança através das folhas.',
    source: 'national geographic',
    publishedAt: '19 de fevereiro de 2019',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    keyword: 'Mercado',
    title: 'Grand Teton renova a histórica Crest Trail',
    description:
      'A ligação entre as trilhas de Cascade e Death Canyon aconteceu em 1º de outubro de 1933, marcando o primeiro passo na realização de um plano...',
    source: 'National parques traveler',
    publishedAt: '19 de outubro de 2020',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
];

const savedCards = [
  {
    id: '4',
    keyword: 'Educação',
    title: 'Título de placeholder para artigo salvo no design',
    description:
      'Use este texto fictício para simular a lista de artigos salvos. Ele segue o padrão visual do Figma.',
    source: 'Global Ed',
    publishedAt: '2024-09-12',
    image: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
  },
  {
    id: '5',
    keyword: 'Saúde',
    title: 'Placeholder extra para o estado “salvo”',
    description:
      'Conteúdo temporário conforme o design. Substitua assim que a integração com a API estiver pronta.',
    source: 'Health Today',
    publishedAt: '2024-08-30',
    image: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  ...newsCards,
];

function App() {
  const [results, setResults] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSearch = (query) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      setResults([]);
      return;
    }

    const filtered = newsCards.filter((card) => {
      const haystack = `${card.title} ${card.description} ${card.keyword}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    setResults(filtered);
  };

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const handleLoginSubmit = (formData) => {
    // TODO: integrar autenticação com backend
    setIsLoginOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    // TODO: abrir modal de registro
  };

  return (
    <div className="app">
      <Header onLoginClick={handleLoginOpen} />
      <Routes>
        <Route
          path="/"
          element={<Main cards={results} defaultQuery="" onSearch={handleSearch} />}
        />
        <Route path="/saved-news" element={<SavedNews cards={savedCards} />} />
      </Routes>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        onSubmit={handleLoginSubmit}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <Footer />
    </div>
  );
}

export default App;
