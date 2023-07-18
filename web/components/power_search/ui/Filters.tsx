import { useState } from 'react';
import cx from 'classnames';
import { capitalize } from 'lodash';

import Field from './Field';
import AsyncSelect from './AsyncSelect';
import { INPUT_CLASSNAMES, FILTER_TYPE } from './const';
import { ListTagsForAsyncSelect } from '../../api/Tag';

const MOCK_DATA = [
  { label: 'Red', value: 'red' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'White', value: 'white' },
  { label: 'Pink', value: 'pink' },
  { label: 'Black', value: 'black' },
  { label: 'Silver', value: 'silver' },
  { label: 'Gold', value: 'gold' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' }
];
const loadMockData = (inputValue) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_DATA.filter(({ label }) =>
          label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 1000);
  });
};

const loadTags = (kind, targetKind, subKind = null) => async (inputValue) =>
  ListTagsForAsyncSelect(inputValue, kind, targetKind, subKind);

const FIELD_CLASSNAME = 'mb-4 mt-3 mx-8 sm:mx-4';
const { AUTHOR, STORY } = FILTER_TYPE;
const thisYear = new Date().getFullYear();
const PUB_MIN_YEAR = 0;

function Filters({ params, onChange }) {
  console.log('Filters', { params });

  const [yearMin, setYearMin] = useState(
    params?.STORY?.publicationYearMin || PUB_MIN_YEAR
  );
  const [yearMax, setYearMax] = useState(
    params?.STORY?.publicationYearMax || thisYear
  );

  // DRY wrapper for consistent Field components across Select, Input, etc
  const Filter = ({ type, param, children }) => (
    <Field
      id={`${type.toLowerCase()}-${param.toLowerCase()}`}
      label={capitalize(param)}
      className={FIELD_CLASSNAME}
    >
      {children}
    </Field>
  );

  const Select = ({ type, param, completeFn = null }) => {
    const selected = params?.[type]?.[param] || [];

    return (
      <Filter type={type} param={param}>
        <AsyncSelect
          onChange={(val) => {
            const newVal = val.map(({ label, value }) => ({
              name: label,
              handle: value
            }));
            onChange(type, param, newVal);
          }}
          defaultValue={selected.map(({ name, handle }) => ({
            label: name,
            value: handle
          }))}
          loadOptions={completeFn || loadMockData}
        />
      </Filter>
    );
  };

  const Input = ({ type, param, value, onInputChange }) => (
    <input
      className={cx(INPUT_CLASSNAMES, 'space-x-1')}
      type="number"
      style={{ maxWidth: '40%' }}
      onChange={({ target: { value } }) => {
        onInputChange(value);
        onChange(type, param, { name: value, handle: value });
      }}
      defaultValue={value}
      aria-label={`${type} ${param}`}
    />
  );

  const Group = ({ name, children, last = false }) => (
    <>
      <h3 className="text-xl font-semibold leading-8 py-3 mx-8 sm:mx-4">
        {capitalize(name)} Filters
      </h3>
      <div
        className={cx(
          'flex-grow-0 flex-shrink-0',
          'sm:w-64 xl:w-80',
          'border-t border-b sm:border-r bg-gray-50',
          {
            'mb-4': !last
          }
        )}
      >
        {children}
      </div>
    </>
  );

  return (
    <>
      <Group name={STORY}>
        <Select type={STORY} param="name" />
        <Select type={STORY} param="keywords" />
        <Select
          type={STORY}
          param="tags"
          completeFn={loadTags('TAG', 'FILE')}
        />
        <Field
          id="story-publication"
          label="Story Publication"
          className={FIELD_CLASSNAME}
        >
          <div className="flex w-full items-center justify-between">
            <Input
              type={STORY}
              param="publicationYearMin"
              value={yearMin}
              onInputChange={setYearMin}
            />
            <span>to</span>
            <Input
              type={STORY}
              param="publicationYearMax"
              value={yearMax}
              onInputChange={setYearMax}
            />
          </div>
        </Field>
      </Group>
      <Group name={AUTHOR} last>
        <Select type={AUTHOR} param="name" />
        <Select type={AUTHOR} param="keywords" />
        <Select
          type={AUTHOR}
          param="tags"
          completeFn={loadTags('TAG', 'ENTITY')}
        />
        <Select
          type={AUTHOR}
          param="gender"
          completeFn={loadTags('TAG', 'ENTITY', 'Gender')}
        />
        <Select
          type={AUTHOR}
          param="nationality"
          completeFn={loadTags('TAG', 'ENTITY', 'Nationality')}
        />
        <Select
          type={AUTHOR}
          param="ethnicity"
          completeFn={loadTags('TAG', 'ENTITY', 'Ethnicity')}
        />
      </Group>
    </>
  );
}

export default Filters;
