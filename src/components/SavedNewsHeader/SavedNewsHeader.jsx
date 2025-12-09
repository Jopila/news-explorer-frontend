import './SavedNewsHeader.css';

function SavedNewsHeader({ total, keywords, userName }) {
  const topKeywords = keywords.slice(0, 2);
  const remaining = keywords.length - topKeywords.length;

  const formatKeywords = () => {
    if (topKeywords.length === 0) return '';
    const keywordText = topKeywords.join(', ');
    if (remaining > 0) {
      return `${keywordText}, e ${remaining} outras`;
    }
    return keywordText;
  };

  return (
    <header className="saved-header">
      <p className="saved-header__eyebrow">Artigos salvos</p>
      <h1 className="saved-header__title">
        {userName}, você tem {total} artigos salvos
      </h1>
      {keywords.length > 0 && (
        <p className="saved-header__keywords">
          Por palavras-chave: {formatKeywords()}
        </p>
      )}
    </header>
  );
}

export default SavedNewsHeader;
