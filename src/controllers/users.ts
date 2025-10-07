import payload from "payload";

export async function getUserById(clientId) { 
  const data = await payload.find({
    collection: 'users',
    where: {
      id: {
        equals: clientId
      },
    }
  });
  return data;
}
