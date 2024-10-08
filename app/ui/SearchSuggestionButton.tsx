'use client';

import React from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Props {
  suggestion: {
    name: string;
    type: string;
  };
  index: number;
}

  const buttonStyles = {
    "1": "primary",
    "2": "secondary",
    "3": "neutral",
    "4": "info",
    "5": "accent",
  };

  interface ButtonStyles {
    [key: number]: string;
  }

  function getClassName(index: number, buttonStyles: ButtonStyles): string {
    const key = (index % Object.keys(buttonStyles).length) + 1;

    return buttonStyles[key];
  }

const SearchSuggestionButton = ({suggestion, index}: Props) => {

 const searchParams = useSearchParams();
 const pathname = usePathname();
 const { replace } = useRouter();

 const handleSearchSuggestion = () => {

    const params = new URLSearchParams(searchParams);
    params.set("query", suggestion.name);
    replace(`${pathname}?${params.toString()}`);

 }

  return (
    <div key={index}>
    
      <button
      onClick={handleSearchSuggestion}
        className={`whitespace-nowrap w-fit px-4 py-2 flex gap-x-2  btn  btn-xs m-1 btn-${getClassName(
          index,
          buttonStyles
        )}`}
      >
        {suggestion.name}
      </button>
    </div>
  );
}

export default SearchSuggestionButton