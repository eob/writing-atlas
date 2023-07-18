import config from '../../lib/config'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export const searchClient = instantMeiliSearch(
  config.SEARCH_URL,
  null  // @eric-zhizu: If no API key, this should be set to null, else to config.SEARCH_KEY
);
