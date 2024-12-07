import React from 'react';

export const HeadingTexts = ({
  whiteText,
  redText,
  align,
}: {
  whiteText: string;
  redText: string;
  align: 'left' | 'right' | 'center';
}) => (
  <div
    className={`flex flex-col ${
      align === 'right' ? 'items-end' : align === 'center' ? 'items-center' : 'items-start'
    }`}
  >
    <span className="md:text-5xl md:rounded-[25px] md:pl-3] z-10 mb-2 ml-3 mr-1 transform select-none rounded-[10px] bg-[#272727] bg-opacity-80 p-4 text-3xl text-white transition duration-700 hover:scale-110 sm:mr-2 sm:pl-1 sm:text-4xl md:p-8">
      {whiteText} <span className="text-red-600">{redText}</span>
    </span>
  </div>
);
