"use client";

import React, {  useEffect, useRef, useState } from "react";
import { fetchArtworks } from "../search/actions";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import LoadMoreButton from "./LoadMoreButton";
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
  location: string;
  source: string;
}

interface TableProps {
  initialArtworks?: Artwork[];
  query: string;
  hue?: string;
  artic?: string;
  wikiart?: string;
  filter?: string;
  dateRange?: string;
}

const Table: React.FC<TableProps> = ({
  initialArtworks = [],
  query,
  hue,
  artic,
  wikiart,
  filter,
  dateRange,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [page, setPage] = useState(1);
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  const scrollPosition = useRef(0);
  const [noMoreArtworks, setNoMoreArtworks] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentArtwork) return;

    dialogRef.current?.showModal();

    document.body.style.overflow = "hidden";

    dialogRef.current?.addEventListener("close", closeModal);
    document.body.addEventListener("keydown", handleOnKeyDown);

    return () => {
      dialogRef.current?.removeEventListener("close", closeModal);
      document.body.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [currentArtwork]);

  function closeModal() {
    dialogRef.current?.close();
    setCurrentArtwork(null);
    document.body.style.overflow = "";
  }

  function handleOnKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      showNextItem("right");
    } else if (event.key === "ArrowLeft") {
      showNextItem("left");
    }
  }

  function showNextItem(direction: string) {
    if (!artworks.length || !currentArtwork) return;

    console.log("HELLO");

    const currentIndex = artworks.indexOf(currentArtwork);

    if (typeof currentIndex === "undefined") return;

    if (direction === "right") {
      if (currentIndex + 1 < artworks.length) {
        setCurrentArtwork(artworks[currentIndex + 1]);
      }
    } else if (direction === "left") {
      if (currentIndex - 1 >= 0) {
        setCurrentArtwork(artworks[currentIndex - 1]);
      }
    }
  }

  async function loadMoreArtworks() {
    setIsLoading(true);
    const next = page + 1;
    // Assuming fetchArtworks is imported and properly typed
    const newArtworks = await fetchArtworks({
      query,
      page: next,
      hue,
      artic,
      wikiart,
      filter,
      dateRange,
    });
    if (newArtworks?.length) {
      setPage(next);
      setArtworks((prev) => [...prev, ...newArtworks]);
      setIsLoading(false);
    } else {
      setNoMoreArtworks(true);
    }
  }

  return (
    <>
      <div className="">
        <div className="w-[80vw]">
          <dialog
            ref={dialogRef}
            // className="bg-white w-3/4 h-3/4 p-0 shadow-lg rounded-lg backdrop:bg-black/80"
            onClick={closeModal}
            className="modal modal-bottom sm:modal-middle"
          >
            <div
              className="modal-box  h-[90vh] p-0 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {currentArtwork && <Modal artwork={currentArtwork} />}

              <div
                onClick={() => {
                  if (currentArtwork)
                    console.log(
                      artworks.indexOf(currentArtwork),
                      artworks.length - 1
                    );
                }}
              ></div>
              <div className="absolute align-middle">
                {currentArtwork &&
                artworks.indexOf(currentArtwork) === artworks.length - 1 ? (
                  <LoadMoreButton
                    onClick={loadMoreArtworks}
                    showNext={showNextItem}
                  />
                ) : (
                  ""
                )}
              </div>
              <button className=" absolute top-2 right-2" onClick={closeModal}>
                <IoMdClose className="text-2xl	" />
                <span className="sr-only">Close</span>
              </button>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
                onClick={() => showNextItem("left")}
              >
                <div className="btn btn-circle">❮ </div>

                <span className="sr-only">Close</span>
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => showNextItem("right")}
              >
                <div className="btn btn-circle"> ❯</div>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </dialog>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artworks.map((result) => {
            return (
              <div key={result.id} className=" bg-base-100 grid gap-4 ">
                <div className="cursor-pointer h-auto max-w-full rounded-lg">
                  <img
                    onClick={() => {
                      scrollPosition.current = window.scrollY;
                      setCurrentArtwork(result);
                      window.scrollTo(0, scrollPosition.current);
                    }}
                    src={result.image_url}
                    alt={result.image_alt}
                  />
                  <div className="flex-col ">
                    <p className="text-lg truncate max-w-[300px]">
                      {result.title}
                    </p>
                    <p className="font-semibold text-primary">
                      {result.artist}
                    </p>

                    <p className="text-secondary">{result.date}</p>
                    <p className="text-info pt-2">{result.style && result.style}</p>

                    <div className="flex justify-end">
                      <div>
                        <AddCollectionButton artwork={result} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-[80%] justify-center  p-4">
          {query && !artworks.length
            ? "No results found. Try searching for something else."
            : ""}
        </div>
        <div className="flex max-w-[25%] justify-start items-center">
          <div className="flex w-full">
            <div className="pl-4 mb-4 flex-grow">
              {artworks.length && !noMoreArtworks ? (
                <LoadMoreButton
                  showNext={showNextItem}
                  onClick={loadMoreArtworks}
                />
              ) : (
                noMoreArtworks && "No more results to show."
              )}
            </div>
            <div className="flex items-center justify-center w-1/4">
              {isLoading && (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
