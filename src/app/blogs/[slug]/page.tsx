import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import { urlForImage } from "@/lib/sanity/image";
import { getBlogPost } from "@/lib/sanity/queries";
import { fallbackMeta, FallbackPersonalLoanVsAppLoanBody } from "@/components/blog/fallbackPersonalLoanVsAppLoan";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  // Once this slug is published in Sanity, the CMS content takes over
  // automatically. Until then, the one post we've written keeps working
  // from local fallback content so the site never breaks.
  if (!post && slug !== fallbackMeta.slug) {
    notFound();
  }

  const title = post?.title ?? fallbackMeta.title;
  const author = post?.author ?? fallbackMeta.author;
  const date = post
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : fallbackMeta.date;
  const imageUrl = post?.mainImage ? urlForImage(post.mainImage).width(1600).url() : fallbackMeta.image;
  const disclaimer = post?.disclaimer ?? fallbackMeta.disclaimer;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <article className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[840px] mx-auto px-4 sm:px-8">
          <h1 className="text-[26px] sm:text-[36px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[44px]">{title}</h1>
          <div className="flex items-center gap-4 text-[14px] font-normal text-[rgba(26,31,46,0.7)] mt-4">
            <span>{author}</span>
            <span className="w-1 h-1 rounded-full bg-[rgba(26,31,46,0.3)]" />
            <span>{date}</span>
          </div>

          <div className="relative w-full h-[220px] sm:h-[360px] rounded-[12px] overflow-hidden mt-8">
            <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized priority />
          </div>

          <div className="mt-10">
            {post ? <PortableTextRenderer value={post.body} /> : <FallbackPersonalLoanVsAppLoanBody />}

            {disclaimer && (
              <div className="border-t border-[rgba(26,31,46,0.1)] pt-6">
                <p className="text-[13px] italic text-[rgba(26,31,46,0.5)] leading-[20px]">{disclaimer}</p>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
