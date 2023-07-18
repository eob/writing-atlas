import cx from 'classnames';

// Tabs is an array of objects,
// in case we want to add more metadata to each tab later.
export const TABS = [
  { name: 'Stories' },
  { name: 'Authors' },
  { name: 'Honors' }
];

export const INPUT_CLASSNAMES = cx([
  'focus:ring-indigo-500 focus:border-indigo-500',
  'border border-gray-300 rounded-md'
]);

export const FILTER_TYPE = {
  AUTHOR: 'authorFilters',
  STORY: 'storyFilters'
};
