import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  title: "Comparison Table",
  name: "comparisonTable",
  type: "object",
  fields: [
    defineField({ title: "Column 1 Header", name: "column1", type: "string" }),
    defineField({ title: "Column 2 Header", name: "column2", type: "string" }),
    defineField({
      title: "Rows",
      name: "rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "row",
          fields: [
            defineField({ title: "Row Label", name: "label", type: "string" }),
            defineField({ title: "Column 1 Value", name: "value1", type: "text", rows: 2 }),
            defineField({ title: "Column 2 Value", name: "value2", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { column1: "column1", column2: "column2" },
    prepare({ column1, column2 }) {
      return { title: `Table: ${column1 || "?"} vs ${column2 || "?"}` };
    },
  },
});
