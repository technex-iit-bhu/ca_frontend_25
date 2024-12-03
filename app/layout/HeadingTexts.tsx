import React from 'react';

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
