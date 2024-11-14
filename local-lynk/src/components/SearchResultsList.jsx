// Search Results List where the results should be popping up

import { SearchResult } from "./SearchResults";

export const SearchResultsList = ({ results }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult result={result.name} key={id} />;
        })}
      </div>
    );
  };