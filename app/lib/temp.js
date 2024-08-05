import { getArtworkListFromArtic } from "./articAPI";
import {
  searchArtworksFromWikiart,
  getArtworkByIDFromWikiart,
} from "./wikiartAPI";

const pageSize = 20;
let leftoverResults = [];
let currentSearchTerm = "";

export const runSearch = async (searchQuery, page = 1) => {
  const offset = (page - 1) * pageSize;

  // Combine leftover results with potential new results
  let combinedResults = [...leftoverResults];
  leftoverResults = []; // Clear leftover results after using them

  // Fetch data from APIs
  const articRes = await getArtworkListFromArtic(searchQuery);
  const wikiartRes = await searchArtworksFromWikiart(searchQuery);

  // Process Artic data
  const articFormatted = articRes.map((item) => ({
    artist: item.artist_title,
    title: item.title,
    description: item.short_description || item.description,
    thumbnail: item.thumbnail?.lqip,
    image_alt: item.thumbnail?.alt_text,
    image_url: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
    date: item.date_display,
    style: item.style_title,
    source: "Art Institute of Chicago",
  }));

  // Process WikiArt data
  const wikiartProcessed = wikiartRes.map((item) => ({
    artist: item.artistName,
    title: item.title,
    description: "description placeholder",
    thumbnail: item.image,
    image_alt: "alt text placeholder",
    image_url: item.image,
    date: item.completitionYear,
    style: "style placeholder",
    source: "WikiArt",
    id: item.id,
  }));

  // Combine arrays
  const combinedArtworks = [...articFormatted, ...wikiartProcessed];

  //remove duplicates

  const artworks = removeDuplicates(combinedArtworks);

  // Filtering and sorting (replace with your actual logic)
  const sortedArtworks = artworks.sort((a, b) => {
    const aArtistMatch = a.artist
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const aTitleMatch = a.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const aDescriptionMatch = a.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const bArtistMatch = b.artist
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const bTitleMatch = b.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const bDescriptionMatch = b.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Prioritize artist match, then title match, then description match
    if (aArtistMatch && !bArtistMatch) return -1;
    if (!aArtistMatch && bArtistMatch) return 1;
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    if (aDescriptionMatch && !bDescriptionMatch) return -1;
    if (!aDescriptionMatch && bDescriptionMatch) return 1;
    return 0; // No clear match, maintain original order
  });

  //fetching styles for wikiart

  let counter = 0;
  const enrichedArtworks = [];

  for (const artwork of sortedArtworks) {
    if (counter < 9 && artwork.source === "WikiArt") {
      const data = await getArtworkByIDFromWikiart(artwork.id);
      enrichedArtworks.push({ ...artwork, style: data.style });
      counter++;
    } else {
      enrichedArtworks.push(artwork); // Add remaining items (WikiArt or others)
    }
    if (counter === 9) {
      break; // Stop iterating after 9 cycles
    }
  }

  // Wait for all style fetches to complete before proceeding
  const finalArtworks = await Promise.all(enrichedArtworks);

  // ... rest of the code (enrichedWikiArt, slicing, leftover results, etc.)

  // Combine results, potentially fetching more if needed
  combinedResults.push(...finalArtworks);
  if (combinedResults.length < pageSize) {
    const newResults = await fetchNewResults(
      searchQuery,
      offset + combinedResults.length
    );
    combinedResults.push(...newResults);
  }

  // Slice results for the current page and store leftover results
  const pageResults = combinedResults.slice(offset, offset + pageSize);

  if (searchQuery !== currentSearchTerm) {
    leftoverResults = [];
    currentSearchTerm = searchQuery;
  } else {
    leftoverResults = combinedResults.slice(pageSize);
  }

  return pageResults;
};


const removeDuplicates = (artworks) => {
  const uniqueArtworks = new Map();

  artworks.forEach((artwork) => {
    const key = `${artwork.artist}:${artwork.title}`;
    if (!uniqueArtworks.has(key)) {
      uniqueArtworks.set(key, artwork);
    } else {
      const existingArtwork = uniqueArtworks.get(key);
      const existingSize = existingArtwork.width * existingArtwork.height;
      const newSize = artwork.width * artwork.height;

      if (newSize > existingSize) {
        uniqueArtworks.set(key, artwork);
      }
    }
  });

  return Array.from(uniqueArtworks.values());
};

// Function to fetch new results (implementation required)
async function fetchNewResults(searchQuery, offset) {
  // Implement logic to fetch additional results from your data sources
  // based on searchQuery and offset
  // This function should return an array of artwork objects
  // similar to articFormatted or wikiartFormatted
  return []; // Replace with actual implementation
}
