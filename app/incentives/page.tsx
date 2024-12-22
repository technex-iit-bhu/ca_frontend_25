'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import Responsibility from '../layout/Responsibilities';
import Footer from '../layout/Footer';
import { HeadingTexts } from '../layout/HeadingTexts';

const incentiveImages1 = [
  '/incentives/i1.png',
  '/incentives/i2.png',
  '/incentives/i3.png',
  '/incentives/i4.png',
  '/incentives/i5.png',
  '/incentives/i6.png',
  '/incentives/i7.png',
  '/incentives/i8.png',
  '/incentives/i9.png',
  '/incentives/i10.png',
];

const incentiveImages2 = [
  '/incentives/i10.png',
  '/incentives/i9.png',
  '/incentives/i8.png',
  '/incentives/i7.png',
  '/incentives/i6.png',
  '/incentives/i5.png',
  '/incentives/i4.png',
  '/incentives/i3.png',
  '/incentives/i2.png',
  '/incentives/i1.png',
];

const Incentives: React.FC = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaRefLayer2 = useRef<HTMLDivElement>(null);
  const [randomizedImages1, setRandomizedImages1] = useState<string[]>([]);
  const [randomizedImages2, setRandomizedImages2] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [intervalIds, setIntervalIds] = useState<NodeJS.Timer[]>([]);

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setRandomizedImages1(shuffleArray(incentiveImages1));
    setRandomizedImages2(shuffleArray(incentiveImages2));

    startAutoScroll();

    return () => {
      intervalIds.forEach((id) => {
        if (typeof id === 'number') {
          clearInterval(id);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Please do NOT change the dependencies of this useEffect.

  const startAutoScroll = () => {
    const scrollArea = scrollAreaRef.current;
    const scrollAreaLayer2 = scrollAreaRefLayer2.current;

    if (scrollArea && scrollAreaLayer2) {
      scrollArea.scrollLeft = scrollArea.scrollWidth / 2 + 100;
      scrollAreaLayer2.scrollLeft = scrollArea.scrollWidth / 2;

      const scrollAmount = 1;
      const scrollInterval = 16;

      const intervalId1 = setInterval(() => {
        scrollArea.scrollLeft += scrollAmount;
        if (scrollArea.scrollLeft >= scrollArea.scrollWidth - scrollArea.clientWidth) {
          scrollArea.scrollLeft = 0;
        }
      }, scrollInterval);

      const intervalId2 = setInterval(() => {
        scrollAreaLayer2.scrollLeft -= scrollAmount;
        if (scrollAreaLayer2.scrollLeft <= 0) {
          scrollAreaLayer2.scrollLeft = scrollAreaLayer2.scrollWidth - scrollAreaLayer2.clientWidth;
        }
      }, scrollInterval);

      setIntervalIds([intervalId1, intervalId2]);
    }
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

  const startScrolling = (direction: 'left' | 'right', layer: 'layer1' | 'layer2') => {
    const scrollArea = layer === 'layer2' ? scrollAreaRef.current : scrollAreaRefLayer2.current;

    if (!scrollArea) return;

    const scrollAmount = 10;
    const scrollDuration = 1000;

    const intervalId = setInterval(() => {
      if (direction === 'left') {
        scrollArea.scrollLeft += scrollAmount;
      } else {
        scrollArea.scrollLeft -= scrollAmount;
      }
    }, 16);

    setTimeout(() => {
      clearInterval(intervalId);
    }, scrollDuration);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    intervalIds.forEach((id) => {
      if (typeof id === 'number') {
        clearInterval(id);
      }
    });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    startAutoScroll();
  };

  return (
    <div className="font-spline relative min-h-screen w-full overflow-hidden text-white">
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/dashbg.png"
          alt="Home Background"
          fill
          sizes="100vw"
          className="z-[-1] object-cover"
          priority
        />
      </div>
      <div className="pt-28">
        <HeadingTexts whiteText="Incentives" align="left" redText="" />
      </div>
      <ScrollArea.Root className="relative top-5 h-[350px] w-full overflow-hidden">
        <div className="absolute top-60 z-10 flex w-full -translate-y-1/2 transform items-center justify-between px-4">
          <button onClick={() => startScrolling('left', 'layer1')} title="scrollLeft">
            <ChevronsLeft className="h-8 w-8" />
          </button>
          <button onClick={() => startScrolling('right', 'layer2')} title="scrollRight">
            <ChevronsRight className="h-8 w-8" />
          </button>
        </div>
        <ScrollArea.Viewport
          className="flex h-full w-full overflow-x-auto p-4"
          ref={scrollAreaRef}
          onScroll={handleScroll}
        >
          <div className="flex gap-6">
            {randomizedImages1.length > 0 &&
              [...randomizedImages1, ...randomizedImages1].map((imageSrc, index) => (
                <div
                  key={index}
                  className="relative flex h-[300px] w-[250px] cursor-pointer items-center justify-center sm:h-[300px] sm:w-[300px] md:h-[300px] md:w-[400px]"
                  onClick={() => handleImageClick(imageSrc)}
                >
                  <Image
                    src={imageSrc}
                    alt={`Incentive ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 400px"
                    className="rounded-2xl object-contain p-2"
                    priority
                  />
                </div>
              ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
      <ScrollArea.Root className="relative top-7 h-[350px] w-full overflow-hidden">
        <ScrollArea.Viewport
          className="flex h-full w-full overflow-x-auto p-4"
          ref={scrollAreaRefLayer2}
          onScroll={handleScroll}
        >
          <div className="flex gap-6">
            {randomizedImages2.length > 0 &&
              [...randomizedImages2, ...randomizedImages2].map((imageSrc, index) => (
                <div
                  key={index}
                  className="relative flex h-[300px] w-[250px] cursor-pointer items-center justify-center sm:h-[300px] sm:w-[300px] md:h-[300px] md:w-[400px]"
                  onClick={() => handleImageClick(imageSrc)}
                >
                  <Image
                    src={imageSrc}
                    alt={`Incentive ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 400px"
                    className="rounded-2xl object-contain p-2"
                    priority
                  />
                </div>
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
            <div className="relative h-[40vh] w-[60vw] sm:h-[60vh]">
              <Image
                src={selectedImage}
                alt="Selected Incentive"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Responsibility />
      <div className="pt-40">
        <Footer />
      </div>
    </div>
  );
};

export default Incentives;
