"use client"
import { RotateCcw } from "lucide-react";
import React from "react";
import { useCollection } from "../../hooks/use-collection";

const ClearCollection = () => {
  const { clearCollection } = useCollection();
  return (
    <button
      className="tooltip right-2 ml-5"
      data-tip="Clear collection"
      aria-label="Clear collection"
      onClick={clearCollection}
    >
      <RotateCcw />
    </button>
  );
};

export default ClearCollection;
