import { fetchArtworkFromArtic } from "./articAPI";
import { searchArtworksFromWikiart } from "./wikiartAPI";

const pageSize = 20;

export const formatArticData = (articRes) => {
  try {
    if (!articRes || !articRes.data) return [];
    if (articRes.data.length === 0) return [];
    return articRes.data.map((item) => ({
      id: item.id,
      artist: item.artist_title,
      title: item.title,
      description: item.short_description || item.description || "",
      thumbnail: item.thumbnail?.lqip,
      image_alt: item.thumbnail?.alt_text,
      image_url: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
      date: item.date_display,
      style: item.style_title || "",
      source: "Art Institute of Chicago",
      location: "Art Institute of Chicago",
    }));
  } catch (error) {
    console.error("Error formatting Artic data:", error);
    return [];
  }
};

export const formatWikiartData = (wikiartRes) => {
  try {
    if (!wikiartRes || wikiartRes.length === 0) return [];
    return wikiartRes.map((item) => ({
      artist: item.artistName || "Unknown",
      title: item.title || "Untitled",
      location: item.gallery || "Unknown",
      description: "description placeholder",
      thumbnail: item.image || "",
      image_alt: "alt text placeholder",
      image_url: item.image || "",
      date: item.completitionYear || "Unknown",
      style: item.style || "",
      source: "WikiArt",
      id: item.id || "Unknown",
    }));
  } catch (error) {
    console.error("Error formatting Wikiart data:", error);
    return [];
  }
};

export const removeDuplicates = (artworks) => {
  try {
    const uniqueArtworks = new Map();

    artworks.forEach((artwork) => {
      const key = `${artwork.artist}:${artwork.title}`;
      if (!uniqueArtworks.has(key)) {
        uniqueArtworks.set(key, artwork);
      }
    });

    return Array.from(uniqueArtworks.values());
  } catch (error) {
    console.error("Error removing duplicates:", error);
    return artworks;
  }
};

export const sortArtworks = (combinedArtworks, searchQuery) => {
  try {
    if (!combinedArtworks || combinedArtworks.length === 0) return [];
    return combinedArtworks.sort((a, b) => {
      const aArtistMatch = a?.artist
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const aTitleMatch = a?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const bArtistMatch = b?.artist
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const bTitleMatch = b?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (aArtistMatch && !bArtistMatch) return -1;
      if (!aArtistMatch && bArtistMatch) return 1;
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });
  } catch (error) {
    console.error("Error sorting artworks:", error);
    return combinedArtworks;
  }
};

export const fetchArtworksByKeyword = async (
  searchQuery,
  page,
  hue,
  artic,
  wikiart,
  filter,
  dateRange
) => {
  let articRes = [];
  let wikiartRes = [];

  try {
    if (artic === "yes" || artic === undefined) {
      articRes = await fetchArtworkFromArtic(
        searchQuery,
        page,
        hue,
        filter,
        dateRange
      );
    }

    if (wikiart === "yes" || wikiart === undefined) {
      wikiartRes = await searchArtworksFromWikiart(
        searchQuery,
        page,
        filter,
        dateRange
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const formattedArticData = formatArticData(articRes);
  const formattedWikiartData = formatWikiartData(wikiartRes);

  let combinedArtworks = removeDuplicates([
    ...formattedArticData,
    ...formattedWikiartData,
  ]);

  const sortedArtworks = sortArtworks(combinedArtworks, searchQuery);
  return sortedArtworks.slice(0, pageSize);
};
