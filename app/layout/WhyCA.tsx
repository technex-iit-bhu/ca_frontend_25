import { HeadingTexts } from './HeadingTexts';
export default function WhyCA() {
  return (
    <section
      id="about"
      className="flex h-auto flex-col items-start justify-center bg-zinc-900 px-6 text-left sm:h-screen sm:px-12 md:px-24"
    >
      <HeadingTexts bgText="CA" whiteText="Why" redText="CA?" align="left" />
      <p className="mt-4 max-w-2xl text-white sm:text-xl md:text-2xl">
        <span className="text-customRed">
          Become a Campus Ambassador (CA) for Technex&apos;25 and become the driving force behind one of
          Asia&apos; s oldest and most celebrated techno-management fests on your campus.
        </span>{' '}
        This is your opportunity to lead with purpose by organizing events, promoting Technex, and
        energizing your campus community. As a CA, you&apos; ll connect with fellow ambassadors, the
        Technex team, and industry experts, building a professional network that could shape your
        future. It&apos; s more than just a role—it&apos; s a chance to inspire, innovate, and make
        a lasting impact.
      </p>
      <br />
      <p className="mt-4 max-w-2xl text-white sm:text-xl md:text-2xl">
        The Technex CA Program offers a platform to develop essential skills like{' '}
        <span className="text-customRed">leadership</span>,{' '}
        <span className="text-customRed">communication</span>, and{' '}
        <span className="text-customRed">organization through real-world experience</span>. Be at
        the forefront of innovation by connecting your peers to a world of creativity and
        opportunity, all while gaining recognition and leaving your mark. If you are ready to
        embrace challenges, grow personally and professionally, and create unforgettable memories,
        this program is your gateway to excellence.
      </p>

      <div className="mt-6 w-full sm:w-3/4 md:w-2/3">
        <div className="h-1 bg-red-600"></div>
      </div>
    </section>
  );
}
