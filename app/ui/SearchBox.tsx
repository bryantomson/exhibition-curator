"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FormEvent, useState, useCallback, useEffect } from "react";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
    const [isHighlighted, setIsHighlighted] = useState(false);



  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const [isLoading, setIsLoading] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParams = useDebouncedCallback((term: string) => {
    router.push(`${pathname}?${createQueryString("query", term)}`, {
      scroll: false,
    });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsLoading(true);
    updateSearchParams(newValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`${pathname}?${createQueryString("query", inputValue)}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return (
    <div className="w-full ">
      <div className="flex items-center">
        <div className="mr-3 ml-3">
          <Search />
        </div>
        <label htmlFor="search" className="sr-only">
          {placeholder}
        </label>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            name="query"
            className="input w-full max-w-[75%] input-bordered input-primary"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onFocus={() => setIsHighlighted(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsHighlighted(false);
              }, 200);
            }}
          />
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>
      <div>
        <div
          className={`transition-opacity ${
            isHighlighted ? "opacity-100" : "opacity-0"
          }`}
        >
          {isHighlighted && <SearchSuggestions />}
        </div>
        <div className="">
          {isLoading && (
            <div className="ml-50">
              <span className="loading loading-spinner loading-lg "></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }
