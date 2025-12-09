import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ defaultQuery = '', onSearch }) {
  const [value, setValue] = useState(defaultQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <div className="search-form__controls">
        <input
          id="query"
          name="query"
          className="search-form__input"
          type="search"
          placeholder="Insira um tema"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit" className="search-form__button">
          Procurar
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
