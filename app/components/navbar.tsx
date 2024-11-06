'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#191919] text-white px-8 py-4 fixed top-0 z-50 w-full">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <Link href="/" className="text-2xl font-bold">
          TECHNEX&apos;24
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="hover:text-[#a81f25]">
            About
          </Link>
          <Link href="/incentives" className="hover:text-[#a81f25]">
            Incentives
          </Link>
          <Link href="/contact" className="hover:text-[#a81f25]">
            Contact Us
          </Link>
          <Link href="/faqs" className="hover:text-[#a81f25]">
            FAQs
          </Link>
          <Link href="/leaderboard" className="hover:text-[#a81f25]">
            Leaderboard
          </Link>
          <Link href="/auth/signup" className="hover:text-[#a81f25]">
            Sign Up
          </Link>
          <Link href="/auth/signin" className="hover:text-[#a81f25]">
            Sign In
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link href="/about" className="block hover:text-[#a81f25]">
            About
          </Link>
          <Link href="/incentives" className="block hover:text-[#a81f25]">
            Incentives
          </Link>
          <Link href="/contact" className="block hover:text-[#a81f25]">
            Contact Us
          </Link>
          <Link href="/faqs" className="block hover:text-[#a81f25]">
            FAQs
          </Link>
          <Link href="/leaderboard" className="block hover:text-[#a81f25]">
            Leaderboard
          </Link>
          <Link href="/auth/signup" className="block hover:text-[#a81f25]">
            Sign Up
          </Link>
          <Link href="/auth/signin" className="block hover:text-[#a81f25]">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
