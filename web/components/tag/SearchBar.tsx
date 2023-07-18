import React from "react";
import {ItemRow, Dropdown} from '../../lib/hf-react'

type SearchBarType = {
  /**
   * Sort options available
   */
  sortOptions?: string[];
  /**
   * Whether this is being rendered on top of below the list
   */
  isTop: boolean;
};

export const SearchBar: React.FC<SearchBarType> = ({
  // eslint-disable-next-line react/prop-types
  sortOptions,
  // eslint-disable-next-line react/prop-types
  isTop=true,
}) => {

  const border = isTop ? "b" : "t";

  return (
    <nav
      className={`px-4 flex items-center justify-between sm:px-0 mb-10`}
    >
      <div className="-mt-px w-0 flex-1 flex">
      </div>
      <div className="hidden md:-mt-px md:flex">
        <div className="-mt-px flex-1 flex">
          <span className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500">
            {/* Sort by&nbsp; <Dropdown values={sortOptions} /> */}
          </span>
        </div>
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
      </div>
    </nav>
  );
};
