import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

export function getColor(name, value = 500) {
  return fullConfig.theme.colors[name][value];
}
