import useApi from '../../lib/use-api';
import {titleCase} from "title-case";

export function loadItems({fromUrl, setFn}) {
  const { response, error, isLoading } = useApi(fromUrl);
  if (isLoading) {
    // Do nothing
  } else if (error) {
    // Do nothing
    // body = (<UnknownError message={`[${error.code}] ${error.error}`} />)
  } else if ((typeof response == 'undefined') || (typeof response.data == 'undefined')) {
    // Do nothing
    // body = (<UnknownError message="Missing collection result from server." />)
  } else {
    let newItems = response.data;
    setFn(newItems)
  }
}

export function loadDetails({aboutItems, fromUrl, setFn}) {
  const { response, error, isLoading } = useApi(fromUrl);
  if (isLoading) {
    // Do nothing
  } else if (error) {
    // Do nothing
    // body = (<UnknownError message={`[${error.code}] ${error.error}`} />)
  } else if ((typeof response == 'undefined') || (typeof response.data == 'undefined')) {
    // Do nothing
    // body = (<UnknownError message="Missing collection result from server." />)
  } else {
    let newItems = response.data;
    // setFn(newItems)
  }
}

/**
 * Return the name of the item in title case
 *
 * @param item
 * @returns {string}
 */
export function getItemName(item) {
  if (!item.name) {
    if (!item.handle) {
      return "No Name"
    } else {
      return titleCase(item.handle.replace(/--/g, '; ').replace(/-/g, ' '))
    }
  }
  return titleCase(item.name)
}
