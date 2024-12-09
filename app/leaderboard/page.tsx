import { Leaderboard, LeaderboardEntry } from '../layout/Leaderboard';
export default function LeaderboardPage() {
  const leaderboard: LeaderboardEntry[] = [
    { name: "Vaibhav Tripathi", ca_id: "00000000", points: 1552, rank: 1 },
    { name: "Eshaan Aggarwal", ca_id: "00000000", points: 1432, rank: 2 },
    { name: "Aakash Sharma", ca_id: "00000000", points: 1265, rank: 3 },
    { name: "Priyadarshi", ca_id: "00000000", points: 911, rank: 4 },
    { name: "Shivansh Bhatnagar", ca_id: "00000000", points: 691, rank: 5 },
    { name: "Prithvi Dutta", ca_id: "00000000", points: 420, rank: 6 },
    { name: "John Smith", ca_id: "00000001", points: 395, rank: 7 },
    { name: "Jane Doe", ca_id: "00000002", points: 382, rank: 8 },
    { name: "Emily Johnson", ca_id: "00000003", points: 350, rank: 9 },
    { name: "Michael Brown", ca_id: "00000004", points: 340, rank: 10 },
    { name: "Sarah Davis", ca_id: "00000005", points: 330, rank: 11 },
    { name: "Chris Wilson", ca_id: "00000006", points: 315, rank: 12 },
    { name: "Jessica Miller", ca_id: "00000007", points: 300, rank: 13 },
    { name: "David Anderson", ca_id: "00000008", points: 285, rank: 14 },
    { name: "Sophia Lee", ca_id: "00000009", points: 270, rank: 15 },
    { name: "James Taylor", ca_id: "00000010", points: 255, rank: 16 },
  ]; // TODO fetch from api
  return (
    <>
      <div className="fixed -z-10 pt-32 h-screen w-screen bg-[url('/dashbg.png')] bg-cover bg-start bg-no-repeat bg-fixed"></div>
      <Leaderboard leaderboard={leaderboard} />
    </>
  );
}
