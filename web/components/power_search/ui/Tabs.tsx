import cx from 'classnames';

import { INPUT_CLASSNAMES } from './const';

export default function Tabs({ tabs, current, onChange }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a search type {/* TODO: update label */}
        </label>
        <select
          id="tabs"
          name="tabs"
          className={cx(INPUT_CLASSNAMES, 'block w-full')}
          defaultValue={current}
          onChange={({ target }) => onChange(target.value)}
        >
          {tabs.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="relative z-0 rounded-lg flex" aria-label="Tabs">
          {tabs.map(({ name }) => (
            <button
              key={name}
              onClick={(evt) => {
                evt.preventDefault();

                if (name !== current) {
                  onChange(name);
                }
              }}
              className={cx(
                name === current
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-700',
                'w-1/4 py-4 px-1 text-center font-medium text-sm rounded-t-lg border-t border-l border-r'
              )}
              aria-current={current}
            >
              {name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
