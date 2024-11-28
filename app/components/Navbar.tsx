'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, User } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/app/components/ui/sheet';
import { checkLoginStatus } from '@/app/utils/api';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus(localStorage.getItem('token')).then((status) => {
      setIsLoggedIn(status);
    });
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-white/10 bg-black/50 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="#">
            <Image src={'/technex_logo.svg'} alt="Technex Logo" width={240} height={60} />
          </Link>
        </div>
        <nav className="ml-auto mr-8 hidden gap-8 lg:flex">
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="#"
          >
            Incentives
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="#contact-us"
          >
            Contact Us
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="#"
          >
            FAQs
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="#"
          >
            Leaderboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link href="/profile">
              <Button
                className="hidden rounded-full border-4 border-red-500 bg-white py-6 lg:flex"
                variant="ghost"
              >
                <User className="h-18 w-18" />
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signin">
              <Button
                className="hidden rounded-full border border-b-white bg-transparent text-lg text-white hover:bg-red-500 lg:flex"
                variant="ghost"
              >
                Login
              </Button>
            </Link>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="ghost">
                <Menu className="h-6 w-6 text-white transition-colors hover:text-gray-300" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-gray-800 bg-black/60 backdrop-blur-lg sm:w-[400px]"
            >
              <SheetTitle className="text-white">Navigation Menu</SheetTitle>
              <nav className="mt-4 grid gap-6">
                {isLoggedIn ? (
                  <Link
                    className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                    href="/profile"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                    href="/auth/signin"
                  >
                    Log In
                  </Link>
                )}
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="#"
                >
                  About
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="#"
                >
                  Incentives
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="#"
                >
                  Contact Us
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="#"
                >
                  FAQs
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="#"
                >
                  Leaderboard
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
