import Table from "./Table";
import { fetchArtworks } from "../search/actions";



interface SearchResultTableProps {
  query: string;
  hue?: string;
  artic?: string;
  wikiart?: string;
  page?: number; 
  filter?: string;
  dateRange?: string;
}


const SearchResultTable: React.FC<SearchResultTableProps> = async ({
  query,
  hue,
  artic,
  wikiart,
  page = 1, 
  filter,
  dateRange
}) => {
  const initialArtworks = await fetchArtworks({ query, hue, artic,wikiart,  filter, dateRange });



  return (
    <div>

      <Table
        key={Math.random()}
        initialArtworks={initialArtworks}
        query={query}
        hue={hue}
        artic={artic}
        wikiart={wikiart}
        filter={filter}
        dateRange={dateRange}
      
      />

    </div>
  );
};

export default SearchResultTable;
