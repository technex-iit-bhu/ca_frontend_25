import { HeadingTexts } from '../layout/HeadingTexts';
import Image from 'next/image';
import * as Avatar from '@radix-ui/react-avatar';

export interface LeaderboardEntry {
  name: string;
  ca_id: string;
  points: number;
  rank: number;
}

const AvatarWithBadge = ({ badgeSrc }: { badgeSrc: string }) => {
  return (
    <div className="relative inline-flex aspect-[1/1] h-full items-center justify-center rounded-full border-4 border-[#A81F25] bg-[#191919]">
      <Avatar.Root className="aspect-[1/1] h-full overflow-hidden rounded-full p-1">
        <Avatar.Image
          className="h-full w-full scale-105 object-cover"
          src="assets/profile-user-1.svg"
        />
      </Avatar.Root>
      <div className="absolute left-[35%] top-[40%] h-full w-full">
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
    <div className="-mt-8 min-h-[500px] flex-1 overflow-y-scroll rounded-[50px] bg-[#64646466] p-6 text-white md:min-h-96">
      <ol>
        {entries.map((entry, index) => (
          <li className="mb-2 w-full rounded-[35px] bg-[#191919] px-4 py-2" key={index}>
            <div className="flex w-full items-center px-2">
              <span className="basis-1/12 pr-2 text-3xl">{entry.rank}</span>
              <div className="flex basis-11/12 flex-col items-end md:flex-row md:items-center">
                <span className="basis-1/3 text-right text-2xl md:text-left">{entry.name}</span>
                <span className="text-l basis-1/3 text-right md:text-center">
                  CA Id: {entry.ca_id}
                </span>
                <span className="text-l basis-1/3 text-right">Points: {entry.points}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const TopThree = ({ topThree }: { topThree: LeaderboardEntry[] }) => {
  const rankInfo: {
    [key: number]: { badgeSrc: string; order: string; height: string };
  } = {
    1: {
      badgeSrc: '/assets/medal-3.png',
      order: 'order-0',
      height: 'h-44',
    },
    2: {
      badgeSrc: '/assets/medal-1.png',
      order: 'order-1',
      height: 'h-40',
    },
    3: {
      badgeSrc: '/assets/medal-2.png',
      order: 'order-2',
      height: 'h-32',
    },
  };

  const topThreeMap = [topThree[2], topThree[0], topThree[1]];

  return (
    <section className="my-10 flex w-full flex-col text-white md:flex-row md:items-end">
      {topThreeMap.map((entry, index) => (
        <div
          key={index + 1}
          className={`relative m-1 mb-8 flex ${index === 1 ? 'h-[180px]' : index === 2 ? 'h-[150px]' : 'h-[120px]'} flex-1 flex-col items-center justify-between rounded-[35px] p-4 lg:m-3 ${index === 1 ? 'bg-[#E1BE00]' : index === 2 ? 'bg-[#C0C0C0]' : 'bg-[#CD7F32]'} md:${rankInfo[index + 1].height} md:${rankInfo[index + 1].order}`}
        >
          <span className="absolute -top-8 self-start px-2 text-3xl font-bold border-[#A81F25] text-white border-4 rounded-full">{entry.points}</span>
          <div className="flex h-[4.5rem] w-full">
            <AvatarWithBadge badgeSrc={rankInfo[index + 1].badgeSrc} />
            <div className="flex h-full flex-1 items-center justify-center">
              <span className="pl-2 text-center text-3xl md:text-2xl lg:text-3xl">
                {entry.name}
              </span>
            </div>
          </div>
          <span className="relative left-10 md:left-0 lg:left-10">CA ID: {entry.ca_id}</span>
        </div>
      ))}
    </section>
  );
};

export const Leaderboard = ({ leaderboard }: { leaderboard: LeaderboardEntry[] }) => {
  leaderboard = leaderboard.sort((a, b) => a.rank - b.rank);
  return (
    <div className="flex h-screen flex-col p-8 pt-32">
      <HeadingTexts redText="" whiteText="Leaderboard" align="left" />
      <TopThree topThree={leaderboard.slice(0, 3)} />
      <ListEntries entries={leaderboard.slice(3)} />
    </div>
  );
};

export default Leaderboard;
