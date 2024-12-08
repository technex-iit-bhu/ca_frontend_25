import ComingSoon from '../layout/ComingSoon';
import Image from 'next/image';

export default function LeaderBoard() {
  return (
    <div className="relative bg-cover bg-center">
    <Image src="/dashbg.png" alt="Background" layout="fill" objectFit="cover" />
    <ComingSoon />
  </div>
  )
}
