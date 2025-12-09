import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import heroImage from '../../images/hero-background-image.jpg';
import './Main.css';

function Main({
  cards = [],
  defaultQuery = '',
  onSearch,
  isLoggedIn = false,
  isLoading = false,
  hasSearched = false,
  apiError = '',
  savedCardIds = [],
  onBookmarkClick,
}) {
  const showError = !isLoading && Boolean(apiError);
  const showNotFound = !isLoading && hasSearched && !apiError && cards.length === 0;

  return (
    <main className="main">
      <section id="hero" className="main__hero">
        <img className="main__hero-bg" src={heroImage} alt="" />
        <div className="main__hero-content">
          <h1 className="main__title">
            O que está
            <br />
            acontecendo no mundo?
          </h1>
          <p className="main__subtitle">
            Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal
          </p>
          <div className="main__search-wrapper">
            <SearchForm defaultQuery={defaultQuery} onSearch={onSearch} />
          </div>
        </div>
      </section>

      {isLoading && <Preloader />}

      {showError && (
        <section className="main__status" aria-live="polite">
          <h2 className="main__status-title">
            Desculpe, algo deu errado durante a solicitação.
          </h2>
          <p className="main__status-text">
            Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.
          </p>
        </section>
      )}

      {showNotFound && <NotFound />}

      {!isLoading && !apiError && cards.length > 0 && (
        <SearchResults
          cards={cards}
          isLoggedIn={isLoggedIn}
          savedCardIds={savedCardIds}
          onBookmarkClick={onBookmarkClick}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
