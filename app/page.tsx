'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContactUs from '@/app/layout/contactUs';
import TechnexInfo from '@/app/layout/TechnexInfo';
import AboutTechnex from '@/app/layout/AboutTechnex';
import FAQandTestimonials from '@/app/layout/FAQandTestimonials';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import WhyCA from './layout/WhyCA';
import { HeadingTexts } from './layout/HeadingTexts';
import RedLine from './layout/RedLine';
import StatCircle from './layout/StatCircle';

const ScrollChevron: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const sectionIds = ['technex-info', 'about', 'our-reach', 'faqs', 'contact-us'];
    sectionsRef.current = sectionIds
      .map((id) => document.getElementById(id) as HTMLElement)
      .filter((section) => section !== null);
  }, []);

  const scrollToNextSection = () => {
    if (sectionsRef.current.length === 0) return;

    // Increment section index, loop back to 0 if at the end
    const nextSectionIndex = (currentSection + 1) % sectionsRef.current.length;

    // Scroll to the next section
    sectionsRef.current[nextSectionIndex].scrollIntoView({
      behavior: 'smooth',
    });

    // Update current section
    setCurrentSection(nextSectionIndex);
  };

  // Determine which icon to use based on the current section
  const isLastSection = currentSection === sectionsRef.current.length - 1;
  const ChevronIcon = isLastSection ? ChevronsUp : ChevronsDown;

  return (
    <div
      onClick={scrollToNextSection}
      className="fixed bottom-6 left-1/2 z-10 -translate-x-1/2 transform cursor-pointer transition-all duration-500"
    >
      <ChevronIcon
        className={`animate-bounce text-5xl text-red-600 sm:text-6xl ${
          isLastSection ? 'rotate-180' : ''
        }`}
      />
    </div>
  );
};

const CAPortal = () => {
  return (
    <>
      <div className="font-spline relative h-screen w-full overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0"></div>
          <Image
            src="/sunbg.png"
            alt="Home Background"
            fill
            style={{ objectFit: "cover" }}
            className="z-[-1]"
          />
        </div>

        <main className="relative h-full overflow-y-auto">
          <ScrollChevron />

          {/* Main Technex Info */}
          <div id="technex-info">
            <TechnexInfo />
          </div>

          {/* About Technex Section */}
          <div className="relative" id="about">
            <AboutTechnex />
          </div>

          <div className="pb-0 pt-10 md:pb-2 md:pt-0">
            <HeadingTexts whiteText="Our" redText="Reach" align="center" />
          </div>
          <div id="our-reach" className="mt-8 px-[1.5rem] md:mt-12 md:px-[6rem]">
            <div className="relative flex h-auto flex-col items-center justify-center gap-10 px-6 pb-4 text-center sm:h-screen sm:px-12 md:px-24">
              <StatCircle value={587} label="College Ambassadors" percentage={60} />
              <StatCircle value={235} label="Indian Colleges" percentage={70} />
              <StatCircle value={65} label="International Colleges" percentage={65} />
            </div>
            <div className="flex justify-end">
              <RedLine align="right" />
            </div>
          </div>

          <div id="about" className="mt-10">
            <WhyCA />
          </div>

          <FAQandTestimonials />

          <ContactUs />
        </main>
      </div>
    </>
  );
};

export default CAPortal;
