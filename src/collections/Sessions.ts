import { CollectionConfig } from 'payload/types';
import { isAdminFieldLevel, isAdmin } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfUser } from '../access/isAdminOrSelf';
const Sessions: CollectionConfig = {
    slug: 'sessions',
    access: {
        // Only admins can create convertions
        create: isAdmin,
        // Admins can read all, but any other logged in user can only read themselves
        read: isAdminOrSelfUser,
        // Admins can update all, but any other logged in user can only update themselves
        update: isAdmin,
        // Admins can update all, but any other logged in user can only update themselves
        delete: isAdmin,
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
        },
        {
            name: 'empresa',
            type: 'text',
        },
        {
            name: 'cargo',
            type: 'text',
        },
        {
            name: 'sector',
            type: 'text',
        },
        {
            name: 'logs',
            type: 'array',
            fields: [
                {
                    name: 'event',
                    type: 'text',

                }

            ]
        },
        {
            // Relational field to the videos collection    
            name: 'video',
            type: 'relationship',
            relationTo: 'videos',
        }

    ],
};

export default Sessions;