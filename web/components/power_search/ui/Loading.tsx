import cx from 'classnames';
import { getColor } from './utils';

const DEFAULT_SIZE_NAME = 'medium';

export default function Loading({
  size = DEFAULT_SIZE_NAME,
  className = null
}) {
  const getSize = (name: string) => {
    const map = {
      small: ['w-6', 'h-6', 'border-4'],
      medium: ['w-12', 'h-12', 'border-8'],
      large: ['w-24', 'h-24', 'border-8']
    };

    return map[size] || map[DEFAULT_SIZE_NAME];
  };

  return (
    <div
      className={cx(
        [
          ...getSize(size),
          'animate-spin',
          'ease-linear',
          'rounded-full',
          'border-gray-200'
        ],
        className
      )}
      style={{ borderTopColor: getColor('indigo') }}
    />
  );
}
