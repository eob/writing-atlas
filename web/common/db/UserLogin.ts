export async function CreateOrUpdateUserOnLogin(prisma, { name, picture, firstName, lastName, nickName, locale, email, sub}) {  
  // First upsert the tag
  let user = await prisma.user.findFirst({
    where: { externalId: sub }
  })
  if (user === null) {
    user = await prisma.user.create({
      data: { 
        externalId: sub,
        email,
        profilePhoto: picture,
        name,
        firstName,
        lastName,
        nickName,
        locale
      }
    })  
  }

  let usage = await prisma.usage.create({
    data: { 
      userId: user.id,
      userEmail: user.email,
      resourceType: 'user',
      resourceId: user.id,
      operationType: 'login',
      operationVia: 'web',
    }
  });

  return user
}
