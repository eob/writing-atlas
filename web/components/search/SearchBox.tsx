import { connectSearchBox } from 'react-instantsearch-dom';
import { Dropdown } from './Dropdown'
import { useEffect } from "react";

const UnconnectedSearchBox = ({ 
  currentRefinement, 
  refine,
  defaultRefinement,
  isSearchStalled, 
  tagsetKeys = null,
  tagsetValues = null,
  tagsetInitial = 'All',
  onTagsetChange = null,
}) => {
  // Perform the initial search query using the defaultRefinement
  useEffect(() => {
    refine(defaultRefinement)
  }, [defaultRefinement])

  return (
    <div className="relative max-w-xl mx-auto  px-3 sm:px-6 lg:px-8">
      <form noValidate action="" role="search" className="mx-auto">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex">
            {(tagsetKeys && tagsetValues && tagsetInitial && onTagsetChange) && (                
                <Dropdown 
                onChange={onTagsetChange}
                initial={tagsetInitial}
                keys={tagsetKeys} 
                values={tagsetValues}
              ></Dropdown>
            )}
            <input 
              name="search" 
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              placeholder="Search" 
              type="search" 
              value={currentRefinement}
              onChange={event => refine(event.currentTarget.value)}
              onLoad={event => refine(defaultRefinement)}
            />
          </div>

          {/* {isSearchStalled ? 'Search Stalled!' : ''} */}
        </div>
      </form>
    </div>
  );
}

export const SearchBox = connectSearchBox(UnconnectedSearchBox);


