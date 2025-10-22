import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin'

const QuestionsBank: CollectionConfig = {
    slug: 'bk_speaker_media',
    access: {
        // Only admins can create convertions
        create: isAdmin,
        // Admins can read all, but any other logged in user can only read themselves
        read: isAdmin,
        // Admins can update all, but any other logged in user can only update themselves
        update: isAdmin,
        // Admins can update all, but any other logged in user can only update themselves
        delete: isAdmin,
    },
    fields: [
        {
            name: 'pregunta',
            type: 'text',
        },
        {
            name: 'categoria',
            type: 'text',
        },
        {
            name: 'id_excel',
            type: 'text',
        },
        {
            name: 'tipo_de_pregunta',
            type: 'text',
        },
        {
            name: 'estatus',
            type: 'text',

        },
        {
            name: 'ultima_modificacion',
            type: 'text',
        }

    ],
};

export default QuestionsBank;