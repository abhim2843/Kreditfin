import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  title: "Checklist",
  name: "checklist",
  type: "object",
  fields: [
    defineField({
      title: "Items",
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      return { title: `Checklist (${items?.length ?? 0} items)` };
    },
  },
});
