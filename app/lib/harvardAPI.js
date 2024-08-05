export const searchArtworksFromHavard = async (searchQuery) => {

const apikey = 'e1a51f7c-5c99-46a7-b46c-4a3487b492fe'
const query = searchQuery

  const queryParams = new URLSearchParams({
    apikey,
    keyword: query,
    sort: "rank",
    sortorder: 'asc',
   
  });

  const apiUrl = `https://api.harvardartmuseums.org/object?${queryParams}`;


  const response = await fetch(apiUrl);
  const responseData = await response.json();

  return responseData.records;
};
