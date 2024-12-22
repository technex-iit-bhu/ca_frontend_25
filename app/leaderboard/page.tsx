import Leaderboard, { LeaderboardEntry } from "../layout/Leaderboard";
import { getLeaderboard } from "../utils/api";

export default async function LeaderboardPage() {
  let leaderboard: LeaderboardEntry[] = [];
  let error: string | null = null;
  try {
    const response = await getLeaderboard();
    if (response.ok) {
      leaderboard = await response.json();
    } else {
      error = (await response.json()).message;
    }
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = String(err);
    }
  }

  return (
    <>
      <div className="bg-start fixed -z-10 h-screen w-screen bg-[url('/dashbg.png')] bg-cover bg-fixed bg-no-repeat pt-32"></div>
      {
        error !== null ? (
          <div className="mx-8 p-5 mt-32 bg-black/50 rounded-md">
            <span className="block text-red-500 font-bold text-3xl mb-3">Error: {error}</span>
            <span className="text-red-400 text-2xl">Please refresh the page to try again.</span>
          </div>
        ) : (<Leaderboard leaderboard={leaderboard} />)
      }
    </>
  );
}
