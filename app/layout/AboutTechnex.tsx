import { HeadingTexts } from '../page';

export default function AboutTechnex() {
  return (
    <section
      id="about"
      className="flex h-auto flex-col items-start justify-center bg-zinc-900 px-6 text-left sm:h-screen sm:px-12 md:px-24"
    >
      <HeadingTexts bgText="About" redText="Technex" whiteText="About" align="left" />
      <p className="mt-4 max-w-2xl text-white sm:text-xl md:text-2xl">
        <span className="text-customRed">
          "Where creativity meets engineering, and passion sparks discovery— welcome to Technex, the
          crown jewel of IIT BHU where ideas are not just dreamt but brought to life."
        </span>{' '}
        Technex, Asia's oldest Techno-Management fest organized by the brilliant minds of IIT BHU,
        is a vibrant mix of innovation, Creativity, and pure genius. Technex is your gateway to
        adrenaline-pumping competitions, mind-blowing workshops, and awe-inspiring exhibitions that
        will leave you wide-eyed and inspired.
      </p>
      <p className="mt-4 max-w-2xl text-white sm:text-xl md:text-2xl">
        <span className="text-customRed">
          Do you dream in code, aspire to be the next Elon Musk, or live and breathe tech
          innovation?
        </span>
        Then you're at the right place since Technex is where imagination sparks and innovation
        soars! For years, we've fueled young dreamers, nurtured big ideas, and united tech wizards
        to shape the future. As the renowned economist Theodore Levi observed,{' '}
        <span className="text-customRed">
          "Creativity is thinking up new things. Innovation is doing new things."
        </span>{' '}
        Technex is your chance to transform Creativity into reality and ignite a wildfire of
        innovation.
      </p>

      <div className="mt-6 w-full sm:w-3/4 md:w-2/3">
        <div className="h-1 bg-red-600"></div>
      </div>
    </section>
  );
}
