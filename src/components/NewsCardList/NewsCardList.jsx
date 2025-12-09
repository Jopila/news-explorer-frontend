import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ title, cards = [], isSavedPage = false, showEmpty = false }) {
  const hasCards = cards && cards.length > 0;

  return (
    <section className="news-list">
      {(title || showEmpty) && (
        <div className="news-list__header">
          {title && <h2 className="news-list__title">{title}</h2>}
          {!hasCards && showEmpty && <p className="news-list__empty">Nada por aqui ainda.</p>}
        </div>
      )}

      {hasCards && (
        <div className="news-list__grid">
          {cards.map((card) => (
            <NewsCard key={card.id} card={card} isSavedPage={isSavedPage} />
          ))}
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
