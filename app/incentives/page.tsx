'use client';
import React, { useState, useRef, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import Responsibility from '../layout/Responsibilities';
import Footer from '../layout/Footer';

interface Incentive {
  title: string;
  description: string;
}

const generateIncentives = (count: number): Incentive[] => {
  return Array(count).fill({
    title: 'Paisa hi Paisa Hoga',
    description:
      'Paisa milega teko bhai, bohot saara, 150 milega. Zyada kuch nahi bas thodi majdoori karni padegi. Aur Certificate kya mangate rehte hai, yahan toh aisaich chalta hai.',
  });
};

const Incentives: React.FC = () => {
  const [incentives, setIncentives] = useState<Incentive[]>(generateIncentives(6));
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaRefLayer2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    const scrollAreaLayer2 = scrollAreaRefLayer2.current;

    if (scrollArea && scrollAreaLayer2) {
      scrollArea.scrollLeft = scrollArea.scrollWidth / 2 + 100;
      scrollAreaLayer2.scrollLeft = scrollArea.scrollWidth / 2;
    }
  }, []);

  const startScrolling = (direction: 'left' | 'right') => {
    const scrollArea = scrollAreaRef.current;
    const scrollAreaLayer2 = scrollAreaRefLayer2.current;

    if (!scrollArea || !scrollAreaLayer2) return;

    const scrollAmount = 10;
    const scrollDuration = 1000;

    const intervalId = setInterval(() => {
      if (direction === 'left') {
        scrollArea.scrollLeft -= scrollAmount;
        scrollAreaLayer2.scrollLeft -= scrollAmount;
      } else {
        scrollArea.scrollLeft += scrollAmount;
        scrollAreaLayer2.scrollLeft += scrollAmount;
      }
    }, 16);

    setTimeout(() => {
      clearInterval(intervalId);
    }, scrollDuration);
  };

  const handleScroll = () => {
    const scrollArea = scrollAreaRef.current;
    const scrollAreaLayer2 = scrollAreaRefLayer2.current;

    if (!scrollArea || !scrollAreaLayer2) return;

    const scrollWidth = scrollArea.scrollWidth / 3;

    if (scrollArea.scrollLeft <= 0) {
      scrollArea.scrollLeft = scrollWidth;
    } else if (scrollArea.scrollLeft >= scrollWidth * 2) {
      scrollArea.scrollLeft = scrollWidth;
    }

    if (scrollAreaLayer2.scrollLeft <= 0) {
      scrollAreaLayer2.scrollLeft = scrollWidth;
    } else if (scrollAreaLayer2.scrollLeft >= scrollWidth * 2) {
      scrollAreaLayer2.scrollLeft = scrollWidth;
    }
  };

  return (
    <div className="font-spline relative min-h-screen w-full overflow-hidden text-white">
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/dashbg.png"
          alt="Home Background"
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
        />
      </div>
      <div className="ml-7 mt-24 w-72 rounded-3xl bg-[#272727] px-6 py-3 text-white">
        <h1 className="text-4xl font-extrabold md:text-5xl">Incentives</h1>
      </div>
      <ScrollArea.Root className="relative top-5 h-64 w-full overflow-hidden">
        <div className="absolute top-60 z-10 flex w-full -translate-y-1/2 transform items-center justify-between">
          <button onClick={() => startScrolling('left')}>
            <ChevronsLeft className="h-8 w-8" />
          </button>
          <button onClick={() => startScrolling('right')}>
            <ChevronsRight className="h-8 w-8" />
          </button>
        </div>
        <ScrollArea.Viewport
          className="flex h-full w-full overflow-x-auto p-4"
          ref={scrollAreaRef}
          onScroll={handleScroll}
        >
          <div className="flex gap-6">
            {[...incentives, ...incentives].map((incentive, index) => (
              <div
                key={index}
                className="relative w-[400px] rounded-3xl bg-[#272727] p-8 text-white shadow-2xl"
                style={{
                  position: 'relative',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '6px',
                    border: '4px solid #ff0000',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                  }}
                />
                <h3 className="flex justify-center text-2xl font-semibold">{incentive.title}</h3>
                <p className="mt-4 pl-5">{incentive.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
      <ScrollArea.Root className="relative top-7 h-64 w-full overflow-hidden">
        <ScrollArea.Viewport
          className="flex h-full w-full overflow-x-auto p-4"
          ref={scrollAreaRefLayer2}
          onScroll={handleScroll}
        >
          <div className="flex gap-6">
            {[...incentives, ...incentives].map((incentive, index) => (
              <div
                key={index}
                className="relative w-[400px] rounded-3xl bg-[#272727] p-8 text-white shadow-2xl"
                style={{
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '6px',
                    border: '4px solid #ff0000',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                  }}
                />
                <h3 className="flex justify-center text-2xl font-semibold">{incentive.title}</h3>
                <p className="mt-4 pl-5">{incentive.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
      <Responsibility />
      <div className="pt-40">
        <Footer />
      </div>
    </div>
  );
};

export default Incentives;
