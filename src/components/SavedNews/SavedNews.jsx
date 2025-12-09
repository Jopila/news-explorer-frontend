import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ cards, onBookmarkClick, currentUser }) {
  const keywords = [...new Set(cards.map((card) => card.keyword).filter(Boolean))];
  const userName = currentUser?.name || 'Usuário';

  return (
    <main className="saved-news">
      <SavedNewsHeader total={cards.length} keywords={keywords} userName={userName} />
      <section className="saved-news__content" aria-label="Artigos salvos">
        <NewsCardList
          title="Artigos salvos"
          cards={cards}
          isSavedPage
          isLoggedIn
          onBookmarkClick={onBookmarkClick}
        />
      </section>
    </main>
  );
}

export default SavedNews;
