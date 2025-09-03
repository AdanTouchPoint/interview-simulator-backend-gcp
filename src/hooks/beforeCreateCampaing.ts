import { CollectionBeforeChangeHook } from 'payload/types'
export const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
console.log(data)
console.log(req.body)
console.log(originalDoc)
console.log(operation)
  return  // Return data to either create or update a document with
}
