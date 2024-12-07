import { Button } from '@/components/ui/button';

export default function TechnexInfo() {
  return (
    <section
      id="first-section"
      className="flex h-screen flex-col items-start justify-center space-y-6 px-6 text-left sm:px-12 md:px-24 pt-8 md:pt-0"
    >
      <h1 className="text-4xl font-normal sm:text-5xl md:text-6xl">
        <span className="text-red-600">Tech</span> <span className="text-white">Trek Pioneer</span>
      </h1>
      <p className="max-w-xl text-xl sm:text-2xl md:text-3xl">
        <span className="text-3xl text-white sm:text-4xl">TECHNEX&apos;24, IIT BHU</span> is one of
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

      <Button variant="outline" className="w-48 rounded-full bg-white text-black hover:bg-gray-400">
        Register
      </Button>
    </section>
  );
}
