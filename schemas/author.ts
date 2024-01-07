import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    // Basic information
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      placeholder: 'Enter the full name of the author',
      description: 'The full name of the author.',
      validation: (Rule) => Rule.required().min(3).max(50).warning('Author names should be between 3 and 50 characters.')
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'A photographic representation of the author.',
      validation: (Rule) => Rule.required().warning('An image is required for the author\'s profile.')
    }),

    // Contact and social media
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      placeholder: 'Enter the author\'s email address',
      description: 'The author\'s professional email address for contact purposes.',
      validation: (Rule) => Rule.email().warning('Please enter a valid email address.')
    }),
    defineField({
      name: 'socialMediaProfiles',
      title: 'Social Media Profiles',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Links to the author\'s social media profiles (e.g., LinkedIn, Twitter).',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }).warning('Please enter valid URLs.')
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      placeholder: 'Enter the URL of the author\'s personal or professional website',
      description: 'The author\'s personal or professional website.',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }).warning('Please enter a valid URL.')
    }),

    // Professional details
    defineField({
      name: 'affiliation',
      title: 'Affiliation',
      type: 'string',
      placeholder: 'Enter the author\'s professional affiliation or organization',
      description: 'The organization or institution the author is affiliated with.',
      validation: (Rule) => Rule.max(100).warning('Affiliation should be concise.')
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
      description: 'A detailed biography of the author, including both professional and personal details.',
      validation: (Rule) => Rule.required().min(10).warning('A bio must be at least 10 characters long.')
    }),

    // URL Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'A URL-friendly version of the author\'s name for web addresses.',
      validation: (Rule) => Rule.required().warning('A slug is required for the author.')
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
