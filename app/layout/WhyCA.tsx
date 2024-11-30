export default function WhyCA() {
  return (
    <section
      id="about"
      className="flex h-auto flex-col items-start justify-center bg-zinc-900 px-6 text-left sm:h-screen sm:px-12 md:px-24"
    >
      <h2 className="my-20 text-3xl font-normal sm:text-8xl">
        Why <span className="text-red-600">CA</span>
      </h2>
      <p className="mt-4 max-w-2xl text-white sm:text-xl md:text-2xl">
        The Campus Ambassador (CA) program is your chance to represent Technex&apos;25 at your
        college. As a CA, you will{' '}
        <span className="text-customRed">
          promote the event, organise workshops, and inspire your peers to participate
        </span>
        , all while enhancing your communication and leadership skills. This role is a gateway to
        valuable experiences, personal growth, and professional networking. Join us to
        <span className="text-customRed">lead, learn, laugh, and leave your mark</span> on a
        historic fest.
      </p>
      <br />
      <p className="mt-4 max-w-2xl text-white sm:text-xl md:text-2xl">
        Key Highlights of Being a CA
      </p>
      <ul className="mt-2 flex max-w-2xl list-inside list-disc flex-col space-y-2 pl-4 text-white sm:text-xl md:text-2xl">
        <li>
          <b>Publicity</b>: Spread the word about Technex&apos;25 through on-campus and online
          promotions.
        </li>
        <li>
          <b>Leadership</b>: Organize events and motivate peers to participate.
        </li>
        <li>
          <b>Networking</b>: Connect with the Technex team, industry experts, and like-minded
          ambassadors.
        </li>
        <li>
          <b>Perks</b>: Earn certificates, exclusive goodies, and top-performer rewards like LORs
          and social media shoutouts.
        </li>
        <li>
          <b>Skill</b> Development: Build your communication, event management, and teamwork skills.
        </li>
      </ul>

      <div className="mt-6 w-full sm:w-3/4 md:w-2/3">
        <div className="h-1 bg-red-600"></div>
      </div>
    </section>
  );
}
