import { useEffect, useState } from 'react';
import './SearchForm.css';

function SearchForm({ defaultQuery = '', onSearch }) {
  const [value, setValue] = useState(defaultQuery);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(defaultQuery);
  }, [defaultQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Por favor, insira uma palavra-chave');
      return;
    }
    setError('');
    onSearch?.(trimmed);
  };

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <div className="search-form__controls">
        <input
          id="query"
          name="query"
          className="search-form__input"
          type="search"
          placeholder="Inserir tema"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError('');
          }}
          required
        />
        <button type="submit" className="search-form__button">
          Procurar
        </button>
      </div>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
