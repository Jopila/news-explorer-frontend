import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import About from '../About/About';
import './Main.css';

function Main({ cards = [], defaultQuery = '', onSearch }) {
  return (
    <main className="main">
      <section id="hero" className="main__hero">
        <div className="main__overlay" />
        <div className="main__hero-content">
          <h1 className="main__title">O que está acontecendo no mundo?</h1>
          <p className="main__subtitle">
            Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal.
          </p>
          <SearchForm defaultQuery={defaultQuery} onSearch={onSearch} />
        </div>
      </section>

      {cards.length > 0 && <SearchResults cards={cards} />}
      <About />
    </main>
  );
}

export default Main;
