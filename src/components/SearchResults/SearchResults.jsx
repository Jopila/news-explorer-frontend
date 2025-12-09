import { useState, useEffect } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResults.css';

function SearchResults({ cards, isLoggedIn = false }) {
  const CARDS_PER_PAGE = 3;
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(CARDS_PER_PAGE);
  }, [cards]);

  const visibleCards = cards.slice(0, visibleCount);
  const hasMoreCards = visibleCount < cards.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  };

  return (
    <section className="search-results">
      <h2 className="search-results__title">Procurar resultados</h2>
      <NewsCardList cards={visibleCards} isSavedPage={false} isLoggedIn={isLoggedIn} />
      {hasMoreCards && (
        <div className="search-results__actions">
          <button type="button" className="search-results__button" onClick={handleShowMore}>
            Mostrar mais
          </button>
        </div>
      )}
    </section>
  );
}

export default SearchResults;
