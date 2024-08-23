
export default function Home() {

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/hero.png)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 "></div>
      <div className="hero-content  text-white text-center">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-4xl">
          <h1 className="mb-5 text-5xl font-bold">Curate an exhibition</h1>
          <p className="mb-5">
            Curate your own digital gallery with masterpieces from vast art
            archives. Explore and showcase centuries of creativity at your
            fingertips. Bring history&apos;s greatest artworks together in
            unique, personalised exhibitions.
          </p>
          <a href="/search">
            <button className="btn btn-primary">Get Started</button>
          </a>
        </div>
      </div>
    </div>
  );
}
