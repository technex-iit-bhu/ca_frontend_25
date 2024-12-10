import React, { useRef, useEffect } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { HeadingTexts } from './HeadingTexts';

const Responsibility: React.FC = () => {
  const scrollAreaRefLayer3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRefLayer3.current;

    if (scrollArea) {
      scrollArea.scrollLeft = scrollArea.scrollWidth / 2;

      const scrollAmount = 1; // Amount to scroll per iteration
      const scrollInterval = 16; // Smooth scroll timing (in ms)

      const intervalId3 = setInterval(() => {
        scrollArea.scrollLeft -= scrollAmount;
        if (scrollArea.scrollLeft >= scrollArea.scrollWidth - scrollArea.clientWidth) {
          scrollArea.scrollLeft = 0;
        }
      }, scrollInterval);

      return () => {
        clearInterval(intervalId3);
      };
    }
  }, []);

  const startScrollingForThirdSection = (direction: 'left' | 'right') => {
    const scrollArea = scrollAreaRefLayer3.current;
    if (!scrollArea) return;

    const scrollAmount = 10; // Amount to scroll per iteration
    const intervalTime = 16; // Smooth scroll timing (in ms)

    const intervalId = setInterval(() => {
      if (direction === 'left') {
        scrollArea.scrollLeft += scrollAmount;
      } else {
        scrollArea.scrollLeft -= scrollAmount;
      }
    }, intervalTime);

    // Stop scrolling after a set duration
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000); // Duration for scrolling (in ms)
  };

  const handleScroll = () => {
    const scrollArea = scrollAreaRefLayer3.current;
    if (!scrollArea) return;

    const scrollWidth = scrollArea.scrollWidth / 6; // Adjust width to account for 2x sets of items

    if (scrollArea.scrollLeft <= 0) {
      scrollArea.scrollLeft = scrollWidth;
    } else if (scrollArea.scrollLeft >= scrollWidth * 2) {
      scrollArea.scrollLeft = scrollWidth;
    }
  };

  return (
    <>
      <div className="pt-28">
        <HeadingTexts redText="" whiteText="Resposibilities" align="left" />
      </div>

      <ScrollArea.Root className="relative top-7 w-full overflow-hidden">
        <div className="absolute bottom-0 z-10 flex w-full items-center justify-between">
          <button onClick={() => startScrollingForThirdSection('left')} title="scrollLeft">
            <ChevronsLeft className="h-8 w-8" />
          </button>
          <button onClick={() => startScrollingForThirdSection('right')} title="scrollRight">
            <ChevronsRight className="h-8 w-8" />
          </button>
        </div>

        <ScrollArea.Viewport
          className="flex h-full w-full overflow-x-auto p-4"
          ref={scrollAreaRefLayer3}
          onScroll={handleScroll}
        >
          <div className="flex gap-6">
            {[...Array(6), ...Array(6)].map((_, index) => {
              if (index % 2) {
                return (
                  <div
                    key={index}
                    className="relative mt-16 h-[400px] w-[300px] rounded-3xl bg-[#272727] p-8 text-white"
                  >
                    <div className="z-1 pointer-events-none absolute inset-[6px] rounded-3xl border-4 border-[#ff0000]"></div>
                    <div className="z-2 absolute -left-0.5 top-[1px] flex h-52 w-[304px] items-center justify-center rounded-bl-[500px] rounded-br-[500px] rounded-tl-[70px] rounded-tr-[70px] bg-[#404040]">
                      <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-white">
                        <Image src="/coordinate.png" width={50} height={50} alt="coordinate" />
                      </div>
                    </div>
                    <h3 className="flex justify-center pt-52 text-2xl font-semibold">
                      Co-ordinate
                    </h3>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="relative mt-16 h-[400px] w-[300px] rounded-3xl bg-[#272727] p-8 text-white"
                >
                  <div className="z-1 pointer-events-none absolute inset-[6px] rounded-3xl border-4 border-[#ff0000]"></div>

                  <div className="z-2 absolute -left-0.5 top-[192px] flex h-52 w-[304px] items-center justify-center rounded-bl-[70px] rounded-br-[70px] rounded-tl-[500px] rounded-tr-[500px] bg-[#404040]">
                    <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-white">
                      <Image src="/coordinate.png" width={50} height={50} alt="coordinate" />
                    </div>
                  </div>
                  <h3 className="flex justify-center pt-24 text-2xl font-semibold">Co-ordinate</h3>
                </div>
              );
            })}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </>
  );
};

export default Responsibility;
