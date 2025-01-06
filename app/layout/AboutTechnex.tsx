import { HeadingTexts } from './HeadingTexts';
import RedLine from './RedLine';

export default function AboutTechnex() {
  return (
    <section
      id="about"
      className="flex h-auto flex-col items-start justify-center px-6 text-left sm:h-screen sm:px-12 md:px-24"
    >
      <HeadingTexts redText="Technex" whiteText="About" align="left" />
      <div className="mt-10 w-full rounded-[20px] bg-black bg-opacity-80 p-4 text-left">
        <p className="font-spline md:text-2xlt sm:text-xl">
          TECHNEX, IIT BHU is one of the largest and oldest college fests in India. Embodying the
          true spirit of youth,
          <span className="text-customRed">
            Technex provides a platform for young talent from all over India to showcase their
            varied skills.
          </span>
          <br />
          Technex is an annual techno-management fest organized by the students of Indian Institute of
          Technology (IIT) BHU, Varanasi.
        </p>
        <p className="font-spline md:text-2xlt mt-4 text-white sm:text-xl">
          The fest provides a platform for students to showcase their technical and creative
          abilities through{' '}
          <span className="text-customRed">
            various competitions, workshops, guest lectures, and exhibitions.
          </span>{' '}
          It attracts a large number of students from all over the country and provides a unique
          opportunity for them to showcase their skills and network with their peers and industry
          professionals.{' '}
          <span className="text-customRed">
            Technex is a celebration of innovation and technology, and a platform for students to
            learn, grow and excel in their field of interest.
          </span>
        </p>
      </div>
      <RedLine align="left" />
    </section>
  );
}
