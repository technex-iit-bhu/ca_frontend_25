import React from "react";
import ProfilePage from "@/components/ProfilePage";
import { Navbar } from "@/components/transparent-navbar-with-logo";

export default function UserProfile() {
  return (
  <div className="min-h-screen bg-[#191919] flex flex-col items-center">
    <Navbar />
    <main className="mt-12 sm:mt-9">
      <ProfilePage/>
    </main>
  </div>
  );
}