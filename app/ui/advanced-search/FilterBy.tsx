'use client';
import React, { ChangeEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const VALID_FILTER_VALUES = ['artist', 'title', 'style'] as const;

const FilterBy = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const currentFilters = params.get('filter');
  const currentFiltersArray = currentFilters ? currentFilters.split('|') : [];

  const isAllChecked = VALID_FILTER_VALUES.every((f) =>
    currentFiltersArray.includes(f),
  );

  const handleAllChange = () => {
    const params = new URLSearchParams(searchParams);
    if (isAllChecked) {
      params.delete('filter');
    } else {
      params.set('filter', VALID_FILTER_VALUES.join('|'));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handlefilterBySelect = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const { value, checked } = event.target;

    const updatedFilters = checked
      ? [...currentFiltersArray, value]
      : currentFiltersArray.filter((f) => f !== value);

    const filteredValues = updatedFilters.filter((v) =>
      VALID_FILTER_VALUES.includes(v as (typeof VALID_FILTER_VALUES)[number]),
    );

    params.delete('filter');
    if (filteredValues.length > 0) {
      params.set('filter', filteredValues.join('|'));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="collapse collapse-arrow border-base-300 bg-base-200 border">
        <input type="checkbox" />
        <div className="collapse-title font-medium">Search in:</div>
        <div className="collapse-content">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">All</span>
              <input
                type="checkbox"
                checked={isAllChecked}
                className="checkbox"
                onChange={handleAllChange}
              />
            </label>
          </div>
          <div className="divider my-0" />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Artists</span>
              <input
                type="checkbox"
                value="artist"
                checked={currentFiltersArray.includes('artist')}
                className="checkbox"
                onChange={handlefilterBySelect}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Styles</span>
              <input
                type="checkbox"
                value="style"
                checked={currentFiltersArray.includes('style')}
                className="checkbox"
                onChange={handlefilterBySelect}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Titles</span>
              <input
                type="checkbox"
                value="title"
                checked={currentFiltersArray.includes('title')}
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
