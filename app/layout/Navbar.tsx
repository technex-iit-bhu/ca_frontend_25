'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { validateToken } from '../utils/token';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open,setOpen]=useState(false);
  const router = useRouter();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetPath = href.split('#')[0];
    const targetId = href.split('#')[1];
    // console.log(Sheet);
    setOpen(false);
    if (window.location.pathname !== targetPath) {
      router.push(href);
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const updateLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(validateToken(token));
  };

  useEffect(() => {
    updateLoginStatus();
    window.addEventListener('signin', () => {
      updateLoginStatus();
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setOpen(false);
    router.push('/auth/signin');
  };

  return (
    <header className="fixed top-0 z-50 w-full border-white/10 bg-black/50 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" onClick={(e) => handleAnchorClick(e, '/')}>
            <Image src={'/technex_logo.png'} alt="Technex Logo" width={240} height={60} />
          </Link>
        </div>
        <nav className="ml-auto mr-8 hidden gap-8 lg:flex">
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="/#about"
            onClick={(e) => handleAnchorClick(e, '/#about')}
          >
            About
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="/incentives"
          >
            Incentives
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="/#contact-us"
            onClick={(e) => handleAnchorClick(e, '/#contact-us')}
          >
            Contact Us
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="/#faqs"
            onClick={(e) => handleAnchorClick(e, '/#faqs')}
          >
            FAQs
          </Link>
          <Link
            className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
            href="/leaderboard"
          >
            Leaderboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button
                className="hidden rounded-full border-4 border-red-500 bg-opacity-0 py-6 text-white lg:flex"
                variant="ghost"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="relative hidden rounded-full border-4 border-red-500 bg-[#191919] p-6 lg:flex"
                    variant="ghost"
                  >
                    <Image
                      src="/assets/profile-user-1.svg"
                      alt="User Profile"
                      fill
                      objectFit="cover"
                      className="p-[0.125rem]"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border-gray-800 bg-black/80 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="focus:bg-red-500/20 focus:text-white">
                    <Link href="/dashboard" className="flex w-full items-center gap-2">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-red-500/20 focus:text-white">
                    <Link href="/profile" className="flex w-full items-center gap-2">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                className="hidden rounded-full border border-b-white bg-transparent text-lg text-white hover:bg-red-500 lg:flex"
                variant="ghost"
                onClick={() => router.push('/auth/signup')}
              >
                Signup
              </Button>
              <Button
                className="hidden rounded-full border border-b-white bg-transparent text-lg text-white hover:bg-red-500 lg:flex"
                variant="ghost"
                onClick={() => router.push('/auth/signin')}
              >
                Login
              </Button>
            </>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="ghost">
                <Menu className="h-6 w-6 text-white transition-colors hover:text-gray-300" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-gray-800 bg-black/60 text-white backdrop-blur-lg sm:w-[400px]"
            >
              <SheetTitle className="text-white">Navigation Menu</SheetTitle>
              <nav className="mt-4 grid gap-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                      href="/profile"
                      onClick={(e) => handleAnchorClick(e, '/profile')}
                    >
                      Profile
                    </Link>
                    <Button
                      className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                      variant="ghost"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                      href="/auth/signup"
                      onClick={(e) => handleAnchorClick(e, '/auth/signup')}
                    >
                      Signup
                    </Link>
                    <Link
                      className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                      href="/auth/signin"
                      onClick={(e) => handleAnchorClick(e, '/auth/signin')}
                    >
                      Log In
                    </Link>
                  </>
                )}
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="/#about"
                  onClick={(e) => handleAnchorClick(e, '/#about')}
                >
                  About
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="/incentives"
                  onClick={(e) => handleAnchorClick(e, '/incentives')}
                >
                  Incentives
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="/#contact-us"
                  onClick={(e) => handleAnchorClick(e, '/#contact-us')}
                >
                  Contact Us
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="/#faqs"
                  onClick={(e) => handleAnchorClick(e, '/#faqs')}
                >
                  FAQs
                </Link>
                <Link
                  className="text-lg font-medium text-white/90 transition-colors hover:text-red-500"
                  href="/leaderboard"
                  onClick={(e) => handleAnchorClick(e, '/leaderboard')}
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
