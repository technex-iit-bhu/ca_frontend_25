import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import Footer from './Footer';

const ContactUs: React.FC = () => {
  return (
    <>
      <div className="relative bg-zinc-800 pt-10 text-white">
        {/* Background "Contact" Text */}
        <div className="relative">
          <h2 className="font-spline text-right text-[150px] font-bold leading-[120px] text-[#a81f25] opacity-20 md:text-[250px] md:leading-[160px]">
            Contact
          </h2>

          {/* Foreground Contact Us Title */}
          <h2 className="absolute bottom-0 right-0 z-10 pr-5 font-serif text-[40px] text-red-500 md:text-[50px]">
            Contact <span className="text-white">Us</span>
          </h2>
        </div>

        {/* Contact Information Centered */}
        <div className="mt-8 flex flex-col items-center justify-center gap-10 px-4 md:flex-row md:space-x-10 md:px-0">
          {/* Contact Card 1 */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4">
            <FaPhoneAlt className="text-3xl text-gray-400" />
            <div className="flex flex-col items-center md:items-start">
              <p className="font-semibold text-red-500">Rhythm</p>
              <p className="text-sm text-white">+91 0000000000</p>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4">
            <FaPhoneAlt className="text-3xl text-gray-400" />
            <div className="flex flex-col items-center md:items-start">
              <p className="font-semibold text-red-500">Rhythm</p>
              <p className="text-sm text-white">+91 0000000000</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
