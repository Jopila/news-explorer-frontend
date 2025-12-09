import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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


function App() {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === '/saved-news';
  const headerTheme = isSavedNewsPage ? 'light' : 'dark';

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [userSavedCards, setUserSavedCards] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
  const [signupServerError, setSignupServerError] = useState('');

  const handleSearch = (query) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setResults([]);
    setHasSearched(true);

    setTimeout(() => {
      const filtered = newsCards.filter((card) => {
        const haystack = `${card.title} ${card.description} ${card.keyword}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });

      setResults(filtered);
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const handleLoginSubmit = () => {
    setIsLoggedIn(true);
    setCurrentUser(registeredUser || { name: 'Usuário' });
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleBookmarkClick = (card) => {
    setUserSavedCards((prev) => {
      const isAlreadySaved = prev.some((c) => c.id === card.id);
      if (isAlreadySaved) {
        return prev.filter((c) => c.id !== card.id);
      }
      return [...prev, card];
    });
  };

  const savedCardIds = userSavedCards.map((c) => c.id);

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setSignupServerError('');
    setIsSignupOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
    setSignupServerError('');
  };

  const handleSignupSubmit = ({ username }) => {
    setRegisteredUser({ name: username });
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
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={handleLoginOpen}
        onLogout={handleLogout}
        theme={headerTheme}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              cards={results}
              defaultQuery=""
              onSearch={handleSearch}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              hasSearched={hasSearched}
              savedCardIds={savedCardIds}
              onBookmarkClick={handleBookmarkClick}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              cards={userSavedCards}
              onBookmarkClick={handleBookmarkClick}
              currentUser={currentUser}
            />
          }
        />
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
