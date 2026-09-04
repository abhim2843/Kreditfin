import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  title: "FAQ List",
  name: "faqList",
  type: "object",
  fields: [
    defineField({
      title: "Questions",
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ title: "Question", name: "question", type: "string" }),
            defineField({ title: "Answer", name: "answer", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      return { title: `FAQ (${items?.length ?? 0} questions)` };
    },
  },
});
