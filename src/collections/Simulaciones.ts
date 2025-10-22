import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin'
const Simulaciones: CollectionConfig = {
    slug: 'simulaciones',
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
            name: 'nombre',
            type: 'text',
        },
        {
            name: 'apellido',
            type: 'text',
        },
        {
            name: 'email',
            type: 'text',
        },
        {
            name: 'empresa',
            type: 'text',
        },
        {
            name: 'website',
            type: 'text',
        },
        {
            name: 'descripcion_del_negocio',
            type: 'text'
        },
        {
            name: 'nivel_de_responsabilidad',
            type: 'text',
        },
        {
            name: 'pregunta1',
            type: 'text',
        },
        {
            label: 'Tiempo 1 (segundos)',
            name: 'tiempo1',
            type: 'number',
        },
        {
            name: 'pregunta2',
            type: 'text',
        },
        {
            name: 'tiempo2',
            type: 'number',
        },
        {
            name: 'pregunta3',
            type: 'text',
        },
        {   
            name: 'tiempo3',
            type: 'number',
        },
        {
            name: 'categoria',
            type: 'text',
        },
        {
            name: 'tiempo_total',
            type: 'number',
        },
        {
            name: 'fecha_de_envio',
            type: 'text',
        }

    ],
};

export default Simulaciones;