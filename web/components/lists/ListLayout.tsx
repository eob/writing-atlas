import Head from '../utility/site/Head'
import Header from '../utility/site/Header'
import Layout from '../layout'
import { useUser } from '@auth0/nextjs-auth0';
import { ListPager } from './ListPager'
import { ListHeader} from './ListHeader'
import { InstantSearch, connectStateResults, Configure } from 'react-instantsearch-dom';
import {useState, FC, useEffect} from 'react';

type ListLayoutType = {
  title: string;
  supertitle?: string;
  supertitlelink?: string;
  subtitle?: string;
  description?: string;
  children?: any;
  headerProps?: any;
  total?: number;
  page?: number;
  orderBy?: string;
  step?: number;
  count?: number;
  slug?: string;
  searchIndex?: string;
  searchClient?: any;
  showSearchDetails?: boolean;
  facetCategory?: string;
  facetValue?: string;
  // eslint-disable-next-line react/prop-types
  tagsetKeys?: string[];
  // eslint-disable-next-line react/prop-types
  tagsetValues?: string[];
  // eslint-disable-next-line react/prop-types
  tagsetInitial?: string;
  addAvailable?: boolean;
};

export const ListLayout: FC<ListLayoutType> = ({
  title=null, 
  supertitle=null, 
  supertitlelink=null, 
  subtitle=null, 
  description=null, 
  children=null, 
  headerProps=null, 
  total=null, 
  page=null,
  orderBy="mostPopular",
  step=null, 
  count=null, 
  slug=null,
  searchIndex=null,
  searchClient=null,
  showSearchDetails=false,
  facetCategory=null,
  facetValue=null,
  // eslint-disable-next-line react/prop-types
  tagsetKeys = null,
  // eslint-disable-next-line react/prop-types
  tagsetValues = null,
  // eslint-disable-next-line react/prop-types
  tagsetInitial = 'All',
  addAvailable = false
}) => {
  const { user, isLoading } = useUser();
  const [tagsetSelected, setTagsetSelected] = useState(tagsetInitial);

  let Pager = () => (
    <div className="mt-10">
      <ListPager isTop={false} {...{total, page, step, count, slug}} />          
    </div>
  )

  if (searchClient && searchIndex) {
    Pager = connectStateResults(({ searchState }) => {
      if (searchState && searchState.query) {
        return null
      } else {
        return (
          <div className="mt-10">
            <ListPager isTop={false} {...{total, page, step, count, slug}} />          
          </div>
        ) 
      }
    })  
  }

  const body = (
    <Layout user={user} loading={isLoading}>
      <Head title={title} />
      <Header {...headerProps} />
      <ListHeader 
        title={title} 
        supertitle={supertitle} 
        supertitlelink={supertitlelink} 
        description={description} 
        subtitle={subtitle} 
        searchIndex={searchIndex} 
        searchClient={searchClient} 
        total={total} 
        showSearchDetails={showSearchDetails} 
        tagsetKeys={tagsetKeys}
        tagsetValues={tagsetValues}
        tagsetInitial={tagsetInitial}
        onTagsetChange={setTagsetSelected}
        addAvailable={addAvailable}             
      />
      <div className="relative bg-global pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          {children}
          <Pager />
        </div>
      </div>
    </Layout>
  );

  let facetFilters = [];
  if (facetCategory && facetValue) {
    facetFilters.push(`${facetCategory}:${facetValue}`)
  }
  if (tagsetKeys && tagsetValues) {
    if (tagsetSelected != 'All') {
      facetFilters.push(`subKind:${tagsetSelected}`)
    }
  }

  if (searchClient && searchIndex) {
    return (
      <InstantSearch
          indexName={searchIndex}
          searchClient={searchClient}
          initialUiState={{indexName:
                {query: "joyce"}
          }}
      >
        {(facetFilters.length > 0) && (
          <Configure
	          facetFilters={facetFilters}
          />
        )}
        {body}
      </InstantSearch>
    )
  } else {
    return body;
  }
}

export default ListLayout;