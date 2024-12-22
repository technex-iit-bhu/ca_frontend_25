import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { HeadingTexts } from './HeadingTexts';

const Responsibility: React.FC = () => {
  const scrollAreaRefLayer3 = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRefLayer3.current;

    if (scrollArea) {
      scrollArea.scrollLeft = scrollArea.scrollWidth / 2;

      const scrollAmount = 1;
      const scrollInterval = 16;

      const intervalId3 = setInterval(() => {
        scrollArea.scrollLeft -= scrollAmount;
        if (scrollArea.scrollLeft <= 0) {
          scrollArea.scrollLeft = scrollArea.scrollWidth;
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

    const scrollAmount = 10;
    const intervalTime = 16;

    const intervalId = setInterval(() => {
      if (direction === 'left') {
        scrollArea.scrollLeft += scrollAmount;
      } else {
        scrollArea.scrollLeft -= scrollAmount;
      }
    }, intervalTime);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  };

  const handleScroll = () => {
    const scrollArea = scrollAreaRefLayer3.current;
    if (!scrollArea) return;

    const scrollWidth = scrollArea.scrollWidth / 6;
    if (scrollArea.scrollLeft <= 0) {
      scrollArea.scrollLeft = scrollWidth;
    } else if (scrollArea.scrollLeft >= scrollWidth * 2) {
      scrollArea.scrollLeft = scrollWidth;
    }
  };

  const handleImageClick = (imageNumber: number) => {
    setSelectedImage(`/resp/c${imageNumber}.png`);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Handle touch events for mobile scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left
      startScrollingForThirdSection('left');
    } else {
      // Swiped right
      startScrollingForThirdSection('right');
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <div className="pt-28">
        <HeadingTexts redText="" whiteText="Responsibilities" align="left" />
      </div>

      <ScrollArea.Root className="relative top-7 w-full overflow-hidden">
        <ScrollArea.Viewport
          className="flex h-full w-full flex-row overflow-x-auto overflow-y-hidden p-4"
          ref={scrollAreaRefLayer3}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex min-w-max flex-row gap-4">
            {[...Array(6)].map((_, setIndex) => (
              <React.Fragment key={`set-${setIndex}`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={`set${setIndex}-${i}`}
                    className="relative h-96 w-96 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleImageClick(i)}
                  >
                    <Image
                      src={`/resp/c${i}.png`}
                      alt={`Responsibility ${i}`}
                      fill
                      className="object-contain"
                      priority={setIndex < 2}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-h-[80vh] max-w-[80vw] rounded-lg bg-zinc-900/80 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -right-4 -top-4 rounded-full bg-zinc-800 p-2"
              title="modal-image"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[50vh] w-[70vw] md:h-[60vh]">
              <Image
                src={selectedImage}
                alt="Selected Responsibility"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Responsibility;
