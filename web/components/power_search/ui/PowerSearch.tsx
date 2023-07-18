import { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';

import { PowerSearch as Search } from '../model/PowerSearch';
import Tabs from './Tabs';
import Filters from './Filters';
import Results from './Results';
import Loading from './Loading';
import FilterIcon from './FilterIcon';
import SaveSearch from './SaveSearch';
import { TABS, INPUT_CLASSNAMES } from './const';

/*
 * Writing atlas power search!
 *
 * Modeled after: CrunchBase
 * Resources: TailwindUI (ask Ted for login)
 */

export function PowerSearch({
  id, // The ID of the saved search
  user, // The user object
  userIsLoading // Is the browser trying to load user state
}) {
  const [results, setResults] = useState(null);
  const [search, setSearch] = useState(null);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [currentTab, setCurrentTab] = useState(TABS[0].name);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const runAndUpdate = async (thisSearch) => {
    console.log('*** runAndUpdate()', { thisSearch });

    const results = await thisSearch.run();
    console.log({ results });

    setSearch(thisSearch);
    setResults(results);
  };

  const onDirtyBitUpdated = useCallback(
    (dirtySearch) => {
      console.log(
        '*** onDirtyBitUpdated()',
        { dirtySearch },
        dirtySearch.isDirty()
      );

      runAndUpdate(dirtySearch);
      setEnableSaveButton(dirtySearch.isDirty());
    },
    [search]
  );

  useEffect(() => {
    if (id) {
      console.log('*** Search.load()', { id });
      Search.load(id, onDirtyBitUpdated).then(
        (loadedSearch) => {
          setSearch(loadedSearch);
          setSearchName(loadedSearch.getName());
          setCurrentTab(loadedSearch.getResultType());
          runAndUpdate(loadedSearch);
        },
        (error) => {
          // Handle
          // TODO: what do we want to do here?
          // - redirect to `/search` and show a toast?
          // - show a modal with an error message & a "retry" button?
          // need to communicate the failure & provide next steps
          // (either an option for the user or just something sensible)
          console.log({ error });
        }
      );
    } else {
      console.log('*** new Search()');
      const newSearch = new Search(onDirtyBitUpdated);

      setSearch(newSearch);
      setSearchName(newSearch.getName());
      runAndUpdate(newSearch);
    }
  }, [id]);

  const filtersChanged = (
    group: string,
    paramName: string,
    newValue: Array<Object>
  ) => {
    console.log('*** filtersChanged()', { group, paramName, newValue, search });

    if (!search) {
      // TODO: handle error
      return;
    }

    const filteredSearch = search.setParams({
      ...search.params,
      [group]: {
        ...search.params?.[group],
        [paramName]: newValue
      }
    });

    setSearch(filteredSearch);
    runAndUpdate(filteredSearch);
    console.log({ filteredSearch });
  };

  return (
    <main className="pt-10 sm:pt-2">
      <header className="flex flex-wrap justify-between items-center px-8 sm:px-4 sm:py-2">
        <h2 className="text-2xl py-2 font-bold leading-7 text-gray-900 sm:text-3xl">
          Search {currentTab}
        </h2>

        <button
          type="submit"
          className={cx(
            'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            {
              'opacity-50': !enableSaveButton
            }
          )}
          disabled={!enableSaveButton}
          onClick={() => setIsSaveModalOpen(true)}
        >
          Save <span className="hidden sm:inline sm:ml-1">Search</span>
        </button>
      </header>

      <div className="flex gap-2 w-full py-4 px-8 sm:px-4 sm:pb-0">
        <div className="flex-grow">
          <Tabs
            tabs={TABS}
            current={currentTab}
            onChange={(name) => {
              console.log('changed tabs', { name });
              setCurrentTab(name);
              search.setResultType(name);
              runAndUpdate(search);
            }}
          />
        </div>

        <button
          className={cx(INPUT_CLASSNAMES, 'px-3 sm:my-1 bg-white')}
          onClick={(evt) => {
            evt.preventDefault();
            setIsFiltersOpen(!isFiltersOpen);
            // TODO: manage focus
          }}
          aria-label="Search Filters"
        >
          <FilterIcon />
        </button>
      </div>

      <div
        className={cx(
          'sm:flex sm:py-4 relative z-0',
          'bg-white shadow-sm border-t sm:border-t-0'
        )}
      >
        {/* TODO: smooth the transition */}
        <div
          className={cx(
            'transition-height',
            'sm:h-auto',
            'overflow-hidden',
            'flex-shrink-0',
            {
              'h-0': !isFiltersOpen,
              'sm:w-0': !isFiltersOpen
            }
          )}
        >
          <Filters params={search?.params || {}} onChange={filtersChanged} />
        </div>

        <div className="w-full overflow-x-hidden">
          {results ? (
            <Results
              results={results}
              onPageWidthChange={(value) => {
                search.setPageWidth(parseInt(value, 10));
                runAndUpdate(search);
              }}
              onPageChange={(value) => {
                search.setPage(value);
                runAndUpdate(search);
              }}
            />
          ) : (
            <Loading size="large" className="mx-auto mt-8 mb-12" />
          )}
        </div>
      </div>

      <SaveSearch
        onNameChange={setSearchName}
        isOpen={isSaveModalOpen}
        close={() => setIsSaveModalOpen(false)}
        save={() =>
          search
            .setName(searchName)
            .save()
            .then(
              (res) => console.log('*** saved search', { res }),
              (err) => console.log('*** save error', { err })
            )
        }
      />
    </main>
  );
}
