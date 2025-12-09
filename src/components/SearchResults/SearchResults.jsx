import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResults.css';

function SearchResults({ cards }) {
  return (
    <section className="search-results">
      <div className="search-results__header">
        <h2 className="search-results__title">Procurar resultados</h2>
      </div>
      <NewsCardList title="" cards={cards} isSavedPage={false} />
      <div className="search-results__actions">
        <button type="button" className="search-results__button">
          Mostrar mais
        </button>
      </div>
    </section>
  );
}

export default SearchResults;
