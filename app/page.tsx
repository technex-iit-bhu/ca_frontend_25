'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import ContactUs from '@/app/components/contactUs';
import TechnexInfo from '@/app/components/TechnexInfo';
import AboutTechnex from '@/app/components/AboutTechnex';
import FAQSection from '@/app/components/FAQSection';

interface StatCircleProps {
  value: number;
  percentage: number;
  label: string;
}

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
  const handleScroll = () => {
    const firstSection = document.getElementById('first-section') as HTMLElement;
    const aboutSection = document.getElementById('about') as HTMLElement;

    if (!firstSection || !aboutSection) return;

    const scrollPosition = window.scrollY;
    const firstSectionHeight = firstSection.offsetHeight;

    if (
      scrollPosition + window.innerHeight >= firstSectionHeight &&
      !aboutSection.classList.contains('scrolled')
    ) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      aboutSection.classList.add('scrolled');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            className="opacity-80"
          />
        </div>

        <main className="relative h-full overflow-y-auto">
          {/* Main Technex Info */}
          <TechnexInfo />

          {/* About Technex */}
          <AboutTechnex />

          {/* Out Reach Section */}
          <section className="flex h-auto flex-col items-center justify-center bg-zinc-900 px-6 text-center sm:h-screen sm:px-12 md:px-24">
            <div className="mt-40 w-full text-right">
              <h2 className="text-3xl font-normal sm:text-8xl">
                <span className="text-red-600">Our</span> Reach
              </h2>
            </div>
            <div className="my-32 flex flex-col items-center justify-center space-y-12 sm:flex-row sm:space-x-12 sm:space-y-0">
              <StatCircle value={69} label="College Ambassadors" percentage={60} />
              <StatCircle value={234} label="Indian Colleges" percentage={70} />
              <StatCircle value={987} label="International Colleges" percentage={65} />
            </div>

            <div className="mt-6 flex w-full justify-end">
              <div className="mb-40 h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
            </div>
          </section>

          {/* FAQs */}
          <FAQSection />

          {/* Contact Us */}
          <ContactUs />
        </main>
      </div>
    </>
  );
};

export default CAPortal;
