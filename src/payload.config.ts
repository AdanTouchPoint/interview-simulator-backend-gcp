import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Sessions from './collections/Sessions';
import { Media } from './collections/Media';
import {Videos} from './collections/Videos';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),

  },
  collections: [
    Users,
    Sessions,
    Media,
    Videos
  ],
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
