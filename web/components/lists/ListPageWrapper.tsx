import ListLayout from './ListLayout'
import Error404 from '../utility/indicators/404'
import LoadingIndicator from '../utility/indicators/Loading'
import SettingDropdown from '../utility/dropdowns/SettingDropdown'
import { Related } from '../related/related-box'
import { searchClient } from '../search/SearchClient';
import { Hits, connectStateResults } from 'react-instantsearch-dom';
import NoData from '../utility/indicators/NoData'
import { useState, useCallback, useEffect, FC } from 'react';
import {loadItems, loadDetails} from './Util'
import useApi from '../../lib/use-api';
import { titleCase } from "title-case";
import { getItemName } from './Util'

type ListPageWrapperType = {
  tag?: any;
  items?: any[];
  notFound?: boolean;
  notFoundNounPl?: string;
  noItemsFound?: boolean;
  searchNotFoundPrefix?: string;
  supertitle?: string;
  supertitleLink?: string;
  facetCategory?: string;
  titlePrefix?: string;
  description?: string;
  headerProps?: any;
  beforeList?: any;
  tagSuggestions?: any;
  allFilesCount?: number;
  slug?: string;
  page?: number;
  orderBy?: string;
  step?: number;
  searchIndex?: string;
  ItemRow?: any;
  user?: any;
  loading?: boolean;
  dynamicItemLoadUrl?: string;
  favoritesLoadUrl?: string;
  addAvailable?: boolean;
}

export const ListPageWrapper: FC<ListPageWrapperType> = ({
  tag,
  items,
  notFound = undefined,
  noItemsFound = undefined,
  notFoundNounPl = 'stories',
  searchNotFoundPrefix = 'No stories tagged',
  supertitle = 'Tag',
  beforeList = null,
  supertitleLink = '/tags',
  facetCategory = 'tagHandles',
  titlePrefix = 'Short Stories tagged ',
  description = null,
  headerProps = null,
  tagSuggestions = true,
  allFilesCount = 0,
  slug = "tags",
  page = 0,
  orderBy = null,
  step = 0,
  searchIndex = null,
  ItemRow = null,
  user = null,
  loading = null,
  dynamicItemLoadUrl = null,
  favoritesLoadUrl = "/api/v1/tag/LIST/all/FILE",
  addAvailable = false
}) => {

  const [staticItems, setStaticItems] = useState(items ? items : []);
  const [dynamicItems, setDynamicItems] = useState([]);
  const [favoriteTags, setFavoriteTags] = useState({});
  const [allItems, setAllItems] = useState(staticItems.concat(dynamicItems));

  const favoritesResponse = useApi(favoritesLoadUrl);
  const dynamicItemsResponse = useApi(dynamicItemLoadUrl);

  useEffect(() => { 
    if ((typeof items == 'undefined') || (items == null)) {
      setStaticItems([]); 
    } else {
      setStaticItems(items); 
    }
  }, [items])

  useEffect(() => { 
    let all = [];
    if (staticItems) {
      all = all.concat(staticItems)
    }
    if (dynamicItems) {
      all = all.concat(dynamicItems);
    }
    if (favoriteTags) {
      for (let item of all) {
        if (! item.file_tags) {
          item.file_tags = []
        }
        if (favoriteTags[item.handle]) {
          // Concatenate favorite file tags with item's file tags and eliminate duplicates
          // The big ugly filter is filtering out all favorite file tags that match item's file tags
          item.file_tags = item.file_tags.concat(favoriteTags[item.handle].file_tags.filter(
              ft => item.file_tags.map(itemFt => itemFt.tag.handle).indexOf(ft.tag.handle) < 0))
        }
      }
    }
    setAllItems(all);
  }, [staticItems, dynamicItems, favoriteTags])

  useEffect(() => {
    if (dynamicItemsResponse && dynamicItemsResponse.response && dynamicItemsResponse.response.data) {
      setDynamicItems(dynamicItemsResponse.response.data);
    } else {
      setDynamicItems([]);
    }
  }, [dynamicItemsResponse])

  useEffect(() => {
    if (favoritesResponse && favoritesResponse.response && favoritesResponse.response.data) {
      setFavoriteTags(favoritesResponse.response.data);
    } else {
      setFavoriteTags({});
    }
  }, [favoritesResponse])
  
  if (notFound) {
    return (<Error404 message="Page not found." />)
  } else if (typeof tag == 'undefined') {
    return <LoadingIndicator message="Loading." />
  }

  const Hit = (props) => ( <ItemRow item={props.hit} hideTagHandle={tag ? tag.handle : null} user={user} loading={loading} /> );
  let body = null;
  let noItems = ((allItems ? allItems.length : 0) == 0)
  if (noItems) {
    if (noItemsFound === true) {
      body = <NoData
        title={`No ${notFoundNounPl} found`}
      />
    } else {
      return <LoadingIndicator message="Loading." />
    }
    // if (loading) {
    //   body = <LoadingIndicator message="Loading." />
    // } else {
    //   body = <NoData
    //     title={`No ${notFoundNounPl} found`}
    //   />
    // }
  } else {
    body = allItems.map((item) => {
      return <ItemRow item={item} hideTagHandle={tag ? tag.handle : null} user={user} loading={loading} />
    })
  }

  const Results = searchIndex ? (
    connectStateResults(({ searchState, searchResults }) => {
      if (searchState && searchState.query) {
        if (searchResults && searchResults.nbHits && searchResults.nbHits > 0) {
          return (
            <Hits hitComponent={Hit} />
          )  
        } else {
          let pfix = tag ? ` ${tag.name}` : '';
          return <NoData 
            title={`${searchNotFoundPrefix}${pfix} match "${searchState.query}".`} 
            body={<span className="centered">Try a different query or <a className="link underline" href="/contact">let us know what you'd like to see added</a>.</span>}
          />
        }
      } else {
        return body
      }
    })
  ) : (
    () => { return body }
  )

  let title = tag ? (
    titlePrefix ? (
      `${titlePrefix} "${getItemName(tag)}"`
    ) : getItemName(tag)
  ) : titlePrefix;

  return (
    <ListLayout
      key={tag}
      title={title} 
      supertitle={supertitle} 
      supertitlelink={supertitleLink} 
      searchIndex={searchIndex} 
      searchClient={searchClient} 
      facetCategory={facetCategory} 
      headerProps={headerProps}
      description={description}
      facetValue={tag ? tag.handle : null} 
      showSearchDetails={true} 
      total={allFilesCount} 
      count={allItems ? allItems.length : 0} 
      slug={slug} 
      page={page}
      orderBy={orderBy}
      step={step}
      addAvailable={addAvailable}
      >
      <div className="list-container">
        <div className="mb-8 flex flex-row justify-end">
          {orderBy ?
              <SettingDropdown
                displayName="Sort By"
                settingOptions={[
                  { displayName: "Most Popular", href: `/${slug}/${page}/mostPopular` },
                  { displayName: "Alphabetical", href: `/${slug}/${page}/alphabetical` }
                ]}
              /> : null
          }
        </div>
        {(tag && tagSuggestions) && (
          <Related caption="Our story engine thinks you might also like.." items={tag.tagRelationsAsSubject} handle={tag.handle} />
        )}
        {beforeList}
        <Results key={tag} />
      </div>
    </ListLayout>
  );
}

export default ListPageWrapper;
