import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ cards, onBookmarkClick }) {
  const keywords = [...new Set(cards.map((card) => card.keyword).filter(Boolean))];

  return (
    <div className="saved-news">
      <SavedNewsHeader total={cards.length} keywords={keywords} />
      <div className="saved-news__content">
        <NewsCardList
          title="Artigos salvos"
          cards={cards}
          isSavedPage
          isLoggedIn
          onBookmarkClick={onBookmarkClick}
        />
      </div>
    </div>
  );
}

export default SavedNews;
