import './SavedNewsHeader.css';

function SavedNewsHeader({ total, keywords, userName }) {
  const formatKeywords = () => {
    if (keywords.length === 0) return '';
    if (keywords.length <= 3) {
      return keywords.join(', ');
    }
    const [first, second] = keywords;
    const remaining = keywords.length - 2;
    return `${first}, ${second}, e mais ${remaining}`;
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
