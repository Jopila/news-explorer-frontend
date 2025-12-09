import './NewsCard.css';

function NewsCard({ card, isSavedPage = false }) {
  return (
    <article className="news-card">
      <div className="news-card__image">
        {card.image ? (
          <img src={card.image} alt="" className="news-card__image-tag" />
        ) : (
          <div className="news-card__image-placeholder" />
        )}
        <div className="news-card__bookmark-wrapper">
          <button
            type="button"
            className={`news-card__bookmark${isSavedPage ? ' news-card__bookmark--saved' : ''}`}
            aria-label={isSavedPage ? 'Remover dos salvos' : 'Salvar artigo'}
          />
          {!isSavedPage && <div className="news-card__tooltip">Faça login para salvar artigos</div>}
        </div>
      </div>
      <div className="news-card__body">
        <div className="news-card__meta">
          {card.keyword && <span className="news-card__keyword">{card.keyword}</span>}
          <span className="news-card__date">{card.publishedAt}</span>
        </div>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__description">{card.description}</p>
        <div className="news-card__source">{card.source}</div>
      </div>
    </article>
  );
}

export default NewsCard;
