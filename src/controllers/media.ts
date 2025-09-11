import payload from "payload";
import { Media } from "../payload-types";

export async function createMedia(query: any) { 
  const data = await payload.create({
    collection: 'videos', // change to campaignType for dynamic search
    data: query,
    overrideAccess: true,
  });
  return data;
}

export async function findMediaById(id: string){
  const data = await payload.findByID({
    collection: 'videos',
    id: id,
    overrideAccess: true,
  });
  return data;
}

export async function updateMedia(id: string, query: any)  {
    const data = await payload.update({
        collection: 'videos',
        id: id,
        data: query,
        overrideAccess: true,
    });
    return data;
}
