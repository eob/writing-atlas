import { Fragment } from 'react';
import cx from 'classnames';
import { uniq } from 'lodash';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function Pagination({ pages, current, onChange }) {
  console.log({ pages, current });

  const pageNumbersToShow = uniq(
    [
      1,
      current === 1 ? current + 1 : 1, // if currently on page 1, show 2
      current,
      current === pages ? current - 1 : pages, // if currently on last page, show previous number
      pages
    ].sort((a, b) => a - b)
  );
  // console.log({ pageNumbersToShow });

  const COMMON_STYLES = cx(
    'relative inline-flex items-center py-2 border text-sm font-medium'
  );
  const LINK_STYLES = cx(
    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
  );
  const ACTIVE_STYLES = cx(
    'bg-indigo-50 border-indigo-500 text-indigo-600 z-10'
  );

  const Spacer = () => (
    <span className={cx(COMMON_STYLES, 'px-3 border-gray-300')}>...</span>
  );

  const PageNumLink = ({ num }) => {
    const isCurrentPage = num === current;
    // console.log({ num, isCurrentPage });

    return (
      <button
        aria-current={isCurrentPage}
        className={cx(COMMON_STYLES, 'px-4', {
          [LINK_STYLES]: !isCurrentPage,
          [ACTIVE_STYLES]: isCurrentPage
        })}
        onClick={() => onChange(num)}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="pagination bg-white px-4 py-3 flex items-center justify-between">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Results Table Pagination"
      >
        <button
          className={cx(COMMON_STYLES, LINK_STYLES, 'px-3 rounded-l-md', {
            'opacity-40': current === 1
          })}
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-label="Previous" />
        </button>

        {pageNumbersToShow.map((num, i, numbers) => {
          const gap = numbers[i + 1] - num - 1;
          // console.log({ gap });

          return (
            <Fragment key={`page-${num}-wrap`}>
              <PageNumLink num={num} key={`page-${num}`} />
              {/* show a single number instead of spacer */}
              {gap === 1 ? (
                <PageNumLink num={num + 1} key={`page-${num + 1}`} />
              ) : null}
              {/* show a spacer */}
              {gap > 1 ? <Spacer key={`page-${num}-spacer`} /> : null}
            </Fragment>
          );
        })}

        <button
          className={cx(COMMON_STYLES, LINK_STYLES, 'px-3 rounded-r-md', {
            'opacity-40': current === pages
          })}
          onClick={() => onChange(current + 1)}
          disabled={current === pages}
        >
          <ChevronRightIcon className="h-5 w-5" aria-label="Next" />
        </button>
      </nav>
    </div>
  );
}
