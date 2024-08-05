const apikey = "7ed4f6bd8205496c";
const secretKey = "acbfc22a3f291bcc";
const baseUrl = "https://www.wikiart.org/en/Api/2";

const sessionKey = "84449d166a52";

let storedResults = [];
let currentResults = [];
let currentTerm = "";
let isMore;
let currentFilter = "";

export const searchArtworksFromWikiart = async (
  searchQuery,
  page,
  filter,
  dateRange
) => {
  const term = searchQuery || "";

  if (
    page === 1 &&
    currentTerm === term &&
    currentResults.length &&
    currentFilter === filter
  ) {
    storedResults = [];
    return currentResults;
  }

  const queryParams = new URLSearchParams({
    authSessionKey: sessionKey,
    term: term,
  });

  const url = `${baseUrl}/PaintingSearch?${queryParams}`;

  if (
    currentTerm !== term ||
    !currentResults.length ||
    currentFilter !== filter
  ) {
    isMore = true;
    storedResults = [];
    currentResults = [];
  }

  if (!storedResults.length && isMore) {
    try {
      const res = await fetch(url, { mode: "no-cors" });
      const resData = await res.json();

      const allResults = resData?.data || [];

      const enrichedResults = await Promise.all(
        allResults.map(async (result) => {
          const { id } = result;
          
          const { styles, galleries } = await fetchWikiArtStylesandGalleries(
            id
          );

          return {
            ...result,
            style: styles[0],
            gallery: galleries[0],
          };
        })
      );

      const filteredResults = [];

      if (dateRange) {
        filteredResults.push(
          ...filterWikiartByDates(enrichedResults, dateRange)
        );
      }
      if (filter) {
        filteredResults.push(
          ...filterWikiArtBySearchFilters(enrichedResults, filter, term)
        );
      } else {
        filteredResults.push(...enrichedResults);
      }

      const resultsToReturn = filteredResults.slice(0, 9);

      if (resultsToReturn.length) {
        currentResults.push(...resultsToReturn);
      }

      const resultsToStore =
        filteredResults.length > 9 ? filteredResults.slice(9) : [];

      if (resultsToStore.length) {
        storedResults.push(...resultsToStore);
      } else {
        isMore = false;
      }

      currentTerm = term;
      currentFilter = filter;

      return resultsToReturn;
    } catch (error) {
      isMore = false;
      return [];
    }
  }

  const resultsToReturn = storedResults.slice(0, 9);
  storedResults.splice(0, 9);

  if (resultsToReturn.length) {
    currentResults.push(...resultsToReturn);
  }

  return resultsToReturn;
};

const filterWikiartByDates = (results, dateRange) => {
  const datesArray = dateRange ? dateRange.split("-") : [];

  const dateFrom = dateRange ? datesArray[0] : undefined;
  const dateTo = dateRange ? datesArray[1] : undefined;

  if (dateFrom !== undefined && dateTo !== undefined) {
    return results.filter(
      (result) =>
        result.completitionYear >= dateFrom && result.completitionYear <= dateTo
    );
  }

  return results;
};

const filterWikiArtBySearchFilters = (results, filter, currentTerm) => {
  const filterArray = filter ? filter.split("|") : [];
  const lowerCurrentTerm = currentTerm.toLowerCase();

  const resultsToReturn = results.filter((result) => {
    if (!result || typeof result !== "object") {
      return false;
    }

    if (filterArray.length === 0) {
      return true;
    }

    return filterArray.some((item) => {
      switch (item) {
        case "artist":
          return (
            result.artistName &&
            result.artistName.toLowerCase().includes(lowerCurrentTerm)
          );
        case "title":
          return (
            result.title &&
            result.title.toLowerCase().includes(lowerCurrentTerm)
          );
        case "style":
          return (
            Array.isArray(result.style) &&
            result.style.some(
              (style) =>
                typeof style === "string" &&
                style.toLowerCase().includes(lowerCurrentTerm)
            )
          );
        default:
          return false;
      }
    });
  });

  return resultsToReturn || [];
};

export const getArtworkByIDFromWikiart = async (id) => {
  const queryParams = new URLSearchParams({
    authSessionKey: sessionKey,
    id,
  });

  const url = `${baseUrl}/Painting?${queryParams}`;

  const res = await fetch(url, { mode: "no-cors" });
  const resData = await res.json();

  return resData;
};

export const fetchWikiArtStylesandGalleries = async (id) => {
  // fetching code commented out to prevent too many API calls in development

  // const data = await getArtworkByIDFromWikiart(id);


  // Hardcoded data for testing purposes
  const data = {
    styles: [""],
    galleries: [""],
  };



  return data;
};
