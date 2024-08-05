import React from "react";
import Exhibition from "../ui/Exhibition";
import { X } from "lucide-react";

const page = () => {
  return (
    <div className="h-screen">
      <a
        href="/search"
      >
        <X size={36} />
      </a>
      <Exhibition />
    </div>
  );
};

export default page;
