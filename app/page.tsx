'use client';

import HeaderNavbar from '@/components/HeaderNavbar';
import SearchSection from '@/components/SearchSection';
import FilterChips from '@/components/FilterChips';
import ExperienceRecommendation from '@/components/ExperienceRecommendation';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeaderNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Perfect
            <span className="text-blue-600 block">Stay Anywhere</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            From cozy local stays to luxury resorts, find accommodations that match your travel dreams with personalized recommendations.
          </p>
          
          <SearchSection />
        </div>
      </section>

      <FilterChips />
      <ExperienceRecommendation />
      <CTASection />
      <FooterSection />
    </div>
  );
}