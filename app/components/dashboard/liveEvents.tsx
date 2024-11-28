'use client';

import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';

interface LiveEventCardProps {
  imageUrl: string;
  month: string;
  title: string;
  points: number;
  expires: string;
  task: string;
  content: string;
}

const LiveEventCard: React.FC<LiveEventCardProps> = ({
  imageUrl,
  month,
  title,
  points,
  expires,
  task,
  content,
}) => {
  return (
    <div className="event-card relative flex h-fit w-[70%] items-center rounded-[50px] md:h-[250px] md:w-[60%] md:p-6 lg:w-[50%]">
      {/* Event Image */}
      <div className="h-full w-[30%] px-2 py-4 lg:py-8">
        <Image src={imageUrl} alt="Event" layout="fill" className="rounded-lg object-contain" />
      </div>

      {/* Event Details */}
      <div className="ml-4 flex w-[75%] flex-col justify-between text-white md:py-[2rem]">
        {/* Month and Title */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white-500 mt-3 px-4 text-xs lg:text-sm">
              Month: {month} | Task: {task}
            </p>
            <h3 className="my-2 px-3 text-lg font-bold lg:text-2xl">{title}</h3>
          </div>
        </div>
        <p className="mb-2 px-3 text-xs font-light lg:text-sm">{content}</p>
        {/* Expires On and Points */}
        <div className="mr-4 mt-2 flex items-center justify-between px-3">
          <p className="text-xs font-thin lg:text-sm">{expires}</p>
          <p className="text-xs font-thin lg:text-sm">Points: {points}</p>
        </div>
        <div className="flex items-center justify-between py-5 pr-4">
          {/* Social Icons */}
          <div className="mt-2 flex space-x-3 text-gray-400">
            <FaFacebookF className="dashboard-socials cursor-pointer text-lg hover:text-blue-500 lg:text-xl" />
            <FaXTwitter className="dashboard-socials cursor-pointer text-lg hover:text-white lg:text-xl" />
            <FaInstagram className="dashboard-socials cursor-pointer text-lg hover:text-red-400 lg:text-xl" />
            <FaLinkedin className="dashboard-socials cursor-pointer text-lg hover:text-blue-700 lg:text-xl" />
          </div>
          {/* Upload Button */}
          <button className="event-button rounded-full bg-[#A81F2591] px-4 py-1 text-sm font-semibold text-white hover:bg-red-500">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveEventCard;
