import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SignupSuccessPopup from '../SignupSuccessPopup/SignupSuccessPopup';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { fetchNews } from '../../utils/newsApi';
import { deleteArticle, getSavedArticles, saveArticle, setAuthToken } from '../../utils/savedNewsApi';
import { getUserInfo, signin, signup } from '../../utils/MainApi';
import './App.css';

function App() {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === '/saved-news';
  const headerTheme = isSavedNewsPage ? 'light' : 'dark';

  const [results, setResults] = useState([]);
  const [lastQuery, setLastQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthTokenState] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userSavedCards, setUserSavedCards] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
  const [signupServerError, setSignupServerError] = useState('');
  const [loginServerError, setLoginServerError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('newsExplorer:lastSearch');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setResults(parsed.articles || []);
      setLastQuery(parsed.query || '');
      setHasSearched(Boolean(parsed.articles && parsed.articles.length));
    } catch (error) {
      console.error('Erro ao carregar busca armazenada', error);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('newsExplorer:token');
    if (!storedToken) return;
    setAuthTokenState(storedToken);
    setAuthToken(storedToken);
    setIsLoggedIn(true);
    getUserInfo(storedToken)
      .then((user) => {
        setCurrentUser(user);
        fetchSavedArticles(storedToken);
      })
      .catch((error) => {
        console.error('Erro ao validar sessão', error);
        localStorage.removeItem('newsExplorer:token');
        setAuthTokenState('');
        setAuthToken('');
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  const fetchSavedArticles = async (tokenParam) => {
    const tokenToUse = tokenParam || authToken;
    if (!tokenToUse) return;
    try {
      const saved = await getSavedArticles();
      const normalized = saved.map((item) => ({
        id: item._id,
        keyword: item.keyword,
        title: item.title,
        description: item.text,
        source: item.source,
        publishedAt: item.date,
        rawDate: item.date,
        image: item.image,
        url: item.link,
      }));
      setUserSavedCards(normalized);
    } catch (error) {
      console.error('Erro ao carregar salvos', error);
    }
  };

  const handleSearch = async (query) => {
    const normalizedQuery = query.trim();
    setIsLoading(true);
    setResults([]);
    setHasSearched(true);
    setApiError('');
    setLastQuery(normalizedQuery);

    try {
      const articles = await fetchNews(normalizedQuery);
      setResults(articles);
      localStorage.setItem(
        'newsExplorer:lastSearch',
        JSON.stringify({ query: normalizedQuery, articles }),
      );
    } catch (error) {
      setResults([]);
      setApiError(
        'Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginOpen = () => {
    setLoginServerError('');
    setIsLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginServerError('');
    setIsLoginOpen(false);
  };
  const handleLoginSubmit = async ({ email, password }) => {
    setLoginServerError('');
    try {
      const data = await signin({ email, password });
      const token = data?.token;
      if (!token) {
        throw new Error('Token não recebido');
      }
      setAuthTokenState(token);
      setAuthToken(token);
      localStorage.setItem('newsExplorer:token', token);
      const user = await getUserInfo(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      fetchSavedArticles(token);
    } catch (error) {
      setLoginServerError(error.message || 'Não foi possível entrar');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthTokenState('');
    setAuthToken('');
    setUserSavedCards([]);
    localStorage.removeItem('newsExplorer:token');
  };

  const handleBookmarkClick = async (card) => {
    if (!isLoggedIn) return;

    const isAlreadySaved = userSavedCards.some((c) => c.url === card.url || c.id === card.id);

    if (isAlreadySaved) {
      const savedCard = userSavedCards.find((c) => c.url === card.url || c.id === card.id);
      if (!savedCard) return;
      try {
        await deleteArticle(savedCard.id);
        setUserSavedCards((prev) => prev.filter((c) => c.id !== savedCard.id));
      } catch (error) {
        console.error('Erro ao remover artigo salvo', error);
      }
      return;
    }

    try {
      const created = await saveArticle(card);
      const normalized = {
        id: created._id || card.id,
        keyword: created.keyword || card.keyword,
        title: created.title || card.title,
        description: created.text || card.description,
        source: created.source || card.source,
        publishedAt: created.date || card.publishedAt,
        rawDate: created.date || card.rawDate,
        image: created.image || card.image,
        url: created.link || card.url,
      };
      setUserSavedCards((prev) => [...prev, normalized]);
    } catch (error) {
      console.error('Erro ao salvar artigo', error);
    }
  };

  const savedCardIds = userSavedCards.map((c) => c.url || c.id);

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setLoginServerError('');
    setSignupServerError('');
    setIsSignupOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
    setSignupServerError('');
  };

  const handleSignupSubmit = async ({ email, password, username }) => {
    setSignupServerError('');
    try {
      await signup({ name: username, email, password });
      setIsSignupOpen(false);
      setIsSignupSuccessOpen(true);
    } catch (error) {
      setSignupServerError(error.message || 'Não foi possível cadastrar');
    }
  };

  const handleSwitchToLogin = () => {
    setIsSignupOpen(false);
    setIsSignupSuccessOpen(false);
    setSignupServerError('');
    setLoginServerError('');
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
              defaultQuery={lastQuery}
              onSearch={handleSearch}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              hasSearched={hasSearched}
              apiError={apiError}
              savedCardIds={savedCardIds}
              onBookmarkClick={handleBookmarkClick}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onUnauthorized={handleLoginOpen}
              element={SavedNews}
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
        serverError={loginServerError}
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
