'use client';
import ComingSoon from "../layout/ComingSoon";
// import React, { useRef, useEffect } from 'react';
// import * as ScrollArea from '@radix-ui/react-scroll-area';
// import Image from 'next/image';
// import { ChevronsLeft, ChevronsRight } from 'lucide-react';
// import Responsibility from '../layout/Responsibilities';
// import Footer from '../layout/Footer';
// import { HeadingTexts } from '../layout/HeadingTexts';

// interface Incentive {
//   title: string;
//   description: string;
// }

// const generateIncentives = (count: number): Incentive[] => {
//   return Array(count).fill({
//     title: 'Paisa hi Paisa Hoga',
//     description:
//       'Paisa milega teko bhai, bohot saara, 150 milega. Zyada kuch nahi bas thodi majdoori karni padegi. Aur Certificate kya mangate rehte hai, yahan toh aisaich chalta hai.',
//   });
// };

const Incentives: React.FC = () => {
//   const incentives = generateIncentives(6);
//   const scrollAreaRef = useRef<HTMLDivElement>(null);
//   const scrollAreaRefLayer2 = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollArea = scrollAreaRef.current;
//     const scrollAreaLayer2 = scrollAreaRefLayer2.current;

//     if (scrollArea && scrollAreaLayer2) {
//       scrollArea.scrollLeft = scrollArea.scrollWidth / 2 + 100;
//       scrollAreaLayer2.scrollLeft = scrollArea.scrollWidth / 2;

//       const scrollAmount = 1;
//       const scrollInterval = 16;

//       const intervalId1 = setInterval(() => {
//         scrollArea.scrollLeft -= scrollAmount;
//         if (scrollArea.scrollLeft >= scrollArea.scrollWidth - scrollArea.clientWidth) {
//           scrollArea.scrollLeft = 0;
//         }
//       }, scrollInterval);

//       const intervalId2 = setInterval(() => {
//         scrollAreaLayer2.scrollLeft += scrollAmount;
//         if (scrollAreaLayer2.scrollLeft <= 0) {
//           scrollAreaLayer2.scrollLeft = scrollAreaLayer2.scrollWidth - scrollAreaLayer2.clientWidth;
//         }
//       }, scrollInterval);

//       return () => {
//         clearInterval(intervalId1);
//         clearInterval(intervalId2);
//       };
//     }
//   }, []);

//   const handleScroll = () => {
//     const scrollArea = scrollAreaRef.current;
//     const scrollAreaLayer2 = scrollAreaRefLayer2.current;

//     if (!scrollArea || !scrollAreaLayer2) return;

//     const scrollWidth = scrollArea.scrollWidth / 3;

//     if (scrollArea.scrollLeft <= 0) {
//       scrollArea.scrollLeft = scrollWidth;
//     } else if (scrollArea.scrollLeft >= scrollWidth * 2) {
//       scrollArea.scrollLeft = scrollWidth;
//     }

//     if (scrollAreaLayer2.scrollLeft <= 0) {
//       scrollAreaLayer2.scrollLeft = scrollWidth;
//     } else if (scrollAreaLayer2.scrollLeft >= scrollWidth * 2) {
//       scrollAreaLayer2.scrollLeft = scrollWidth;
//     }
//   };
//   const startScrolling = (direction: 'left' | 'right', layer: 'layer1' | 'layer2') => {
//     const scrollArea = layer === 'layer2' ? scrollAreaRef.current : scrollAreaRefLayer2.current;

//     if (!scrollArea) return;

//     const scrollAmount = 10;
//     const scrollDuration = 1000;

//     const intervalId = setInterval(() => {
//       if (direction === 'left') {
//         scrollArea.scrollLeft += scrollAmount;
//       } else {
//         scrollArea.scrollLeft -= scrollAmount;
//       }
//     }, 16);

//     setTimeout(() => {
//       clearInterval(intervalId);
//     }, scrollDuration);
//   };

  return (
    // <div className="font-spline relative min-h-screen w-full overflow-hidden text-white">
    //   <div className="fixed inset-0 z-[-1]">
    //     <Image
    //       src="/dashbg.png"
    //       alt="Home Background"
    //       layout="fill"
    //       objectFit="cover"
    //       className="z-[-1]"
    //     />
    //   </div>
    //   <div className="pt-28">
    //     <HeadingTexts whiteText="Incentives" align="left" redText="" />
    //   </div>
    //   <ScrollArea.Root className="relative top-5 h-64 w-full overflow-hidden">
    //     <div className="absolute top-60 z-10 flex w-full -translate-y-1/2 transform items-center justify-between">
    //       <button onClick={() => startScrolling('left', 'layer1')} title="scrollLeft">
    //         <ChevronsLeft className="h-8 w-8" />
    //       </button>
    //       <button onClick={() => startScrolling('right', 'layer2')} title="scrollRight">
    //         <ChevronsRight className="h-8 w-8" />
    //       </button>
    //     </div>
    //     <ScrollArea.Viewport
    //       className="flex h-full w-full overflow-x-auto p-4"
    //       ref={scrollAreaRef}
    //       onScroll={handleScroll}
    //     >
    //       <div className="flex gap-6">
    //         {[...incentives, ...incentives].map((incentive, index) => (
    //           <div
    //             key={index}
    //             className="relative w-[400px] rounded-3xl bg-[#272727] p-8 text-white shadow-[0_6px_15px_rgba(0,0,0,0.3)]"
    //           >
    //             <div className="pointer-events-none absolute inset-[6px] rounded-3xl border-4 border-[#ff0000]" />
    //             <h3 className="flex justify-center text-2xl font-semibold">{incentive.title}</h3>
    //             <p className="mt-4 pl-5">{incentive.description}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </ScrollArea.Viewport>
    //   </ScrollArea.Root>
    //   <ScrollArea.Root className="relative top-7 h-64 w-full overflow-hidden">
    //     <ScrollArea.Viewport
    //       className="flex h-full w-full overflow-x-auto p-4"
    //       ref={scrollAreaRefLayer2}
    //       onScroll={handleScroll}
    //     >
    //       <div className="flex gap-6">
    //         {[...incentives, ...incentives].map((incentive, index) => (
    //           <div
    //             key={index}
    //             className="relative w-[400px] rounded-3xl bg-[#272727] p-8 text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
    //           >
    //             <div className="pointer-events-none absolute inset-[6px] rounded-3xl border-4 border-[#ff0000]" />
    //             <h3 className="flex justify-center text-2xl font-semibold">{incentive.title}</h3>
    //             <p className="mt-4 pl-5">{incentive.description}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </ScrollArea.Viewport>
    //   </ScrollArea.Root>
    //   <Responsibility />
    //   <div className="pt-40">
    //     <Footer />
    //   </div>
    // </div>
    <div>
      <ComingSoon />
    </div>
  );
};

export default Incentives;
