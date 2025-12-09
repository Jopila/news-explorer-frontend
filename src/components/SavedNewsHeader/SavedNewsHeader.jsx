import './SavedNewsHeader.css';

function SavedNewsHeader({ total, keywords }) {
  const topKeywords = keywords.slice(0, 3);
  const remaining = keywords.length - topKeywords.length;

  return (
    <header className="saved-header">
      <p className="saved-header__eyebrow">Artigos salvos</p>
      <h1 className="saved-header__title">Marcelo, você tem {total} artigos salvos</h1>
      <p className="saved-header__keywords">
        {topKeywords.length > 0 ? (
          <>
            Por palavras-chave:{' '}
            <strong className="saved-header__highlight">
              {topKeywords.join(', ')}
              {remaining > 0 ? ` e mais ${remaining}` : ''}
            </strong>
          </>
        ) : (
          'Nenhuma palavra-chave ainda.'
        )}
      </p>
    </header>
  );
}

export default SavedNewsHeader;
