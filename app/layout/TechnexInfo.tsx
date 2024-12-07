import { Button } from '@/components/ui/button';
import Image from 'next/image';
export default function TechnexInfo() {
  return (
    <section
      id="first-section"
      className="flex h-screen flex-col items-start justify-center space-y-6 px-6 pt-8 text-left sm:px-12 md:px-24 md:pt-0"
    >
      <Image
        src="/homebg.png"
        alt="Home Background"
        layout="fill"
        objectFit="cover"
        className="z-[0]"
      />
      <h1 className="text-3xl font-normal sm:text-4xl md:text-5xl z-[0] font-signika">
        <span className="text-red-600">Tech</span> <span className="text-white">Trek Pioneer</span>
      </h1>
      <p className="max-w-xl rounded-[20px] bg-black bg-opacity-80 p-4 text-lg sm:text-xl md:text-2xl z-[0]">
        <span className="text-2xl text-white sm:text-3xl">TECHNEX&apos;24, IIT BHU</span> is one of
        the largest and oldest college fests in India. Embodying the true spirit of youth, Technex
        provides a platform for{' '}
        <span className="text-red-600">young talent from all over India</span> to showcase their
        varied skills.
        <br />
        <br />
        Keeping this motto in mind, Technex, IIT BHU is reaching out to all the colleges across{' '}
        <span className="text-red-600">India where you can lead the contingent</span> from your
        college taking part in Technex and engage them with different activities of Technex, IIT
        BHU.
      </p>

      <Button
        variant="outline"
        className="w-48 rounded-full bg-customRed text-white hover:bg-gray-400 z-[0]"
      >
        Register
      </Button>
    </section>
  );
}
