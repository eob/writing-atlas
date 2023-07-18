import cx from 'classnames';

import Tag from '../../tag/Tag';
import Pagination from './Pagination';
import { INPUT_CLASSNAMES } from './const';

const PAGE_WIDTHS = [10, 25, 50, 100];

function Results({ results, onPageChange, onPageWidthChange }) {
  const {
    total,
    count,
    index,
    window,
    schema,
    rows,
    page: currentPage
  } = results;
  const firstItem = index + 1;
  const lastItem = index + count;
  const pages = Math.ceil(total / window);

  // TODO: remove this line, it's for testing
  // const { link, cells } = rows[3];

  const CELL_CLASS = 'py-2 px-8';
  const Cell = ({ data, type, cellKey }) => {
    const getContents = () => {
      switch (type) {
        case 'String':
          return data.value;
        case 'Link':
          return <a href={data.link}>{data.value}</a>;
        case 'Tag':
          return data.tags.map((tag) => (
            <Tag
              key={Object.entries(tag).map(([a, b]) => a + b + cellKey)}
              {...tag}
            />
          ));
        default:
          return data.value;
      }
    };

    return (
      <td className={CELL_CLASS}>
        <div
          className={cx(
            // truncate lines with ellipsis
            'line-clamp-2 lg:line-clamp-3',
            // increasing column max-width for larger screens
            'max-w-sm lg:max-w-lg xl:max-w-2xl 2xl:max-w-4xl'
          )}
          // non-tailwind styles to help keep the table columns in check
          style={{
            minWidth: '10rem',
            overflowWrap: 'break-word'
          }}
        >
          {getContents()}
        </div>
      </td>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <div
        className={cx(
          'flex flex-wrap justify-between items-center',
          'py-4 px-8 sm:py-0 sm:pr-4 sm:p-12'
        )}
      >
        <p id="results-caption">
          Showing {firstItem} &ndash; {lastItem} of {total}
        </p>

        <select
          aria-label="results per page"
          className={cx(INPUT_CLASSNAMES, 'float-right')}
          defaultValue={window}
          onChange={({ target }) => onPageWidthChange(target.value)}
        >
          {PAGE_WIDTHS.map((option) => (
            <option key={`page-width-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-x-auto sm:p-4">
        <table
          style={{ captionSide: 'top' }}
          className="min-w-full divide-y divide-gray-200 border"
          aria-describedby="results-caption"
        >
          <thead className="bg-gray-50 border-b">
            <tr key="thead">
              {schema.map(({ type, name }) => {
                return (
                  <th
                    key={name}
                    scope="col"
                    className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {name}
                  </th>
                );
              })}
              {/* empty header for "View" button column */}
              <th />
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map(({ link, cells }) => {
              return (
                <tr key={link}>
                  {cells.map((cell, i) => {
                    const { type } = schema[i];
                    const key = `${link}-${type}-${i}`;

                    return (
                      <Cell data={cell} type={type} key={key} cellKey={key} />
                    );
                  })}
                  <td className={CELL_CLASS}>
                    <a
                      href={link}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className={cx(
          'flex justify-center sm:justify-between items-center flex-wrap',
          'p-4 sm:pl-12 sm:pr-2'
        )}
      >
        <p className={cx('whitespace-nowrap py-1')}>
          Showing {firstItem} &ndash; {lastItem} of {total}
        </p>
        <Pagination
          pages={pages}
          current={currentPage}
          onChange={onPageChange}
        />
      </div>
      {console.log({ results })}
    </div>
  );
}

export default Results;
