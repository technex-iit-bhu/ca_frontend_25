import React from 'react';
import ProfilePage from '@/app/layout/ProfilePage';

export default function UserProfile() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[url('/dashbg.png')] bg-cover bg-center bg-no-repeat">
      <main className="mt-12 sm:mt-9">
        <ProfilePage />
      </main>
    </div>
  );
}
