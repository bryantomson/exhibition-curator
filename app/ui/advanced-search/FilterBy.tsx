"use client";

import React, { ChangeEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const FilterBy = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const currentFilters = params.get("filter");
  const currentFiltersArray = currentFilters ? currentFilters.split("|") : [];
  console.log("Current filters:", currentFiltersArray);



  const handlefilterBySelect = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked'
    );



    const filterValues = Array.from(checkboxes)
      .map((checkbox) => checkbox.value)
      .filter((value) => value !== "on");

    console.log("Checked values:", filterValues);
    const validFilterValues = ["artist", "title", "style"];
    const filteredValues = filterValues.filter((value) =>
      validFilterValues.includes(value)
    );

    console.log("Filtered values:", filteredValues);

    params.delete("filter"); // Remove the existing "filter" param

    if (filteredValues.length > 0) {
      params.set("filter", filteredValues.join("|")); // Add the updated "filter" param
    }

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <div className="collapse  collapse-arrow border-base-300 bg-base-200 border">
        <input type="checkbox" />

        <div className="collapse-title font-medium">Filter by</div>
        <div className="collapse-content">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Artist</span>
              <input
                type="checkbox"
                value="artist"
                checked={currentFiltersArray.includes("artist")}
                className="checkbox"
                onChange={handlefilterBySelect}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Style</span>
              <input
                type="checkbox"
                value="style"
                checked={currentFiltersArray.includes("style")}
                className="checkbox"
                onChange={handlefilterBySelect}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Title</span>
              <input
                type="checkbox"
                value="title"
                checked={currentFiltersArray.includes("title")}
                className="checkbox"
                onChange={handlefilterBySelect}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

 
};

export default FilterBy;
