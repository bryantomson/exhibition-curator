

   const genres = [
        "cubism",
        "impressionism",
        "expressionism",
        "realism",
        "romanticism",
        "baroque",
        "rococo",
        "renaissance",
        "modernism",
        "postmodernism",
      ];

      const artists = [
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Claude Monet",
        "Salvador Dalí",
        "Frida Kahlo",
        "Michelangelo",
        "Rembrandt",
        "Jackson Pollock",
        "Andy Warhol",
        "Georgia O'Keeffe",
        "Henri Matisse",
        "Edgar Degas",
        "Gustav Klimt",
        "Edvard Munch",
      ];




export const getArt = async () => {
  const art = await (await fetch("https://jsonplaceholder.typicode.com/photos")).json()

 art.forEach((element, index) => {
        element.genre = genres[index % 10];
        element.artist = artists[index % 15];
      });




      
return art
}

