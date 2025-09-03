import type { Access } from 'payload/config'
import type { AccessArgs } from 'payload/config'
import type { User } from '../payload-types'
type isAdmin = (args: AccessArgs<unknown, User>) => boolean

export const isAdmin: isAdmin = ({ req: { user } }) => {
    const role = user.roles
        // Return true or false based on if the user has an admin role
    return Boolean(role === 'admin');
  }
  export const isAdminFieldLevel: isAdmin = ( { req: { user } } ) => {
    const role = user.roles
        // Return true or false based on if the user has an admin role
    return Boolean(role === 'admin');
  }