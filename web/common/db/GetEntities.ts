export type GetEntitiesParams = {
  name?: string;
  names?: string[];
  entityType?: string;
  entitySubType?: string;
  mostPopular?: boolean;
  filterFileCount?: boolean;
  skip?: number;
  page?: number;
  take?: number;
}

export function makeDefaults(p: GetEntitiesParams): GetEntitiesParams {
  if (typeof p.skip == 'undefined') {
    p.skip = 0
  }
  if (typeof p.page == 'undefined') {
    p.page = 1
  }
  if (typeof p.take == 'undefined') {
    p.take = 20
  }
  if (typeof p.filterFileCount == 'undefined') {
    p.filterFileCount = true
  }
  return p;
}

export function GetFindClause(params: GetEntitiesParams): any {
  let {
    name,
    names,
    entityType,
    entitySubType,
    mostPopular,
    skip,
    page,
    take,
    filterFileCount,
  } = params;

  const where: any = {};

  let orderBy: any = {
  };
  if (mostPopular === true) {
    orderBy = {
      fileCount: "desc"
    };
  } else {
    orderBy = {
      name: "asc"
    };  
  }

  if (typeof name != "undefined") {
    where.name = name;
  }

  if (typeof names != "undefined") {
    where.name = { in: names };
  }

  if (typeof entityType != "undefined") {
    where.entityType = entityType;
  }

  if (typeof entitySubType != "undefined") {
    where.entitySubType = entitySubType;
  }

  if (filterFileCount) {
    where.fileCount = {
      gt: 0
    }
  }
  if (skip === 0 && page > 1) {
    skip = take * (page - 1);
  }

  const query = {
    where: where,
    skip: skip,
    take: take,
    orderBy,
    select: {
      handle: true,
      name: true,
      entityType: true,
      entitySubType: true,
      fileCount: true
    },
  };
  return query;
}

export async function GetEntities(prisma, params: GetEntitiesParams) {
  const findClause = GetFindClause(makeDefaults(params))
  const items = await prisma.entity.findMany(findClause);
  return items.length > 0 ? items : null;
}
