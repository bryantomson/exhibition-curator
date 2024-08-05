"use client";

import Link from "next/link";
import React from "react";
import { useCollection } from "../../hooks/use-collection";

const StartExhibitionButton = () => {
  const { items } = useCollection();
  const itemCount = items.length;



  if (itemCount > 0) {
    return (
      <div className="toast toast-center">
        <Link href="/exhibition">
          <div className="btn btn-accent border-1 border-slate-400 p-4 pl-8 pr-8 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200">
            <span>Start Exhibition ➤</span>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="toast toast-center">

        <div className="btn btn-neutral bg-opacity-90">
          <span>Add some artworks to your collection to start an exhibition ➤</span>
        </div>

    </div>
  );
};

export default StartExhibitionButton;
