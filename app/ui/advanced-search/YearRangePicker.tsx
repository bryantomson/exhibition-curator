"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const YearRangePicker: React.FC = () => {
  const [fromYear, setFromYear] = useState<string>("");
  const [toYear, setToYear] = useState<string>("");
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFromYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromYear(e.target.value);
    validateYears(e.target.value, toYear);
  };

  const handleToYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToYear(e.target.value);
    validateYears(fromYear, e.target.value);
  };

  const validateYears = (from: string, to: string) => {
    const fromYearNum = parseInt(from, 10);
    const toYearNum = parseInt(to, 10);
    const params = new URLSearchParams(searchParams);

    if (isNaN(fromYearNum) || isNaN(toYearNum)) {
      setError("Please enter valid years.");
      params.delete("fromYear");
      params.delete("toYear");
    } else if (fromYearNum > toYearNum) {
      setError('"From" year must be earlier than "To" year.');
      params.delete("fromYear");
      params.delete("toYear");
    } else if (fromYearNum < 0 || toYearNum < 0) {
      setError("Years must be 0 AD or later.");
      params.delete("fromYear");
      params.delete("toYear");
    } else {
      setError("");
      console.log("Years are valid");
      params.set("fromYear", from);
      params.set("toYear", to);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="collapse  collapse-arrow border-base-300 bg-base-200 border">
        <input type="checkbox" />
        <div className="collapse-title font-medium">Year range</div>
        <div className="collapse-content">
          <label className="input input-bordered flex items-center mb-2 gap-2">
            From
            <input
              type="text"
              className="grow"
              placeholder="Enter year..."
              value={fromYear}
              onChange={handleFromYearChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            To
            <input
              type="text"
              className="grow"
              placeholder="Enter year..."
              value={toYear}
              onChange={handleToYearChange}
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default YearRangePicker;
