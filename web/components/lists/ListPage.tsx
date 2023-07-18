import React, {FC} from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { ItemRow } from '../../components/lists/ItemRow'
import LoadingIndicator from '../utility/indicators/Loading'
import ListLayout from './ListLayout'
import { Hits, connectStateResults } from 'react-instantsearch-dom';
import { searchClient } from '../../components/search/SearchClient';
import NoData from '../../components/utility/indicators/NoData'

function ListPageBody({tags, linkPrefix}) {
  const tagRows = tags ? tags.map((tag) => {return (
    <ItemRow 
      title={tag.name}
      href={`/${linkPrefix}/${tag.handle}`}
      key={tag.handle}
    />
  )}) : null;
  return tagRows;
}

type ListPageType = {
  title?: string;
  tags?: any[];
  total?: number;
  page?: number;
  step?: number;
  endpoint?: string;
  nounSg?: string;
  nounPl?: string;
  linkPrefix?: string;
  searchIndex?: string;
  tagsetKeys?: string[];
  tagsetValues?: string[];
  tagsetInitial?: string;
  Hit?: any;
}

export const ListPage: FC<ListPageType> = ({
  tags, 
  title, 
  total, 
  page, 
  step, 
  endpoint, 
  nounSg, 
  nounPl, 
  linkPrefix, 
  searchIndex,
  tagsetKeys = null,
  // eslint-disable-next-line react/prop-types
  tagsetValues = null,
  // eslint-disable-next-line react/prop-types
  tagsetInitial = 'All',
  // eslint-disable-next-line react/prop-types
  Hit = null,
}) => {
  const { user, isLoading } = useUser();

  let body = null;
  if (!tags) {
    tags = []
  }

  if (isLoading) {
    body = (<LoadingIndicator message="Loading." />)
  } else if (tags.length == 0) {
    body = <NoData 
      title={`Sorry, we couldn't find any ${nounPl}.`} 
      body={<span className="centered">This is probably an error. Please <a className="link underline" href="/contact">let us know</a>.</span>}
      />
  } else {
    body = (<ListPageBody tags={tags} linkPrefix={linkPrefix}  />)
  }

  const Results = connectStateResults(({ searchState, searchResults }) => {
    if (searchState && searchState.query) {
      if (searchResults && searchResults.nbHits && searchResults.nbHits > 0) {
        return (
          <Hits hitComponent={Hit} />
        )  
      } else {
        return <NoData 
          title={`No ${nounPl} match "${searchState.query}".`} 
          body={<span className="centered">Try a different query or <a className="link underline" href="/contact">let us know what you'd like to see added</a>.</span>}
          />
      }
    } else {
      return body
    }
  })

  return (
    <ListLayout title={title} total={total} count={tags.length} page={page} step={step} slug={nounPl.toLowerCase()} searchClient={searchClient} searchIndex={searchIndex}
                tagsetKeys={tagsetKeys}
                tagsetValues={tagsetValues}
                tagsetInitial={tagsetInitial}    
    >
      <div className="list-container">
        <Results />
      </div>
    </ListLayout>
  );
}

export default ListPage;