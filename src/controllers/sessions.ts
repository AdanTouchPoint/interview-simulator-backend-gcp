import payload from "payload";

export async function createSession(query) { 
  const data = await payload.create({
    collection: 'sessions', 
    data: query,
    overrideAccess: true,
  });
  return data;
}

export async function updateSession(query) {
  const id  = query.sessionId 
 const data = await payload.update({
    collection: 'sessions', 
    data: query,
    //overrideAccess: true,
    where: {
      id: {
        equals: id
      },
    },
  }); 
  return data;
}