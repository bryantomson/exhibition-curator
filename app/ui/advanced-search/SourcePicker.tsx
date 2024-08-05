"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SourcePicker = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const articCurrent = params.get("artic");
  const wikiartCurrent = params.get("wikiart");

  const handleSourceSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.checked) {
      params.set(event.target.value, "yes");
    } else {
      params.set(event.target.value, "no");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div>
        <div className="collapse  collapse-arrow border-base-300 bg-base-200 border">
          <input type="checkbox" />
          <div className="collapse-title  font-medium">Artwork source</div>
          <div className="collapse-content">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Artic</span>
                <input
                  type="checkbox"
                  checked={articCurrent !== "no" ? true : false}
                  className="checkbox"
                  value="artic"
                  onChange={handleSourceSelect}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">WikiArt</span>
                <input
                  checked={wikiartCurrent !== "no" ? true : false}
                  type="checkbox"
                  className="checkbox"
                  value="wikiart"
                  onChange={handleSourceSelect}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcePicker;
