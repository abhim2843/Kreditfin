import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogList } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

// Shown until posts are published in Sanity (see cms/README.md). Once the
// CMS returns at least one post, this list is ignored entirely.
const fallbackBlogs = [
  {
    image: "/assets/blog-1.png",
    title: "Personal Loan vs App Loan: Which One Actually Helps You — and Which One Hurts You Later?",
    excerpt: "“0.01% per day” sounds like nothing. On paper, it isn’t. On your phone’s contact list, it can become everything.....",
    author: "By Team Kreditfin",
    date: "7 July 2026",
    href: "/blogs/personal-loan-vs-app-loan",
  },
  {
    image: "/assets/blog-2.png",
    title: "One EMI. Less Stress. More Freedom.",
    excerpt: "Consolidating multiple loans into a single EMI can be the difference between constant financial pressure and lasting peace of mind.....",
    author: "By Team Kreditfin",
    date: "7 July 2026",
    href: "/blogs/personal-loan-vs-app-loan",
  },
  {
    image: "/assets/blog-3.png",
    title: "Better Decisions. Stronger Tomorrow.",
    excerpt: "Smart loan solutions today can set the foundation for a financially secure tomorrow — here’s how to plan for it.....",
    author: "By Team Kreditfin",
    date: "7 July 2026",
    href: "/blogs/personal-loan-vs-app-loan",
  },
];

export default async function BlogsPage() {
  const cmsPosts = await getBlogList();

  const blogs =
    cmsPosts.length > 0
      ? cmsPosts.map((p) => ({
          image: urlForImage(p.mainImage).width(800).height(480).url(),
          title: p.title,
          excerpt: p.excerpt,
          author: p.author,
          date: new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
          href: `/blogs/${p.slug}`,
        }))
      : fallbackBlogs;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-10 sm:mb-12 max-w-[1145px] mx-auto">
            <h1 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Blogs</h1>
            <p className="text-[16px] sm:text-[20px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] sm:leading-[32px]">
              Get Instant estimates and plan your loan better with KreditFin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((b, i) => (
              <div
                key={i}
                className="flex flex-col rounded-[8px] bg-white shadow-[0px_0px_9.2px_0px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <div className="relative w-full h-[220px] sm:h-[240px]">
                  <Image src={b.image} alt={b.title} fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col flex-1 gap-4 p-6">
                  <div className="flex items-center justify-between text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[24px]">
                    <span>{b.author}</span>
                    <span>{b.date}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{b.title}</h3>
                    <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[24px]">{b.excerpt}</p>
                  </div>
                  <Link
                    href={b.href}
                    className="group flex items-center gap-2 pt-2 mt-auto border-t border-[rgba(26,31,46,0.1)] w-fit"
                  >
                    <span className="text-[18px] sm:text-[20px] font-semibold text-[#4caf50] leading-[28px]">Read More</span>
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" className="shrink-0 transition-transform group-hover:translate-x-0.5">
                      <path d="M1 5h11M8 1l4 4-4 4" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
