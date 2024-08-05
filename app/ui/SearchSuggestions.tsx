import React from "react";
import { searchSuggestions } from "../lib/searchsuggestions";
import SearchSuggestionButton from "./SearchSuggestionButton";

const SearchSuggestions = () => {
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledSuggestions = shuffleArray(searchSuggestions);

  return (
    <div className="p-2 pb-3 overflow-x-auto flex gap-x-2">
      {shuffledSuggestions.map(
        (suggestion: { name: string; type: string }, index: number) => {
          return (
            <SearchSuggestionButton suggestion={suggestion} key={index} index={index} />
          );
        }
      )}
    </div>
  );
};

export default SearchSuggestions;
