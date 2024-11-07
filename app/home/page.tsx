import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CAPortal = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900 font-sans text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-80"></div> {/* Dark overlay */}
        <Image
          src="/homebg.png"
          alt="Home Background"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>

      {/* Header */}
      <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-between bg-black bg-opacity-5 px-6 py-2 backdrop-blur-sm">
        <div className="flex w-full items-center justify-between">
          <Image
            src="/technexlogo.png"
            alt="Technex Logo"
            width={330}
            height={75}
            className="object-contain"
          />

          {/* Navigation Menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 text-xl font-extrabold sm:text-2xl">
              <li className="px-4 sm:px-6">
                <a href="#about" className="cursor-pointer text-red-600 hover:underline">
                  About
                </a>
              </li>
              <li className="px-4 sm:px-6">
                <a href="#incentives" className="cursor-pointer hover:underline">
                  Incentives
                </a>
              </li>
              <li className="px-4 sm:px-6">
                <a href="#contact" className="cursor-pointer hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="px-4 sm:px-6">
                <a href="#faqs" className="cursor-pointer hover:underline">
                  FAQs
                </a>
              </li>
              <li className="px-4 sm:px-6">
                <Button variant="outline" className="w-32 rounded-full text-black">
                  Login
                </Button>
              </li>
            </ul>
          </nav>

          {/* Mobile Nav Toggle Button (for smaller screens) */}
          <div className="flex items-center md:hidden">
            <button className="text-white">☰</button> {/* Placeholder for hamburger icon */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative h-screen overflow-y-auto">
        {/* First Section */}
        <section className="flex h-screen flex-col items-start justify-center space-y-6 px-6 text-left sm:px-12 md:px-24">
          <h1 className="text-4xl font-normal sm:text-5xl md:text-6xl">
            <span className="text-red-600">Tech</span>{' '}
            <span className="text-white">Trek Pioneer</span>
          </h1>
          <p className="max-w-xl text-xl sm:text-2xl">
            <span className="text-3xl text-white sm:text-4xl">TECHNEX'24, IIT BHU</span>{' '}
            is one of the largest and oldest college fests in India. Embodying the true spirit of
            youth, Technex provides a platform for{' '}
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
            className="w-48 rounded-full bg-white text-black hover:bg-gray-400"
          >
            Register
          </Button>
        </section>

        {/* "About Technex" Section */}
        <section
          id="about"
          className="flex h-auto flex-col items-start justify-center bg-zinc-900 px-6 text-left sm:h-screen sm:px-12 md:px-24"
        >
          <h2 className="text-3xl font-normal sm:text-4xl sm:text-6xl">
            About <span className="text-red-600">Technex</span>
          </h2>
          <p className="mt-4 max-w-2xl text-white sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque earum optio,
            maiores, doloribus iure distinctio quis temporibus non pariatur ullam atque
            reprehenderit natus in vitae suscipit. Sed perspiciatis adipisci enim. Impedit quo
            consectetur nemo eveniet pariatur repellendus, perferendis nihil enim dolorum assumenda
            esse? Voluptatum voluptatem illum nostrum, placeat eos facere perferendis eum odit vel
            inventore debitis. Quasi explicabo aperiam id totam consectetur eveniet dolor? Optio
            reiciendis, impedit tempora explicabo provident cupiditate pariatur. Sunt expedita
            doloribus sint assumenda error cumque, natus rem. Odio expedita atque delectus ipsum
            eum, cupiditate doloribus, accusamus, eaque maxime ducimus omnis labore iste explicabo
            deserunt eos repudiandae.
          </p>

          {/* Red Break Line - Same Width as Paragraph */}
          <div className="mt-6 w-full sm:w-3/4 md:w-2/3">
            <div className="h-1 bg-red-600"></div>
          </div>
        </section>

        {/* "Our Reach" Section */}
        <section className="flex h-auto flex-col items-center justify-center bg-zinc-900 px-6 text-center sm:h-screen sm:px-12 md:px-24">
          {/* Right-aligned heading */}
          <div className="w-full text-right">
            <h2 className="text-3xl font-normal text-white sm:text-4xl sm:text-6xl">
              <span className="text-red-600">Our</span> Reach
            </h2>
          </div>

          <div className="my-32 flex flex-wrap items-end justify-center space-x-12">
            <div className="flex items-end px-10">
              <Image
                src="/collegeambassador.svg"
                alt="College Ambassadors"
                width={250}
                height={80}
              />
            </div>
            <div className="flex items-end px-10">
              <Image src="/indiancollege.svg" alt="Indian Colleges" width={230} height={80} />
            </div>
            <div className="flex items-end px-10">
              <Image
                src="/internationalcollege.svg"
                alt="International Colleges"
                width={250}
                height={80}
              />
            </div>
          </div>

          {/* Red Break Line from Right to Left */}
          <div className="mt-6 flex w-full justify-end">
            <div className="h-1 w-2/3 bg-red-600 sm:w-1/2 md:w-1/3"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CAPortal;
