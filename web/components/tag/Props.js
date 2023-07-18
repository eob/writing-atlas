import GetTag from '../../common/db/GetTag'
import {GetFilesCount} from '../../common/db/GetFilesCount'
import {GetFiles} from '../../common/db/GetFiles'
import {GetTagsCount} from '../../common/db/GetTagsCount'
import {GetTags} from '../../common/db/GetTags'

export async function emptyStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function tagsStaticProps({prisma, kind, filterFileCount = true,
                                        fileTagPrivateTo = undefined, pageWidth = 20,
                                        page = 1, orderBy = "mostPopular"}) {
  const tagsCount = await GetTagsCount(prisma, { 
    kind,
    filterFileCount,
    fileTagPrivateTo
  });
  if ((page-1)*pageWidth > tagsCount) {
    return {
      props: {
        tags: null,
        tagsCount: 0,
        page: 0,
        noItemsFound: true,
      }
    };
  }
  const tags = await GetTags(prisma, {
    kind,
    filterFileCount,
    fileTagPrivateTo,
    page,
    mostPopular: orderBy === "mostPopular"
  });
  return {
    props: {
      tags,
      noItemsFound: ((!tags) || (tags.length == 0)),
      tagsCount,
      page: page,
      orderBy: orderBy
    }
  };
}

export async function tagStaticProps({prisma, tagType, fileTagPrivateTo = undefined, tagHandle, pageWidth, page = 1, allowEmpty = false}) {
  const tag = await GetTag(prisma, { handle: tagHandle, kind: tagType, alsoSimilar: true});
  const fileCount = await GetFilesCount(prisma, { tagKind: tagType, tagPrivateTo: fileTagPrivateTo, tagHandle: tagHandle});
  if ((fileCount == 0) || ((page-1)*pageWidth > fileCount)) {
    return {
      props: {
        files: [],
        tag: tag,
        fileCount: 0,
        page: 0,
        notFound: (!allowEmpty),
        noItemsFound: true,
        handle: tagHandle
      }
    };
  }

  const files = await GetFiles(prisma, {tagKind: tagType, tagHandle: tagHandle, tagPrivateTo: fileTagPrivateTo, page: page, take: pageWidth});
  
  if (tag && files && files.length > 0) {
    return {
      props: {
        files,
        tag,
        fileCount,
        page,
        noItemsFound: ((!files) || (files.length == 0)),
        handle: tagHandle
      }
    }
  } else {
    if (allowEmpty) { 
      return {
        props: {
          files,
          noItemsFound: ((!files) || (files.length == 0)),
          tag,
          fileCount,
          page,
          handle: tagHandle
        }
      }        
    } else {
      return {
        props: {
          notFound: true,
          noItemsFound: ((!files) || (files.length == 0)),
          handle: tagHandle
        }
      }      
    }
  }
}

