import {GetFiles} from '../../common/db/GetFiles'
import {GetEntities} from '../../common/db/GetEntities'
import {GetEntitiesCount} from '../../common/db/GetEntitiesCount'

export async function emptyStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function entityStaticProps({prisma, filterFileCount = true, entityType, entitySubType, pageWidth,
                                          page = 1, orderBy = "mostPopular"}) {
  const query = { entityType: entityType, entitySubType: entitySubType, filterFileCount: filterFileCount,
    mostPopular: orderBy === "mostPopular", page: page };

  const entitiesCount = await GetEntitiesCount(prisma, query);
  if ((entitiesCount == 0) || ((page-1)*(pageWidth > entitiesCount))) {
    return {
      props: {
        notFound: true
      }  
    };
  }
  const entities = await GetEntities(prisma, query);
  return {
    props: {
      entities,
      entitiesCount,
      noItemsFound: ((!entities) || (entities.length == 0)),
      page: page,
      orderBy: orderBy
    }
  };
}

export async function entityFilesStaticProps({prisma, handle, entityType, entitySubType, pageWidth, page = 1}) {
  const authors = await prisma.entity.findMany({
    where: { 
      handle: String(handle),
      entityType,
      entitySubType
    },
    take: 1
  });
  
  const entity = authors.length > 0 ? authors[0] : null

  let files = []
  if (entity) {
    files = await GetFiles(prisma, {withLoglines: false, authorHandle: String(handle), takeEverything: true})
  }

  if (entity) {
    return {
      props: {
        entity,
        files,
        handle,
        noItemsFound: ((!files) || (files.length == 0))
      }
    }
  } else {
    return {
      props: {
        notFound: true,
        noItemsFound: true,
      }
    }    
  }
}

export async function agencyStaticProps({prisma, handle, pageWidth, page = 1}) {
  const agencies = await prisma.entity.findMany({
    where: { 
      handle: String(handle),
      entityType: "ORG",
      entitySubType: "AGENCY"
    },
    include: {
      entity_entity_entityToentity_entity_objectId: {
        include: {
          entity_entityToentity_entity_subjectId: true
        }
      }
    },
    take: 1
  });
  
  const entity = agencies.length > 0 ? agencies[0] : null
  let files = []

  let entities = []

  if (entity && entity.entity_entity_entityToentity_entity_objectId) {
    for (let rel of entity.entity_entity_entityToentity_entity_objectId) {
      if (rel.entity_entityToentity_entity_subjectId) {
        let other = rel.entity_entityToentity_entity_subjectId
        if (other.entitySubType == "AGENT") {
          entities.push(other)
        } else if (other.entitySubType == "AUTHOR") {
          entities.push(other)
        }
      }
    }
  }

  if (entity) {
    return {
      props: {
        entity,
        entities,
        noItemsFound: ((!entities) || (entities.length == 0))
      }
    }
  } else {
    return {
      props: {
        notFound: true
      }
    }    
  }
}

export async function agentStaticProps({prisma, handle, pageWidth, page = 1}) {
  const agencies = await prisma.entity.findMany({
    where: { 
      handle: String(handle),
      entityType: "PERSON",
      entitySubType: "AGENT"
    },
    include: {
      entity_entity_entityToentity_entity_objectId: {
        include: {
          entity_entityToentity_entity_subjectId: true
        }
      },
      entity_entity_entityToentity_entity_subjectId: {
        include: {
          entity_entityToentity_entity_objectId: true
        }
      }

    },
    take: 1
  });
  
  const entity = agencies.length > 0 ? agencies[0] : null
  let files = []

  let entities = []

  if (entity && entity.entity_entity_entityToentity_entity_objectId) {
    for (let rel of entity.entity_entity_entityToentity_entity_objectId) {
      if (rel.entity_entityToentity_entity_subjectId) {
        let other = rel.entity_entityToentity_entity_subjectId
        entities.push(other)
      }
    }
  }

  if (entity && entity.entity_entity_entityToentity_entity_subjectId) {
    for (let rel of entity.entity_entity_entityToentity_entity_subjectId) {
      if (rel.entity_entityToentity_entity_objectId) {
        let other = rel.entity_entityToentity_entity_objectId
        entities.push(other)
      }
    }
  }

  if (entity) {
    return {
      props: {
        entity,
        entities,
        noItemsFound: ((!entities) || (entities.length == 0))
      }
    }
  } else {
    return {
      props: {
        notFound: true
      }
    }    
  }
}

export async function authorExtraProps(prisma, {handle}) {
  const query = {
    select: {
      entity_entityToentity_entity_objectId: {
        select: {
          handle: true,
          name: true,
          entityType: true,
          entitySubType: true,    
        }
      }
    },
    where: { 
      entity_entityToentity_entity_subjectId: {
        handle: String(handle)
      }
    }
  }
  const extraEntities = await prisma.entity_entity.findMany(query);
  return extraEntities.map((x) => x.entity_entityToentity_entity_objectId)
}