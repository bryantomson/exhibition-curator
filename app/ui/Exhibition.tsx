"use client";

import React from "react";
import { useCollection } from "../../hooks/use-collection";
import ArtworkInfo from "./ArtworkInfo";
import { X } from "lucide-react";
import Link from "next/link";

const Exhibition = () => {
  const { items } = useCollection();
  return (
    <div>

      <div className="carousel w-full relative overflow-hidden h-screen">

        {items.map((item, index) => {
          const divId = index + 1;
          return (
            <>
              <div
                key={divId}
                id={`slide${divId}`}
                className="carousel-item relative w-full flex items-center justify-center 
"
              >
                <img
                  src={item.image_url}
                  className="max-w-full max-h-full object-contain"
                />

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-0 bg-opacity-50 rounded-lg z-10">
                  <ArtworkInfo key={item.id} artwork={item} />
                </div>
                <a
                  href="/search"
                  className="absolute top-0 left-0   m-5 tooltip tooltip-right"
                  data-tip="Close exhibition"
                >
                  <X/>
                </a>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${divId - 1 < 1 ? items.length : divId - 1}`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${divId + 1 > items.length ? 1 : divId + 1}`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Exhibition;