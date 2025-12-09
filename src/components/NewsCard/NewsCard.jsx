import './NewsCard.css';

function NewsCard({ card, isSavedPage = false, isLoggedIn = false }) {
  return (
    <article className="news-card">
      <div className="news-card__image">
        {card.image ? (
          <img src={card.image} alt="" className="news-card__image-tag" />
        ) : (
          <div className="news-card__image-placeholder" />
        )}
        <div className="news-card__bookmark-wrapper">
          {!isLoggedIn && !isSavedPage && (
            <div className="news-card__tooltip">Sign in to save articles</div>
          )}
          <button
            type="button"
            className={`news-card__bookmark${isSavedPage ? ' news-card__bookmark--saved' : ''}`}
            aria-label={isSavedPage ? 'Remover dos salvos' : 'Salvar artigo'}
          />
        </div>
      </div>
      <div className="news-card__body">
        <span className="news-card__date">{card.publishedAt}</span>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__description">{card.description}</p>
        <span className="news-card__source">{card.source}</span>
      </div>
    </article>
  );
}

export default NewsCard;
