"use server";

import { fetchArtworksByKeyword } from "../lib/data";

interface FetchArtworksParams {
  query?: string;
  page?: number;
  hue?: string;
  artic?: string;
  wikiart?: string;
  filter?: string;
  dateRange?: string;
}

export const fetchArtworks = async ({
  query = "",
  page = 1,
  hue,
  artic,
  wikiart,
  filter,
  dateRange,
}: FetchArtworksParams) => {
  const artworks = await fetchArtworksByKeyword(
    query,
    page,
    hue,
    artic,
    wikiart,
    filter,
    dateRange
  );

  return artworks;
};
