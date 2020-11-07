import React from 'react';

import Hero from './Hero';
import LandingLayout from './LandingLayout';
import picture from './sa.svg';

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="Try Sphinx, protect your business."
        subtitle="Sphinx is a web application that provides user behavior analysis service, applying various machine learning approaches to anomaly detection. It also supports interactive data visualization."
        image={picture}
        ctaText="Go to your dashboard now"
        ctaLink="/dashboard"
      />
    </LandingLayout>
  );
}
