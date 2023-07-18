import { useState } from 'react';
import Select from 'react-select/async';
import classNames from 'classnames';

// importing styles from CSS, for react-select elements
import styles from './AsyncSelect.module.css';

const cx = classNames.bind(styles);

const MIN_TRIGGER_LENGTH = 3;

function AsyncSelect({
  isMulti = true,
  id = null,
  defaultValue = [],
  loadOptions,
  onChange
}) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Select
      isMulti
      instanceId={id}
      className={styles['async-select']}
      classNamePrefix="async-select"
      cacheOptions // cache responses locally
      // defaultOptions // load results immediately (maybe load past searches?)
      defaultValue={defaultValue} // show values for saved searches
      loadOptions={loadOptions} // fn to loads options async
      onChange={(val) => {
        // when value changes
        onChange(val);
      }}
      handleInputChange={(newValue: string) => {
        // when a user types
        const val = newValue.replace(/\W/g, '');
        setInputValue(val);
        return val;
      }}
      openMenuOnClick={false} // don't show because its empty
      // hide dropdown arrow, because dropdown is empty until the user starts typing
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      // menuIsOpen: true, // for styling
    />
  );
}

export default AsyncSelect;
