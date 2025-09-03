import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
     
    },
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
