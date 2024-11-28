'use client';

import { useState } from 'react';
import SectionHandler from './sectionHandler';
import './dashboard.css';

export interface User {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  whatsappNumber: string;
  institute: string;
  city?: string;
  postal_address?: string;
  pin_code?: string;
  whyChooseYou?: string;
  wereCA?: boolean;
  year?: number;
  branch?: string;
  referralCode: string;
  email: string;
  rank: number;
  points: number;
  ca_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  deadline: string;
  image_url: string;
}

interface DashboardProps {
  user: User;
  tasks: Task[];
  submitted_tasks: Task[];
}

// coming soon bool - to be removed later
let comingSoon = false;

function Dashboard({ user, tasks, submitted_tasks }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState<string>('live');
  console.log(user, tasks, submitted_tasks);
  return (
    <div className="min-h-screen w-screen bg-[#191919] pt-[6rem] md:pb-[3rem] lg:pb-[5rem]">
      <div className="relative md:pb-[13rem] lg:pb-[17rem]">
        <h1 className="redh absolute left-[4rem] top-[0.5rem] z-10 text-[6rem] font-bold text-[#A81F2533] lg:text-[9rem]">
          Dashboard
        </h1>
        <h1 className="whiteh absolute left-[4.5rem] top-[4.7rem] z-20 text-5xl text-white lg:top-[7.2rem] lg:text-6xl">
          Dashboard
        </h1>
      </div>
      <div className="dashboard-div relative mx-auto flex h-[500px] w-[80%] flex-col rounded-[50px] bg-[#222222] p-3 text-white sm:p-4 md:p-6 lg:p-8">
        {/* Profile Section */}
        <div className="absolute top-[-50px] flex h-[120px] w-[120px] items-center justify-center rounded-full border-[3px] border-red-500 bg-black md:left-[5rem] lg:left-[8rem]">
          <img
            src="/assets/profile.svg"
            alt="Profile"
            className="h-[100px] w-[100px] rounded-full object-contain"
          />
        </div>
        <div className="dashboard-profile mt-[2.5rem] flex w-full items-center justify-between px-[2rem] lg:px-[4rem]">
          <div className="dash-name text-white">
            <h1 className="text-lg font-bold md:text-xl lg:text-3xl">{user.name}</h1>
            <p className="leading-[1.5rem]">Rank : {user.rank || 0}</p>
            <p className="leading-[1.5rem]">CA Id: {user.ca_id}</p>
          </div>
          <div className="stats flex items-start gap-x-3 px-2 lg:gap-x-6 lg:px-4">
            <div className="text-bold my-auto flex flex-col items-center p-3 lg:p-6">
              <p className="stat-heading text-[0.8rem] md:text-[1rem]">Tasks done</p>
              <p
                className={`stat-n text-center text-[1rem] md:text-[2rem] lg:text-[2.5rem] ${comingSoon ? 'coming-soon' : ''}`}
              >
                {submitted_tasks.length}
              </p>
            </div>
            <div className="text-bold my-auto flex flex-col items-center p-3 lg:p-6">
              <p className="stat-heading text-[0.8rem] md:text-[1rem]">Total Tasks</p>
              <p
                className={`stat-n text-center text-[1rem] md:text-[2rem] lg:text-[2.5rem] ${comingSoon ? 'coming-soon' : ''}`}
              >
                {tasks.length}
              </p>
            </div>
            <div className="text-bold my-auto flex flex-col items-center p-3 lg:p-6">
              <p className="stat-heading text-[0.8rem] md:text-[1rem]">Total Points</p>
              <p
                className={`stat-n text-[1rem] md:text-[2rem] lg:text-[3rem] ${comingSoon ? 'coming-soon' : ''}`}
              >
                {comingSoon ? 'Coming Soon' : user.points}
              </p>
            </div>
          </div>
        </div>
        {/* Milestone and Rewards Sections */}
        <div>
          <div className="milestone mt-6 flex items-center justify-between rounded-[50px] bg-[#191919] p-6">
            <div>
              <h3 className="text-lg font-bold leading-4">Next Milestone</h3>
              <p className="mt-3 max-w-[75%] break-words text-xs md:max-w-[60%] md:text-sm">
                Go and find a girl you virgin. Go and earn some money, so that at least someone is
                attracted to your money if not YOU!
              </p>
            </div>
            <button className="mt-2 rounded-full bg-[#A81F2591] px-4 py-2 text-white hover:bg-red-500">
              Courses
            </button>
          </div>
          <div className="mt-6 flex items-center justify-between rounded-[50px] bg-[#191919] p-6">
            <h3 className="text-lg font-bold">Rewards at the end of the CA Program</h3>
            <button className="mt-2 rounded-full bg-[#A81F2591] px-4 py-2 text-white hover:bg-red-500">
              Awards
            </button>
          </div>
        </div>
      </div>

      {/* Tab and Events Section */}
      <div className="h-full pt-[4rem] text-white">
        <div className="mx-auto flex w-[70%] items-center justify-center gap-6">
          <h3
            className={`text-xl ${
              selectedTab === 'live'
                ? 'text-3xl font-bold text-white underline decoration-red-700 underline-offset-8'
                : 'text-gray-400'
            } cursor-pointer`}
            onClick={() => setSelectedTab('live')}
          >
            Live Tasks
          </h3>
          <button
            className={`text-xl ${
              selectedTab === 'completed'
                ? 'text-3xl font-bold text-white underline decoration-red-700 underline-offset-8'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab('completed')}
          >
            Completed
          </button>
          <button
            className={`text-xl ${
              selectedTab === 'expired'
                ? 'text 3xl font-bold text-white underline decoration-red-700 underline-offset-8'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab('expired')}
          >
            Expired
          </button>
        </div>
        <div className="p-2 pb-10">
          <SectionHandler selectedTab={selectedTab} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
