import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
import { codeInput } from '@sanity/code-input'
import { assist } from '@sanity/assist'

export default defineConfig({
  name: 'default',
  title: 'Elborn & Co.',

  projectId: '5d2oki4l',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), scheduledPublishing(), assist(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
