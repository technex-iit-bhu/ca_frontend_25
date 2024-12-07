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

interface StatCircleProps {
  value: number;
  percentage: number;
  label: string;
}

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

const StatCircle: React.FC<StatCircleProps> = ({ value, percentage, label }) => {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[#A81F25] bg-[#191919] opacity-90 sm:h-40 sm:w-40 md:h-48 md:w-48">
          <svg className="absolute h-full w-full" viewBox="0 0 36 36">
            <path
              className="text-gray-700"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
            />
            <path
              className="text-red-600"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
              style={{ transition: 'stroke-dashoffset 0.35s ease' }}
            />
          </svg>
          <span className="text-lg font-bold sm:text-4xl md:text-6xl">{value}</span>
        </div>
        <p className="mt-4 text-sm sm:text-lg md:text-xl">{label}</p>
      </div>
    </>
  );
};

const CAPortal = () => {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-gray-900 font-spline text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0"></div>
          <Image
            src="/sunbg.png"
            alt="Home Background"
            layout="fill"
            objectFit="cover"
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

          <div className="pt-10 md:pt-0">
            <HeadingTexts whiteText="Our" redText="Reach" align="center" />
          </div>
          <div id="our-reach" className="">
            {/* <div className="flex flex-col items-center justify-center space-y-12 p-4 sm:flex-row sm:space-x-12 sm:space-y-0 md:p-10 md:pb-20"> */}
            <div className="relative flex h-auto flex-col items-center justify-center px-6 text-center sm:h-screen sm:px-12 md:px-24 pb-4">
              <StatCircle value={69} label="College Ambassadors" percentage={60} />
              <StatCircle value={234} label="Indian Colleges" percentage={70} />
              <StatCircle value={987} label="International Colleges" percentage={65} />
            </div>
            <div className="flex w-full justify-end">
              <div className="h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
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
