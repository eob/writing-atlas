import React from "react";

type ListPagerType = {
  /**
   * Total number of items available
   */
  total: number;
  /**
   * The current page, 1-indexed
   */
  page: number;
  /**
   * The count of the step size of each page
   */
  step: number;
  /**
   * The number of items being shown on this page. Should not exceed step.
   */
  count: number;
  /**
   * The slug to create a next and prev link of the form /slug/page
   */
  slug: string;
  /**
   * Whether this is being rendered on top of below the list
   */
  isTop: boolean;
};

export const ListPager: React.FC<ListPagerType> = ({
  // eslint-disable-next-line react/prop-types
  total,
  // eslint-disable-next-line react/prop-types
  page,
  // eslint-disable-next-line react/prop-types
  step,
  // eslint-disable-next-line react/prop-types
  count,
  // eslint-disable-next-line react/prop-types
  slug,
  // eslint-disable-next-line react/prop-types
  isTop,
}) => {
  const showPrev = page > 1;
  const showNext = page * step < total;

  const prevLink = page < 3 ? `/${slug}` : `/${slug}/${page - 1}`;

  const border = isTop ? "b" : "t";

  if (!showPrev && !showNext) {
    return null;
  }
  return (
    <nav
      className={`border-${border} border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-10`}
    >
      <div className="-mt-px w-0 flex-1 flex">
        {showPrev && (
          <a
            href={prevLink}
            className={`border-${border}-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300`}
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        <div className="-mt-px flex-1 flex">
          <span className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500">
            Showing {(page - 1) * step + 1} to {(page - 1) * step + count} of{" "}
            {total} results.
          </span>
        </div>
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        {showNext && (
          <a
            href={`/${slug}/${page + 1}`}
            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Next
            <svg
              className="ml-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
      </div>
    </nav>
  );
};
