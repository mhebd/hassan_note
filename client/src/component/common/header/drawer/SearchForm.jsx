import React, { useState } from 'react';

function SearchForm() {
  const [query, setQuery] = useState('');

  const submitHdl = (e) => {
    if (!query) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={submitHdl} action="/search" className="form search-form">
      <div className="input-group">
        <span className="input-group-text">
          <i className="fas fa-search" />
        </span>
        <input
          type="text"
          name="query"
          className="form-control search"
          placeholder="অনুসন্ধান করুন..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchForm;
