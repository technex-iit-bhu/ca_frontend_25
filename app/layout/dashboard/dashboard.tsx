'use client';

import { useState } from 'react';
import SectionHandler from './sectionHandler';
import './dashboard.css';
import Image from 'next/image';
import { HeadingTexts } from '../HeadingTexts';

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

const comingSoon = false;

function Dashboard({ user, tasks, submitted_tasks }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState<string>('live');
  console.log(tasks);
  console.log(submitted_tasks);
  return (
    <section className="flex min-h-screen w-screen flex-col px-4 pt-[6rem] md:px-8 md:pb-[3rem] lg:pb-[5rem]">
      <div className="relative mx-auto flex h-[150px] w-full max-w-[80%] flex-col rounded-[50px] md:h-[180px] md:p-3 lg:h-[200px]">
        <HeadingTexts redText="" whiteText="Dashboard" align="left" />
      </div>
      <div className="bg-translucent relative mx-auto flex h-[500px] w-full max-w-[80%] flex-col rounded-[50px] p-3 text-white">
        <div className="absolute top-[-50px] flex h-[80px] w-[80px] items-center justify-center rounded-full border-[3px] border-red-500 bg-black md:left-[5rem] md:h-[100px] md:w-[100px] lg:left-[8rem]">
          <Image
            src="/assets/profile.svg"
            alt="Profile"
            height={100}
            width={100}
            className="rounded-full object-contain"
          />
        </div>
        <div className="dashboard-profile mt-[2.5rem] flex w-full flex-col items-center justify-between gap-4 px-[2rem] lg:flex-row lg:px-[4rem]">
          <div className="dash-name text-center lg:text-left">
            <h1 className="text-lg font-bold md:text-xl lg:text-3xl">{user.name}</h1>
            <p className="leading-[1.5rem]">Rank : {user.rank || 0}</p>
            <p className="leading-[1.5rem]">CA Id: {user.ca_id}</p>
          </div>
          <div className="stats flex flex-wrap items-center justify-center gap-4 lg:gap-6">
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
                {comingSoon ? 'Coming Soon' : user.points || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full pt-[4rem] text-white">
        <div className="mx-auto flex w-full max-w-[70%] items-center justify-center gap-6">
          <h3
            className={`text-xl ${selectedTab === 'live' ? 'text-3xl font-bold text-white underline decoration-red-700 underline-offset-8' : 'text-gray-400'} cursor-pointer`}
            onClick={() => setSelectedTab('live')}
          >
            Live Tasks
          </h3>
          <button
            className={`text-xl ${selectedTab === 'completed' ? 'text-3xl font-bold text-white underline decoration-red-700 underline-offset-8' : 'text-gray-400'}`}
            onClick={() => setSelectedTab('completed')}
          >
            Completed
          </button>
          <button
            className={`text-xl ${selectedTab === 'expired' ? 'text 3xl font-bold text-white underline decoration-red-700 underline-offset-8' : 'text-gray-400'}`}
            onClick={() => setSelectedTab('expired')}
          >
            Expired
          </button>
        </div>
        <div className="p-2 pb-10">
          <SectionHandler selectedTab={selectedTab} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
