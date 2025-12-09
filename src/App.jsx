import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import SavedNews from './components/SavedNews/SavedNews';
import LoginPopup from './components/LoginPopup/LoginPopup';
import SignupPopup from './components/SignupPopup/SignupPopup';
import SignupSuccessPopup from './components/SignupSuccessPopup/SignupSuccessPopup';
import Footer from './components/Footer/Footer';
import './App.css';

const newsCards = [
  {
    id: '1',
    keyword: 'Natureza',
    title: 'Todo mundo precisa de um "Lugar Especial para Sentar" especial na naturezaza',
    description:
      'Desde que li o influente livro de Richard Louv, "O Último Filho na Floresta", a ideia de ter um "lugar para sentar" especial me pegou de jeito. This advice, which Louv attributes to natureza...',
    source: 'treehugger',
    publishedAt: '4 de novembro de 2020',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    keyword: 'Natureza',
    title: 'A naturezaza faz de você uma pessoa melhor',
    description:
      'Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há milênios: o som dos oceanos, os aromas de uma floresta, a forma como a luz do sol dança através das folhas.',
    source: 'national geographic',
    publishedAt: '19 de fevereiro de 2019',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    keyword: 'Natureza',
    title: 'Grand Teton renova a histórica Crest Trail',
    description:
      '"A ligação entre as trilhas de Cascade e Death Canyon aconteceu em 1º de outubro de 1933, e marcou o primeiro passo na realização de um plano onde o viajante será...',
    source: 'National parques traveler',
    publishedAt: '19 de outubro de 2020',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    keyword: 'Natureza',
    title: 'A natureza selvagem nas montanhas',
    description:
      'Explorar as montanhas é uma experiência única que conecta você com a natureza de forma profunda. As trilhas oferecem vistas deslumbrantes e momentos de paz.',
    source: 'adventure magazine',
    publishedAt: '15 de março de 2021',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    keyword: 'Natureza',
    title: 'Florestas tropicais e biodiversidade',
    description:
      'As florestas tropicais abrigam mais da metade das espécies do planeta. Proteger esses ecossistemas é essencial para a sobrevivência de milhões de espécies.',
    source: 'eco world',
    publishedAt: '8 de julho de 2020',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    keyword: 'Natureza',
    title: 'O poder curativo dos oceanos',
    description:
      'Estudos mostram que estar perto do mar pode reduzir o estresse e melhorar a saúde mental. O som das ondas tem um efeito calmante comprovado cientificamente.',
    source: 'health nature',
    publishedAt: '22 de janeiro de 2021',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80',
  },
];

const savedCards = [
  {
    id: '7',
    keyword: 'Educação',
    title: 'Título de placeholder para artigo salvo no design',
    description:
      'Use este texto fictício para simular a lista de artigos salvos. Ele segue o padrão visual do Figma.',
    source: 'Global Ed',
    publishedAt: '12 de setembro de 2024',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    keyword: 'Saúde',
    title: 'Placeholder extra para o estado salvo',
    description:
      'Conteúdo temporário conforme o design. Substitua assim que a integração com a API estiver pronta.',
    source: 'Health Today',
    publishedAt: '30 de agosto de 2024',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  },
  ...newsCards,
];

function App() {
  const [results, setResults] = useState([]);
  const [isLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
  const [signupServerError, setSignupServerError] = useState('');

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
  const handleLoginSubmit = () => {
    setIsLoginOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setSignupServerError('');
    setIsSignupOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
    setSignupServerError('');
  };

  const handleSignupSubmit = () => {
    setIsSignupOpen(false);
    setSignupServerError('');
    setIsSignupSuccessOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsSignupSuccessOpen(false);
    setSignupServerError('');
    setIsLoginOpen(true);
  };

  const handleSignupSuccessClose = () => {
    setIsSignupSuccessOpen(false);
  };

  return (
    <div className="app">
      <Header onLoginClick={handleLoginOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              cards={results}
              defaultQuery=""
              onSearch={handleSearch}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path="/saved-news" element={<SavedNews cards={savedCards} />} />
      </Routes>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        onSubmit={handleLoginSubmit}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={handleSignupClose}
        onSubmit={handleSignupSubmit}
        onSwitchToLogin={handleSwitchToLogin}
        serverError={signupServerError}
      />
      <SignupSuccessPopup
        isOpen={isSignupSuccessOpen}
        onClose={handleSignupSuccessClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <Footer />
    </div>
  );
}

export default App;
