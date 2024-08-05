import React, { Suspense } from "react";
import SearchResultTable from "../ui/SearchResultTable";
import SearchOptions from "../ui/AdvancedSearch";
import StartExhibitionButton from "../ui/StartExhibitionButton";
import CollectionDrawer from "../ui/CollectionDrawer";
import NavBar from "../ui/NavBar";
import SearchBox from "@/app/ui/SearchBox";

const SearchPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    hue?: string | undefined;
    artic?: string | undefined;
    wikiart?: string | undefined;
    filter?: string | undefined;
    fromYear?: string | undefined;
    toYear?: string | undefined;
  };
}) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || "1";
  const hue = searchParams?.hue || undefined;
  const artic = searchParams?.artic || "yes";
  const wikiart = searchParams?.wikiart || "yes";
  const filter = searchParams?.filter || undefined;
  const dateRange = searchParams?.fromYear + "-" + searchParams?.toYear;

  const currentPage = Number(page);

  return (
    <>
      <NavBar />
      <div className="fixed top-0 right-0 z-50">
        <CollectionDrawer />
      </div>

      <h1 className="text-4xl  text-center font-semibold m-3 drop-shadow-sm ">
        Search artworks to add to your collection.
      </h1>
      <div className="flex flex-col items-left justify-left ">
        <SearchBox placeholder="Search paintings by artist, style etc..."></SearchBox>
        <SearchOptions />
      </div>

      <div>
        <Suspense fallback="Loading...">
          <SearchResultTable
            query={query}
            hue={hue}
            artic={artic}
            wikiart={wikiart}
            page={currentPage}
            filter={filter}
            dateRange={dateRange}
          />
        </Suspense>
      </div>
      <StartExhibitionButton />
    </>
  );
};

export default SearchPage;
