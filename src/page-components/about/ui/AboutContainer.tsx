"use client"

import AboutHero from "./AboutHero"
import AboutStrengths from "./AboutStrengths"
import AboutEquipment from "./AboutEquipment"
import ProcessSection from "@/page-components/lp/ui/ProcessSection";

export default function AboutContainer() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStrengths />
      <AboutEquipment />
      <ProcessSection />
    </div>
  )
}