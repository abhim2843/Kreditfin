export default function TrustedPeopleSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-12">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[40px]">
            Trusted by People Like You
          </h2>
          <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
            Our vision is to be the driving force behind businesses&apos; success in the digital age, where social media is not just a platform but a powerful tool for growth and engagement
          </p>
        </div>

        {/* Placeholder cards — carousel on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-8 sm:px-8 pb-2 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[60%] sm:w-[40%] lg:w-auto rounded-[8px] bg-[#d9d9d9] aspect-[260/380]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
