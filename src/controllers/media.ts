import payload from "payload";

export async function createMedia(query) { 
  const data = await payload.create({
    collection: 'media', // change to campaignType for dynamic search
    data: query,
    overrideAccess: true,
  });
  return data;
}
