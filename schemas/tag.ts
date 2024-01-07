import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    // Basic information
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'Enter the tag title',
      description: 'The name of the tag, concise and descriptive.',
      validation: (Rule) => Rule.required().max(30).warning('Tag titles should be concise.')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      placeholder: 'Write a brief description of the tag',
      description: 'A short summary that explains the scope and context of the tag.',
      validation: (Rule) => Rule.max(150).warning('Descriptions should be brief and to the point.')
    }),

    // URL Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      }, description: 'A URL-friendly version of the tag title, used for web addresses and filtering.',
      validation: (Rule) => Rule.required().warning('A slug is required for the tag.')
    }),
  ],
})
