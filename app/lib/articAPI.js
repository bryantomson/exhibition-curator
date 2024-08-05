export const fetchArtworkFromArtic = async (
  searchQuery,
  page = 1,
  hue,
  filter,
  dateRange,
  sort = "colorfulness",
  sortBy = "desc",
  hueRange = 20
) => {
  try {
    const queryObject = {
      page,
      sort: { [sort]: { order: sortBy } },
      fields:
        "id, artist_title,title,thumbnail,date_display,place_of_origin,description,short_description,medium_display,style_titles,style_title,image_id,color,colorfulness,date_end",
      query: {
        bool: {
          must: [],
        },
      },
    };

    const filterArray = filter ? filter.split("|") : [];

    const updatedFilterArray = filterArray.map((item) => {
      if (item === "artist") {
        return "artist_title";
      } else if (item === "title") {
        return "title";
      } else if (item === "style") {
        return "style_title";
      } else {
        return item;
      }
    });

    if (!filter || !filter.length) {
      queryObject.query.bool.must.push({
        multi_match: {
          query: searchQuery,
          fields: ["artist_title", "title", "style_title"],
        },
      });
    } else {
      queryObject.query.bool.must.push({
        multi_match: {
          query: searchQuery,
          fields: updatedFilterArray,
        },
      });
    }

    if (hue !== undefined && hueRange !== undefined) {
      queryObject.query.bool.must.push({
        range: {
          "color.h": {
            gte: Number(hue) - hueRange,
            lte: Number(hue) + hueRange,
          },
        },
      });
    }

    const datesArray = dateRange ? dateRange.split("-") : [];
    const dateFrom = dateRange ? datesArray[0] : undefined;
    const dateTo = dateRange ? datesArray[1] : undefined;

    if (dateFrom !== undefined && dateTo !== undefined) {
      queryObject.query.bool.must.push({
        range: {
          date_end: {
            gte: Number(dateFrom),
            lte: Number(dateTo),
          },
        },
      });
    }

    const jsonString = JSON.stringify(queryObject);
    const encodedQuery = encodeURIComponent(jsonString);
    const url = `https://api.artic.edu/api/v1/artworks/search?params=${encodedQuery}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching artwork from Artic:", error);
    return { data: [], error: error.message };
  }
};
