import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SignupSuccessPopup from '../SignupSuccessPopup/SignupSuccessPopup';
import Footer from '../Footer/Footer';
import { mockNewsCards } from '../../utils/mockNews';
import './App.css';

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
      const filtered = mockNewsCards.filter((card) => {
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

  const handleBrandClick = () => {
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  };

  const isAnyPopupOpen = isLoginOpen || isSignupOpen || isSignupSuccessOpen;

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={handleLoginOpen}
        onLogout={handleLogout}
        theme={headerTheme}
        hideMenuButton={isAnyPopupOpen}
        onBrandClick={handleBrandClick}
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
