import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    // Basic information
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'Enter the category title',
      description: 'The name of the category.',
      validation: (Rule) => Rule.required().max(50).warning('Titles should be concise and not too long.')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      placeholder: 'Write a brief description of the category',
      description: 'A short summary that describes what the category encompasses.',
      validation: (Rule) => Rule.max(200).warning('Descriptions should be brief and to the point.')
    }),

    // URL Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'A URL-friendly version of the category title, used for creating web addresses.',
      validation: (Rule) => Rule.required().warning('A slug is required for the category.')
    }),

    // Additional fields
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'An icon or image that visually represents the category.',
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'The parent category under which this category falls, if applicable.',
    }),
  ],
})

