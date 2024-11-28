import React from 'react';
import ProfilePage from '@/app/layout/ProfilePage';
import { Navbar } from '@/app/layout/transparent-navbar-with-logo';

export default function UserProfile() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#191919]">
      <Navbar />
      <main className="mt-12 sm:mt-9">
        <ProfilePage />
      </main>
    </div>
  );
}
