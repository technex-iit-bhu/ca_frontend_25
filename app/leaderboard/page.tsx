import Leaderboard, { LeaderboardEntry } from "../layout/Leaderboard";
import { getLeaderboard } from "../utils/api";

export default async function LeaderboardPage() {
  let leaderboard: LeaderboardEntry[] = [];
  try {
    leaderboard = await getLeaderboard();
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
  }

  return (
    <>
      <div className="bg-start fixed -z-10 h-screen w-screen bg-[url('/dashbg.png')] bg-cover bg-fixed bg-no-repeat pt-32"></div>
      {
        leaderboard.length === 0 ? (
          <div className="mx-8 p-5 mt-32 bg-black/50 rounded-md">
            <span className="block text-red-500 font-bold text-3xl mb-3">Error fetching the Leaderboard.</span>
            <span className="text-red-400 text-2xl">Please refresh the page to try again.</span>
          </div>
        ) : (<Leaderboard leaderboard={leaderboard} />)
      }
    </>
  );
}
