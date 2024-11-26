import React from 'react';
import { SearchResult } from './SearchResults'; // Assuming SearchResult is another component

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-window">
      {results.length > 0 ? (
        results.map((result, index) => (
          <SearchResult key={index} result={result.title} />
        ))
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};
