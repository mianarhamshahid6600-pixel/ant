import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { PrimePartnershipBanner } from '../components/PrimePartnershipBanner';

export const HomePage = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Categories Grid Section */}
      <CategoriesSection />

      {/* 3. Featured Prime Products Showcase */}
      <FeaturedProducts />

      {/* 4. Prime Authorized Distributor Partnership Banner */}
      <PrimePartnershipBanner />
    </div>
  );
};
