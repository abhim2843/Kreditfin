import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import TrustBand from "@/components/TrustBand";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
import SeeHowSection from "@/components/SeeHowSection";
import StatsSection from "@/components/StatsSection";
import TrustedPartners from "@/components/TrustedPartners";
import ManagingLoansSection from "@/components/ManagingLoansSection";
import HomeSaveSection from "@/components/HomeSaveSection";
import WaysToHelpSection from "@/components/WaysToHelpSection";
import FinancialGoalsSection from "@/components/FinancialGoalsSection";
import CalculatorsSection from "@/components/CalculatorsSection";
import EasyStepsSection from "@/components/EasyStepsSection";
import LoanComparisonSection from "@/components/LoanComparisonSection";
import WhoAreYouSection from "@/components/WhoAreYouSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ExpertsSection from "@/components/ExpertsSection";
import WhatMakesDifferentSection from "@/components/WhatMakesDifferentSection";
// import TrustedPeopleSection from "@/components/TrustedPeopleSection"; // hidden while under development
import FAQSection from "@/components/FAQSection";
import EnquireSection from "@/components/EnquireSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <TrustBand />
      <ScrollDownIndicator />
      <SeeHowSection />
      <StatsSection />
      <TrustedPartners />
      <ManagingLoansSection />
      <HomeSaveSection />
      <WaysToHelpSection />
      {/* <FinancialGoalsSection /> */}
      {/* <CalculatorsSection /> */}
      <EasyStepsSection />
      <LoanComparisonSection />
      <WhoAreYouSection />
      <ExpertsSection />
      <WhatMakesDifferentSection />
      {/* Trusted by People Like You — hidden while under development */}
      {/* <TrustedPeopleSection /> */}
      <TestimonialsSection />
      <FAQSection />
      <EnquireSection />
      <Footer />
    </main>
  );
}
