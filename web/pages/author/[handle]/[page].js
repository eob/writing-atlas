import BookRow from '../../../components/book/BookRow'
import PrismaClient from '../../../lib/PrismaClient'
import {entityFilesStaticProps, emptyStaticPaths} from '../../../components/entity/Props'
import { useUser } from '@auth0/nextjs-auth0';
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'
import useApi from '../../../lib/use-api';
import {RequireData, UpgradeToSee} from '../../../components/account/Paywall';
import {Block, KV} from '../../story/[handle]'
const PAGE_WIDTH = 10;
import { BookmarkIcon } from '@heroicons/react/solid'

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return entityFilesStaticProps({
    prisma,
    handle: String(params.handle),
    entityType: 'PERSON',
    entitySubType: 'AUTHOR',
    pageWidth: PAGE_WIDTH,
    // page: params ? params.page : 1
  })
}

function RepresentationInformation({data}) {
  if (!data) {
    return null
  }
  const {associates} = data;
  if (!associates) {
    return null;
  }
  if (associates.length == 0) {
    return null;
  }

  return(
    <Block title={<span className="flex items-center">Representation <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">PRO</span></span>}>
      <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
        {associates.map((a) => {
          if (!a.name) { return null }
          let slug = 'entity';
          let rel = 'Unknown';
          if (a.entitySubType == 'AGENCY') {
            slug = 'agency'
            rel = 'Agency';
          } else if (a.entitySubType == 'AGENT') {
            slug = 'agent'
            rel = 'Agent'
          }

          return (
            <a href={`/${slug}/${a.handle}`} className="pl-3 pr-4 py-3 hover:bg-blue-100 flex items-center place-content-start text-sm">
              <div className="w-0 flex-1 flex items-center">
                <BookmarkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-2">{a.name}</span>
              </div>
              <div className="ml-4 flex-shrink-0">
                {rel}
              </div>
            </a>
          )
        })}
      </div>
    </Block>
  )
  return <div>{JSON.stringify(data)}</div>
}

export async function getStaticPaths() {
  return emptyStaticPaths()
}

function Page({
  tag,
  entity,
  files,
  handle,
  notFound, 
  noItemsFound,
  fileCount = 0,
  page
}) {
  const { user, isLoading } = useUser();

  const extraDataResp = useApi(`/api/v1/author/extra/${handle}`);

  let description = entity ? entity.bio : null
  let beforeList = <RequireData 
    user={user} 
    dataLoading={extraDataResp.isLoading}
    dataError={extraDataResp.error}
    data={extraDataResp.response}
    requireUser={false}
    loginMsg={
      <UpgradeToSee 
        title="Agent information available."
        subtitle="Sign up to join our industry beta program."
        button="Sign Up"
        user={user}
      />
    }
    upgradeMsg={
      <UpgradeToSee 
        title="Agent information available."
        subtitle="Email us to join our industry beta program."
        button="Email to Request Access"
        user={user}
      />
    }
    childElementFn={RepresentationInformation} />

  return (
    <ListPageWrapper
      tag={null}
      items={files}
      notFound={notFound}
      noItemsFound={noItemsFound}
      headerProps={{showBooks: true}} 
      notFoundNounPl = 'stories'
      beforeList={beforeList}
      searchNotFoundPrefix = 'No stories yet from this author'
      supertitle = {`Author`}
      supertitleLink = '/authors'
      description = {description}
      facetCategory = {null}
      titlePrefix = {entity ? entity.name : null}
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`author/${entity ? entity.handle : ''}`}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={BookRow}
      loading={isLoading}
    >
    </ListPageWrapper>
  );
}

export default Page;