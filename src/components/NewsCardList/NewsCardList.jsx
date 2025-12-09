import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ cards = [], isSavedPage = false, isLoggedIn = false }) {
  const hasCards = cards && cards.length > 0;

  if (!hasCards) {
    return null;
  }

  return (
    <div className="news-list__grid">
      {cards.map((card) => (
        <NewsCard
          key={card.id}
          card={card}
          isSavedPage={isSavedPage}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}

export default NewsCardList;
