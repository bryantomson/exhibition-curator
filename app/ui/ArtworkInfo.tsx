"use client";

import React, { useState } from "react";

interface Artwork {
  artist: string;
  title: string;
  description: string;
  thumbnail: string;
  image_alt: string;
  image_url: string;
  date: string;
  style: string;
  source: string;
}

const ArtworkInfo = ({ artwork }: { artwork: Artwork }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <div
        className={`collapse border-3 bg-opacity-${
          isChecked ? "50" : "0"
        } w-full bg-base-200`}
      >
        <input type="checkbox" onChange={() => setIsChecked(!isChecked)} >
        </input>

        <div className="collapse-title border-3 btn-xs text-xl font-medium flex items-center justify-center h-full">
          {isChecked ? (
            <button className="btn btn-sm border-1 border-slate-400">
              Hide info
            </button>
          ) : (
            <button className="btn btn-sm border-1 border-slate-400">
              Show info
            </button>
          )}
        </div>
        <div className="collapse-content bg-opacity-100 w-[75vw] text-white text-lg">
          <h1 className="text-2xl font-bold mb-2">{artwork.title}</h1>
          <h2 className="text-xl font-semibold mb-4">{artwork.artist}</h2>
          <p className="flex items-center justify-start">{artwork.date}</p>
          <p className="text-sm mb-4">
            <p dangerouslySetInnerHTML={{ __html: artwork.description }} />
          </p>
          <p className="text-sm mb-4">
            <span className="font-semibold">Source:</span> {artwork.source}
          </p>
          <p className="text-sm mb-4">
            <span className="font-semibold">Style:</span> {artwork.style}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkInfo;
