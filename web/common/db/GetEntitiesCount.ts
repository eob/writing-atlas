import {makeDefaults, GetFindClause, GetEntitiesParams} from './GetEntities';

export async function GetEntitiesCount(prisma, p: GetEntitiesParams): Promise<number> {
  const findClause = GetFindClause(makeDefaults(p))
  findClause['skip'] = undefined;
  findClause['take']   = undefined;
  findClause['select'] = undefined;
  const count: number = await prisma.entity.count(findClause)
  return count;
};
