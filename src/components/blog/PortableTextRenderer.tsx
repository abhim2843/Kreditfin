import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { ComparisonTableBlock, ChecklistBlock, FaqListBlock } from "@/lib/sanity/queries";

function ComparisonTable({ value }: { value: ComparisonTableBlock }) {
  return (
    <div className="overflow-x-auto rounded-[8px] border border-[rgba(26,31,46,0.12)] mb-4">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#1a1f2e]">
            <th className="text-[14px] font-semibold text-white p-4 w-[160px]"></th>
            <th className="text-[14px] font-semibold text-white p-4">{value.column1}</th>
            <th className="text-[14px] font-semibold text-white p-4">{value.column2}</th>
          </tr>
        </thead>
        <tbody>
          {value.rows?.map((row, i) => (
            <tr key={i} className={i < value.rows.length - 1 ? "border-b border-[rgba(26,31,46,0.1)]" : ""}>
              <td className="text-[14px] font-semibold text-[#1a1f2e] p-4 align-top whitespace-nowrap">{row.label}</td>
              <td className="text-[14px] font-normal text-[rgba(26,31,46,0.8)] p-4 align-top leading-[22px]">{row.value1}</td>
              <td className="text-[14px] font-normal text-[rgba(26,31,46,0.8)] p-4 align-top leading-[22px]">{row.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqList({ value }: { value: FaqListBlock }) {
  return (
    <div className="flex flex-col gap-6 mb-4">
      {value.items?.map((f, i) => (
        <div key={i}>
          <p className="text-[16px] font-semibold text-[#1a1f2e] leading-[26px] mb-1">{f.question}</p>
          <p className="text-[15px] font-normal text-[rgba(26,31,46,0.8)] leading-[26px]">{f.answer}</p>
        </div>
      ))}
    </div>
  );
}

function Checklist({ value }: { value: ChecklistBlock }) {
  return (
    <ul className="flex flex-col gap-3 mb-8">
      {value.items?.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
            <rect x="1" y="1" width="18" height="18" rx="4" stroke="#4caf50" strokeWidth="1.5" />
          </svg>
          <span className="text-[16px] font-normal text-[rgba(26,31,46,0.85)] leading-[26px]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-[22px] sm:text-[26px] font-bold text-[#1a1f2e] leading-[32px] sm:leading-[36px] mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[28px] mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-[16px] font-normal text-[rgba(26,31,46,0.85)] leading-[28px] mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#4caf50] pl-4 italic text-[rgba(26,31,46,0.7)] mb-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 flex flex-col gap-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 flex flex-col gap-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-[16px] text-[rgba(26,31,46,0.85)] leading-[28px]">{children}</li>,
    number: ({ children }) => <li className="text-[16px] text-[rgba(26,31,46,0.85)] leading-[28px]">{children}</li>,
  },
  types: {
    image: ({ value }) => (
      <div className="relative w-full h-[240px] sm:h-[360px] rounded-[12px] overflow-hidden my-6">
        <Image src={urlForImage(value).width(1200).url()} alt="" fill className="object-cover" unoptimized />
      </div>
    ),
    comparisonTable: ({ value }) => <ComparisonTable value={value} />,
    faqList: ({ value }) => <FaqList value={value} />,
    checklist: ({ value }) => <Checklist value={value} />,
  },
};

export default function PortableTextRenderer({ value }: { value: unknown }) {
  return <PortableText value={value as never} components={components} />;
}
