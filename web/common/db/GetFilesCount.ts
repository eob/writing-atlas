import {makeDefaults, GetFindClause, GetFilesParams} from './GetFiles';

export async function GetFilesCount(prisma: any, p: GetFilesParams) {
  const findClause = GetFindClause(makeDefaults(p))
  findClause['skip'] = undefined;
  findClause['take']   = undefined;
  findClause['select'] = undefined;
  const count: number = await prisma.file.count(findClause)
  return count;
}

