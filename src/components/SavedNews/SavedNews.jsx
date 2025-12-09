import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ cards, onBookmarkClick, currentUser }) {
  const keywords = [...new Set(cards.map((card) => card.keyword).filter(Boolean))];
  const userName = currentUser?.name || 'Usuário';

  return (
    <div className="saved-news">
      <SavedNewsHeader total={cards.length} keywords={keywords} userName={userName} />
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
