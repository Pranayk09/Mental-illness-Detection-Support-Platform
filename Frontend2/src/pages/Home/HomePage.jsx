import React from 'react'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import HowItWorksSection from './HowItWorksSection'
import DashboardPreview from './DashboardPreview'
import TestimonialsSection from './Testimonials'
import CTASection from './CTA'


const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <DashboardPreview/>
      <TestimonialsSection/>
      <CTASection/>
    </div>
  )
}

export default HomePage
