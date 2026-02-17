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

  useEffect(() => {
    const query = searchParams.get('query') || '';
    setInputValue(query);
  }, [searchParams]);

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
    <div className="w-full m-4">
      <div className="w-full flex justify-center">
        <div className="relative w-2/3">
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-full mr-5">
            <Search />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="sr-only">
              {placeholder}
            </label>
            <input
              onChange={handleInputChange}
              name="query"
              className="input w-full input-bordered input-primary"
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
