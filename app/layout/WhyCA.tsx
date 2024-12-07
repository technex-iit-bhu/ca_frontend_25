import { HeadingTexts } from './HeadingTexts';
export default function WhyCA() {
  return (
    <section
      id="about"
      className="flex h-auto flex-col justify-center px-6 text-left sm:h-screen sm:px-12 md:px-24"
    >
      <HeadingTexts whiteText="Why" redText="CA?" align="center" />
      <div className="max-w-max rounded-[20px] bg-black bg-opacity-80 p-4 my-10">
        <p className="mt-4 text-white sm:text-lg md:text-xl">
          The Campus Ambassador Program for Technex&apos;23 offers an exciting chance to become an
          essential part of the organizing team behind India&apos;s premier technical and innovation
          fest. As a Campus Ambassador,{' '}
          <span className="text-customRed">
            you&apos;ll lead your college&apos;s contingent at Technex
          </span>
          , promoting the event within your institution. This role allows you to{' '}
          <span className="text-customRed">
            develop communication and managerial skills by interacting with students from diverse
            backgrounds.
          </span>
        </p>
        <br />
        <p className="mt-4 text-white sm:text-lg md:text-xl">
          You&apos;ll also showcase your{' '}
          <span className="text-customRed">
            leadership abilities, inspiring and motivating your peers
          </span>{' '}
          to participate. As a Campus Ambassador, you can{' '}
          <span className="text-customRed">
            organize workshops and events, gaining hands-on experience in event planning.
          </span>{' '}
          You&apos;ll be the face of Technex&apos;23 in your college, serving as a source of
          information, motivation, and a connector. This program is an incredible opportunity to{' '}
          <span className="text-customRed">grow both personally and professionally</span> while
          playing a pivotal role in promoting technology and innovation at your college. Seize this
          chance to be a leader and influencer in your college&apos;s journey towards
          Technex&apos;23.
        </p>
      </div>
      <div className="mt-6 w-[35%] text-left">
        <div className="h-1 w-full border-l-4 bg-red-600"></div>
      </div>
    </section>
  );
}
