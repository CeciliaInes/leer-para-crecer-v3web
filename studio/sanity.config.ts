import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'zhsstniz'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'leer-para-crecer',
  title: 'Leer para crecer',
  projectId,
  dataset,
  plugins: [visionTool()],
  schema: {types: schemaTypes},
})
