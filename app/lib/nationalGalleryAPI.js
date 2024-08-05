async function searchSmithsonianArtworks(query) {
  const url = `https://api.si.edu/openaccess/api/v1.0/search?q=${encodeURIComponent(
    query
  )}&api_key=Kic33Lhmv8qK67cmDuRQTHm5vAYfBkFCaCDKVNQu`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();


    const results = data.response.rows.map((artwork) => ({
      title: artwork.title,
      artist: artwork.content.descriptiveNonRepeating.record_ID,
    //   image:
    //     artwork.content.descriptiveNonRepeating.online_media.media[0].content,
    //   description: artwork.content.freetext.notes[0].content,
    }));

    // console.log(results);
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
  }
}

// Example usage with a search term
const searchTerm = "picasso";
searchSmithsonianArtworks(searchTerm);
