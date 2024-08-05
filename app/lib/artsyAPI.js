const clientID = "10c38d97ceb91703ac40";
const clientSecret = "dc83ba35e08bdb6e1306888d9a0be7ca";
const apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

const getXappToken = async () => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientID,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
};

const fetchArtistFromArtsy = async (artistId) => {
  const apiUrl = `https://api.artsy.net/api/artists/${artistId}`;
  const xappToken = await getXappToken();

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Xapp-Token": xappToken,
        Accept: "application/vnd.artsy-v2+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const artistData = await response.json();
    console.log(
      `${artistData.name} was born in ${artistData.birthday} in ${artistData.hometown}`
    );
    return artistData;
  } catch (error) {
    console.error("Error fetching artist data:", error);
  }
};
const searchArtworksFromArtsy = async (searchQuery) => {
  const xappToken = await getXappToken();

  const artist = await fetchArtistFromArtsy("4d8b92b34eb68a1b2c0003f4");


  const queryParams = new URLSearchParams({
    q: searchQuery,
    type: "artwork",
  });

  const apiUrl = `https://api.artsy.net/api/search?${queryParams}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Xapp-Token": xappToken,
        Accept: "application/vnd.artsy-v2+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const searchResults = await response.json();
  } catch (error) {
    console.error("Error fetching artist data:", error);
  }
};
const getArtworksByArtistIDfromArtsy = async (searchQuery) => {
  const xappToken = await getXappToken();

  const queryParams = new URLSearchParams({
    artist_id: "4d8b92684eb68a1b2c00009e",
  });

  const apiUrl = `https://api.artsy.net/api/artworks?${queryParams}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Xapp-Token": xappToken,
        Accept: "application/vnd.artsy-v2+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const searchResults = await response.json();




  } catch (error) {
    console.error("Error fetching artist data:", error);
  }
};

getXappToken()
  .then((token) => {
    console.log("XAPP Token:", token);
  })
  .catch((error) => {
    console.error("Error fetching XAPP Token:", error);
  });

searchArtworksFromArtsy("leonardo da vinci");

getArtworksByArtistIDfromArtsy();
