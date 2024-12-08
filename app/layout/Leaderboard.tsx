import { HeadingTexts } from '../layout/HeadingTexts';
import Image from 'next/image';
import * as Avatar from '@radix-ui/react-avatar';

export interface LeaderboardEntry {
  name: string;
  ca_id: string;
  points: number;
  rank: number;
};

const AvatarWithBadge = ({ badgeSrc }: { badgeSrc: string }) => {
    return (
        <div className="relative inline-flex h-full aspect-[1/1] bg-[#191919] items-center justify-center rounded-full border-4 border-[#A81F25]">
          <Avatar.Root className="p-1 h-full aspect-[1/1] overflow-hidden rounded-full">
            <Avatar.Image
              className="h-full w-full scale-105 object-cover"
              src="assets/profile-user-1.svg"
            />
          </Avatar.Root>
          <div className="absolute top-[40%] left-[35%] w-full h-full">
            <Image className="scale-75" layout="fill" src={badgeSrc} alt="1st" />
          </div>
        </div>
    );
};

const ListEntries = ({ entries }: { entries: LeaderboardEntry[] }) => {
  if (entries.length === 0) {
    return <></>;
  }
  return (
    <div className="text-white -mt-8 p-6 overflow-y-scroll flex-1 min-h-96 bg-[#64646466] rounded-[50px]">
      <ol>
        {
          entries.map((entry, index) => (
            <li className="bg-[#191919] w-full rounded-full px-4 py-2 mb-2" key={index}>
              <div className="flex w-full px-2 items-center">
                <span className="text-3xl basis-1/12">{entry.rank}</span>
                <div className="flex flex-col md:flex-row items-end md:items-center basis-11/12">
                  <span className="text-2xl basis-1/3">{entry.name}</span>
                  <span className="text-l basis-1/3 text-center">CA Id: {entry.ca_id}</span>
                  <span className="text-l basis-1/3 text-right">Points: {entry.points}</span>
                </div>
              </div>
            </li>
          ))
        }
      </ol>
    </div>
  );
};

const TopThree = ({ topThree }: { topThree: LeaderboardEntry[] }) => {
  const rankInfo: { [key: number]: { color: string; badgeSrc: string; order: string; height: string } } = {
    1: {
      color: '#E1BE00',
      badgeSrc: '/assets/medal-1.png',
      order: 'order-0',
      height: 'h-44',
    },
    2: {
      color: '#C0C0C0',
      badgeSrc: '/assets/medal-2.png',
      order: 'order-1',
      height: 'h-40',
    },
    3: {
      color: '#CD7F32',
      badgeSrc: '/assets/medal-3.png',
      order: '-order-1',
      height: 'h-32',
    },
  }
  return (
    <section className="flex flex-col my-10 text-white md:flex-row w-full md:items-end">
      {
        topThree.map((entry, index) => (
          <div key={index+1} className={`flex-1 p-4 pb-2 m-1 lg:m-3 mb-8 relative bg-[${rankInfo[index+1].color}] rounded-[35px] h-24 flex flex-col items-center justify-between md:${rankInfo[index+1].height} md:${rankInfo[index+1].order}`}>
            <span className="absolute -top-7 px-1 text-4xl self-start font-bold">{entry.points}</span>
            <div className="flex h-[4.5rem] w-full">
              <AvatarWithBadge badgeSrc={rankInfo[index+1].badgeSrc} />
              <div className="h-full flex-1 justify-center items-center flex">
                <span className="text-3xl md:text-2xl lg:text-3xl pl-2 text-center">{entry.name}</span>
              </div>
            </div>
            <span>CA ID: {entry.ca_id}</span>
          </div>
        ))
      }
    </section>
  );
};

export const Leaderboard = ({ leaderboard }: { leaderboard: LeaderboardEntry[] }) => {
  leaderboard = leaderboard.sort((a, b) => a.rank - b.rank);
  return (
    <div className="flex flex-col h-screen p-8 pt-32">
      <HeadingTexts redText="" whiteText="Leaderboard" align="left" />
      <TopThree topThree={leaderboard.slice(0,3)}/>
      <ListEntries entries={leaderboard.slice(3)}/>
    </div>
  );
};

export default Leaderboard;