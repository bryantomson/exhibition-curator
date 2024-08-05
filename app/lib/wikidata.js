async function searchArtworks(query) {
  // SPARQL query with a search term filter
  const sparqlQuery = `
    SELECT ?item ?itemLabel ?artistLabel ?image ?description WHERE {
      ?item wdt:P31 wd:Q3305213;  # instance of artwork
            wdt:P170 ?artist;      # artist property
            wdt:P18 ?image;        # image property
            schema:description ?description. # description property

      FILTER(CONTAINS(LCASE(?itemLabel), LCASE("${query}")))
      FILTER(LANG(?description) = "en")
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    LIMIT 10
  `;

  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(
    sparqlQuery
  )}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyApp/1.0 (your-email@example.com)", // Replace with your app name and contact
      },
    });

    if (!response.ok) {
      const responseBody = await response.text(); // Get the response body as text
      throw new Error(
        `HTTP error! Status: ${response.status}. Response: ${responseBody}`
      );
    }

    const data = await response.json();

    const results = data.results.bindings.map((result) => ({
      title: result.itemLabel.value,
      artist: result.artistLabel?.value || "Unknown Artist",
      image: result.image?.value,
      description: result.description?.value,
    }));

    console.log(results);
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
  }
}

// Example usage with a search term
const searchTerm = "da vinci"; // Replace with your desired search term
searchArtworks(searchTerm);
