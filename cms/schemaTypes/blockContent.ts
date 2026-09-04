import { defineArrayMember, defineType } from "sanity";

// Rich-text field used for the main body of a blog post.
// Supports normal paragraphs/headings/lists plus three custom
// block types authors can insert inline: a comparison table,
// an FAQ list, and a checklist.
export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            title: "Link",
            name: "link",
            type: "object",
            fields: [{ title: "URL", name: "href", type: "url" }],
          },
        ],
      },
    }),
    defineArrayMember({ type: "image", options: { hotspot: true } }),
    defineArrayMember({ type: "comparisonTable" }),
    defineArrayMember({ type: "faqList" }),
    defineArrayMember({ type: "checklist" }),
  ],
});
