import { defineField, defineType } from "sanity";

export default defineType({
  title: "Blog Post",
  name: "blogPost",
  type: "document",
  fields: [
    defineField({ title: "Title", name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ title: "Excerpt", name: "excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ title: "Author", name: "author", type: "string", initialValue: "Team Kreditfin" }),
    defineField({ title: "Published At", name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({
      title: "Cover Image",
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ title: "Body", name: "body", type: "blockContent" }),
    defineField({ title: "Disclaimer", name: "disclaimer", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "publishedAt" },
  },
});
