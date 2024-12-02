'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContactUs from '@/app/layout/contactUs';
import TechnexInfo from '@/app/layout/TechnexInfo';
import AboutTechnex from '@/app/layout/AboutTechnex';
import FAQSection from '@/app/layout/FAQSection';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import WhyCA from './layout/WhyCA';

export const HeadingTexts = ({
  bgText,
  whiteText,
  redText,
  align,
}: {
  bgText: string;
  whiteText: string;
  redText: string;
  align: 'left' | 'right';
}) => (
  <div
    className={`flex flex-col ${
      align === 'right' ? 'items-end' : 'items-start'
    } -space-y-14 pb-10 sm:-space-y-32 lg:-space-y-36`}
  >
    <h1 className="text-[5rem] sm:text-[212px] lg:text-[13rem]">
      <span
        className="block opacity-20"
        style={{
          color: '#A81F25',
        }}
      >
        {bgText}
      </span>
    </h1>
    <span className="z-10 ml-3 mr-1 transform select-none text-2xl text-white transition duration-700 hover:scale-110 sm:mr-2 sm:pl-1 sm:text-[60px] md:pl-3 md:text-[73px]">
      {whiteText} <span className="text-red-600">{redText}</span>
    </span>
  </div>
);

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
        <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40 md:h-48 md:w-48">
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
      <div className="relative h-screen w-full overflow-hidden bg-gray-900 font-sans text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <Image
            src="/homebg.png"
            alt="Home Background"
            layout="fill"
            objectFit="cover"
            className="z-0 opacity-80"
          />
        </div>

        <main className="relative h-full overflow-y-auto">
          <ScrollChevron />

          {/* Main Technex Info */}
          <div id="technex-info">
            <TechnexInfo />
          </div>

          {/* About Technex Section */}
          <section className="relative" id="about">
            <AboutTechnex />
          </section>

          <div className="bg-zinc-900">
            <HeadingTexts bgText="Reach" whiteText="Our" redText="Reach" align="right" />
          </div>
          <section
            className="relative flex h-auto flex-col items-center justify-center bg-zinc-900 px-6 text-center sm:h-screen sm:px-12 md:px-24"
            id="our-reach"
          >
            <div className="flex flex-col items-center justify-center space-y-12 sm:flex-row sm:space-x-12 sm:space-y-0 md:py-20">
              <StatCircle value={69} label="College Ambassadors" percentage={60} />
              <StatCircle value={234} label="Indian Colleges" percentage={70} />
              <StatCircle value={987} label="International Colleges" percentage={65} />
            </div>
            <div className="flex w-full justify-end">
              <div className="h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
            </div>
          </section>

          <section className="relative" id="about">
            <WhyCA />
          </section>

          <FAQSection />

          <ContactUs />
        </main>
      </div>
    </>
  );
};

export default CAPortal;
