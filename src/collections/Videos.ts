import { CollectionConfig } from 'payload/types';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
    create: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [

    {
      name: 'name',
      type: 'text',

    },
        {
      name: 'type',
      type: 'text',

    },
    {
         name: 'status',
      type: 'text',

    },
    {
         name: 'gcsKey',
      type: 'text',

    },
  ],
  upload: true,
}
