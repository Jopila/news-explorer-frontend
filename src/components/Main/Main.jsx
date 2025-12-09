import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import heroImage from '../../images/hero-background-image.jpg';
import './Main.css';

function Main({ cards = [], defaultQuery = '', onSearch, isLoggedIn = false, isLoading = false, savedCardIds = [], onBookmarkClick }) {
  return (
    <main className="main">
      <section id="hero" className="main__hero">
        <img className="main__hero-bg" src={heroImage} alt="" />
        <div className="main__hero-content">
          <h1 className="main__title">O que está<br />acontecendo no mundo?</h1>
          <p className="main__subtitle">
            Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal
          </p>
          <div className="main__search-wrapper">
            <SearchForm defaultQuery={defaultQuery} onSearch={onSearch} />
          </div>
        </div>
      </section>

      {isLoading && <Preloader />}

      {!isLoading && cards.length > 0 && (
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
