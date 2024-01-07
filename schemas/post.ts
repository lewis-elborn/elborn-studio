import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // Primary information
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'Enter the title of the post',
      description: 'The title of the post, reflecting its main topic or theme.',
      validation: (Rule) => Rule.required().max(100).warning('Titles should be concise and not too long.')
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      placeholder: 'Write a short summary of the post',
      description: 'A short summary or snippet from the post, used for previews and teasers.',
      validation: (Rule) => Rule.required().max(200).warning('Excerpts should be brief and to the point.')
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'The main textual content of the post, often comprising various types of blocks, like paragraphs, images, and links.',
      validation: (Rule) => Rule.required().warning('The body of the post cannot be empty.')
    }),

    // SEO and meta information
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      placeholder: 'Enter a SEO-friendly title for search engines',
      description: 'A concise and SEO-friendly title used in the post\'s metadata for search engines.',
      validation: (Rule) => Rule.max(60).warning('Meta titles should be under 60 characters.')
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      placeholder: 'Write a brief description for search engine results',
      description: 'A brief and attractive description of the post for search engine results and social sharing.',
      validation: (Rule) => Rule.max(160).warning('Meta descriptions should be under 160 characters.')
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific keywords intended to optimize the post’s search engine ranking.',
      validation: (Rule) => Rule.unique().min(1).warning('At least one SEO keyword is required.')
    }),

    // Author and publishing details
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      description: 'The individual or entity responsible for writing the post.',
      validation: (Rule) => Rule.required().warning('An author must be selected for the post.')
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      placeholder: 'Set the publication date and time',
      description: 'The date and time when the post was made publicly available.',
      validation: (Rule) => Rule.required().warning('A publication date and time must be set.')
    }),

    // Categorization and tagging
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      description: 'Categorizations that help classify the post’s content and context.',
      validation: (Rule) => Rule.required().min(1).warning('At least one category must be selected.')
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      description: 'Keywords or phrases that describe the subject matter of the post.',
      validation: (Rule) => Rule.unique().warning('Tags should be unique.')
    }),

    // Images and media
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The primary visual representation of the post, usually displayed at the top.',
      validation: (Rule) => Rule.required().warning('A main image must be uploaded for the post.')
    }),
    defineField({
      name: 'summaryImage',
      title: 'Summary Image',
      type: 'image',
      options: {
        hotspot: true,
      }, description: 'A smaller image used for summaries, listings, or previews on other pages.'
    }),

    // Additional settings
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'A toggle to highlight the post as featured, often used for promoting key content.'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ],
      },
      placeholder: 'Select the status of the post',
      description: 'The current state of the post, indicating whether it’s a draft, published, or archived.',
      validation: (Rule) => Rule.required().warning('A status must be selected for the post.')
    }),

    // Advanced information
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'number',
      placeholder: 'Enter the estimated read time in minutes',
      description: 'An estimated duration, in minutes, that it might take to read the post.',
      validation: (Rule) => Rule.min(1).warning('Read time must be at least 1 minute.')
    }),
    defineField({
      name: 'customUrl',
      title: 'Custom URL',
      type: 'url',
      placeholder: 'Enter a custom URL for the post, if required',
      description: 'An optional custom URL for the post, which overrides the default slug-based URL.',
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }).warning('Custom URL must be a valid URI.')
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
