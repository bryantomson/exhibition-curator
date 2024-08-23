"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import AddCollectionButton from "./AddCollectionButton";

interface Artwork {
  id: string;
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

const Modal = ({ artwork }: { artwork: Artwork }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="relative w-full h-full bg-base-200">
      <img
        className="w-full h-full object-contain"
        src={artwork.image_url}
        alt={artwork.image_alt}
      />
      <div className=" absolute inset-0 flex flex-col items-center justify-end text-white bg-drop-shadow-lg  overflow-auto">
        <div className="collapse bg-base-200/50 w-full mb-0">
          <input
            className="max-w-[50%]"
            type="checkbox"
            onChange={handleInputChange}
          />
          <div className="collapse-title text-xl font-medium">
            <h1 className="text-2xl font-bold mb-2">{artwork.title}</h1>
            <h2 className="text-xl font-semibold mb-4">{artwork.artist}</h2>
            <p className="flex items-center justify-start">
              {artwork.date}
              <span className="font-normal text-sm text-info ml-2 flex items-center ">
                {isChecked ? (
                  <React.Fragment>
                    Show less
                    <ChevronDown />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Show more info
                    <ChevronUp />
                  </React.Fragment>
                )}
              </span>
            </p>
            <div className="toast toast-end ">
              <AddCollectionButton artwork={artwork} />
            </div>
          </div>
          <div className="collapse-content">
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
    </div>
  );
};

export default Modal;
