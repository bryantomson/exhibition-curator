"use client"

import React from "react";
import SearchBy from "./advanced-search/FilterBy";
import YearRangePicker from "./advanced-search/YearRangePicker";
import SourcePicker from "./advanced-search/SourcePicker";
import { ChevronDown, ChevronUp } from "lucide-react";

const AdvancedSearch = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleInputChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full max-w-[50%] "> 
      <div className="collapse  bg-base-200 ">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleInputChange}
        />
        <div className="flex items-center  collapse-title text-base font-semibold">
          <p>Advanced search</p>
          {isChecked ? (
            <ChevronUp size={32} absoluteStrokeWidth />
          ) : (
            <ChevronDown size={32} absoluteStrokeWidth />
          )}
        </div>

        <div className="collapse-content flex justify-between ">
          <SearchBy />
          <SourcePicker />
          <YearRangePicker />

        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
