import React, { useRef, useEffect } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';

const Responsibility: React.FC = () => {
  const scrollAreaRefLayer3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollArea = scrollAreaRefLayer3.current;

    if (scrollArea) {
      scrollArea.scrollLeft = scrollArea.scrollWidth / 2;
    }
  }, []);

  // Function to start scrolling the third section continuously
  const startScrollingForThirdSection = (direction: 'left' | 'right') => {
    const scrollArea = scrollAreaRefLayer3.current;
    if (!scrollArea) return;

    const scrollAmount = 10; // Amount to scroll per iteration
    const intervalTime = 16; // Smooth scroll timing (in ms)

    const intervalId = setInterval(() => {
      if (direction === 'left') {
        scrollArea.scrollLeft -= scrollAmount;
      } else {
        scrollArea.scrollLeft += scrollAmount;
      }
    }, intervalTime);

    // Stop scrolling after a set duration
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000); // Duration for scrolling (in ms)
  };

  // Infinite scroll logic for continuous scrolling when reaching the end

  const handleScroll = () => {
    const scrollArea = scrollAreaRefLayer3.current;
    if (!scrollArea) return;
    const scrollWidth = scrollArea.scrollWidth / 6; // Adjust width to account for 2x sets of items

    // Infinite scroll logic: when reaching end, wrap around to start
    if (scrollArea.scrollLeft <= 0) {
      scrollArea.scrollLeft = scrollWidth;
    } else if (scrollArea.scrollLeft >= scrollWidth * 2) {
      scrollArea.scrollLeft = scrollWidth; // Seamlessly jump to second set
    }
  };

  return (
    <>
      <div className="ml-7 mt-24 w-3/12 rounded-3xl bg-[#272727] px-6 py-3 text-white">
        <h1 className="text-4xl font-extrabold md:text-5xl">Responsibilities</h1>
      </div>

      <ScrollArea.Root className="relative top-7 w-full overflow-hidden">
        <div className="absolute bottom-0 z-10 flex w-full items-center justify-between">
          <button onClick={() => startScrollingForThirdSection('left')}>
            <ChevronsLeft className="h-8 w-8" />
          </button>
          <button onClick={() => startScrollingForThirdSection('right')}>
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
                    className="relative mt-16 h-[400px] w-[300px] rounded-3xl bg-[#272727] p-8 text-white shadow-2xl"
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
                      className="z-1"
                    />
                    <div
                      className="z-2 absolute -left-0.5 top-[1px] flex h-52 w-[304px] items-center justify-center bg-[#404040]"
                      style={{
                        borderTopLeftRadius: '70px',
                        borderTopRightRadius: '70px',
                        borderBottomLeftRadius: '500px',
                        borderBottomRightRadius: '500px',
                      }}
                    >
                      <div
                        className="flex items-center justify-center bg-white"
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
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
                  className="relative mt-16 h-[400px] w-[300px] rounded-3xl bg-[#272727] p-8 text-white shadow-2xl"
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
                    className="z-1"
                  />
                  <div
                    className="z-2 absolute -left-0.5 top-[192px] flex h-52 w-[304px] items-center justify-center bg-[#404040]"
                    style={{
                      borderTopLeftRadius: '500px',
                      borderTopRightRadius: '500px',
                      borderBottomLeftRadius: '70px',
                      borderBottomRightRadius: '70px',
                    }}
                  >
                    <div
                      className="flex items-center justify-center bg-white"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                      }}
                    >
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
