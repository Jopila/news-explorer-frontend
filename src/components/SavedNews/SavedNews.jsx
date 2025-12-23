import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ cards, onBookmarkClick, currentUser }) {
  const keywordCounts = cards.reduce((acc, card) => {
    const keyword = card.keyword?.trim();
    if (!keyword) return acc;
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});
  const keywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pt-BR'))
    .map(([keyword]) => keyword);
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
