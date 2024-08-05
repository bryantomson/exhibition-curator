
async function searchArtworks(query) {
  const url = "https://commons.wikimedia.org/w/api.php";
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srsearch: query,
    srlimit: "10", // limit the number of results
    srnamespace: "6", // search in the file namespace (namespace 6 is for files)
  });

  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    const searchResults = data.query.search;

    const artworkDetails = await Promise.all(
      searchResults.map(async (result) => {
        const fileDetails = await getFileDetails(result.title);
        return fileDetails;
      })
    );

  } catch (error) {
    console.error("Error searching artworks:", error);
  }
}

async function getFileDetails(title) {
  const url = "https://commons.wikimedia.org/w/api.php";
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "imageinfo",
    titles: title,
    iiprop: "url|size|mime|thumbmime|extmetadata", // additional metadata
  });

  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    const pages = data.query.pages;
    const fileDetails = Object.values(pages)[0].imageinfo[0];

    console.log(fileDetails, "fddd");

    return {
      url: fileDetails.url,
      descriptionurl: fileDetails.descriptionurl,
      thumburl: fileDetails.thumburl,
      title: fileDetails.extmetadata.ObjectName.value,
      date: fileDetails.extmetadata.DateTimeOriginal.value,
      artist: fileDetails.extmetadata.Artist.value
    };
  } catch (error) {
    console.error("Error getting file details:", error);
  }
}

// Example usage
searchArtworks("henri matisse");
